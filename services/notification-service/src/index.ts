import express from "express";
import { Resend } from "resend";
import { prisma } from "@meta-geniusz/database";

const PORT = Number(process.env.NOTIFICATION_SERVICE_PORT) || 3010;
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;
const FROM_EMAIL = process.env.FROM_EMAIL ?? "notifications@meta-geniusz.com";

const app = express();
app.use(express.json());

// Internal health check
app.get("/health", (_req, res) => {
  res.json({ status: "ok", service: "notification-service" });
});

// Send an email notification
app.post("/send-email", async (req, res) => {
  const { to, subject, html, text } = req.body as {
    to: string;
    subject: string;
    html?: string;
    text?: string;
  };

  if (!to || !subject) {
    res.status(400).json({ error: "to and subject are required" });
    return;
  }

  if (!resend) {
    console.log(`[notification-service] RESEND_API_KEY not set, skipping email to ${to}`);
    res.json({ ok: true, skipped: true });
    return;
  }

  try {
    const result = await resend.emails.send({
      from: FROM_EMAIL,
      to,
      subject,
      html: html ?? `<p>${text ?? subject}</p>`,
    });
    res.json({ ok: true, data: result });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("[notification-service] Email send error:", message);
    res.status(500).json({ error: message });
  }
});

// Persist in-app notification to DB
app.post("/notify", async (req, res) => {
  const { userId, type, message, actorId } = req.body as {
    userId: string;
    type: string;
    message: string;
    actorId?: string;
  };

  if (!userId || !type || !message) {
    res.status(400).json({ error: "userId, type and message are required" });
    return;
  }

  try {
    const notification = await (prisma as any).notification.create({
      data: { userId, type, message, actorId },
    });
    res.json({ ok: true, data: notification });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    res.status(500).json({ error: message });
  }
});

app.listen(PORT, () => {
  console.log(`[notification-service] Running on port ${PORT}`);
});
