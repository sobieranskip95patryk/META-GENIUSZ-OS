import express from "express";
import { prisma } from "@meta-geniusz/database";

const PORT = Number(process.env.MODERATION_SERVICE_PORT) || 3011;

// Configurable banned keywords (extend via env)
const BANNED_KEYWORDS: string[] = (process.env.BANNED_KEYWORDS ?? "spam,hate,abuse").split(",").map((w) => w.trim().toLowerCase());

const app = express();
app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ status: "ok", service: "moderation-service" });
});

/**
 * Keyword-based pre-moderation.
 * Returns { safe: boolean, flaggedWords: string[] }
 */
app.post("/check-content", (req, res) => {
  const { text } = req.body as { text?: string };
  if (!text) {
    res.status(400).json({ error: "text is required" });
    return;
  }
  const lower = text.toLowerCase();
  const flaggedWords = BANNED_KEYWORDS.filter((kw) => lower.includes(kw));
  res.json({ safe: flaggedWords.length === 0, flaggedWords });
});

/**
 * Take a moderation action on a report:
 * POST /action { reportId, action, moderatorId }
 * action: APPROVE | REMOVE | WARN | SUSPEND | BAN
 */
app.post("/action", async (req, res) => {
  const { reportId, action, moderatorId, reason } = req.body as {
    reportId: string;
    action: string;
    moderatorId: string;
    reason?: string;
  };

  if (!reportId || !action || !moderatorId) {
    res.status(400).json({ error: "reportId, action and moderatorId required" });
    return;
  }

  try {
    const VALID_ACTIONS = ["APPROVE", "REMOVE", "WARN", "SUSPEND", "BAN"];
    if (!VALID_ACTIONS.includes(action)) {
      res.status(400).json({ error: "Invalid action" });
      return;
    }

    const db = prisma as any;

    // Update report status
    await db.report.update({
      where: { id: reportId },
      data: {
        status: action === "APPROVE" ? "RESOLVED" : "ACTIONED",
      },
    });

    // Create moderation action record
    await db.moderationAction.create({
      data: {
        reportId,
        moderatorId,
        action,
        reason: reason ?? null,
      },
    });

    // Audit log
    await db.auditLog.create({
      data: {
        userId: moderatorId,
        action: `MODERATION_${action}`,
        details: { reportId, reason },
      },
    });

    res.json({ ok: true });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    res.status(500).json({ error: message });
  }
});

app.listen(PORT, () => {
  console.log(`[moderation-service] Running on port ${PORT}`);
});
