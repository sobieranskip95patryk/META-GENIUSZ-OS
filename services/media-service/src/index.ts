import express from "express";
import multer from "multer";
import sharp from "sharp";
import path from "path";
import fs from "fs";

const PORT = Number(process.env.MEDIA_SERVICE_PORT) || 3013;
const UPLOAD_DIR = process.env.UPLOAD_DIR ?? path.join(process.cwd(), "uploads");
const BASE_URL = process.env.MEDIA_BASE_URL ?? `http://localhost:${PORT}`;

// Ensure upload and processed directories exist
const PROCESSED_DIR = path.join(UPLOAD_DIR, "processed");
fs.mkdirSync(PROCESSED_DIR, { recursive: true });

const app = express();
app.use(express.json());

// Serve processed files statically
app.use("/files", express.static(PROCESSED_DIR));

const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 15 * 1024 * 1024 }, // 15MB
  fileFilter: (_req, file, cb) => {
    const allowed = ["image/jpeg", "image/png", "image/webp", "image/gif"];
    cb(null, allowed.includes(file.mimetype));
  },
});

app.get("/health", (_req, res) => {
  res.json({ status: "ok", service: "media-service" });
});

/**
 * POST /upload
 * Accepts a single image file, resizes to max 1200px wide, converts to webp.
 * Returns { url: string, filename: string }
 */
app.post("/upload", upload.single("file"), async (req, res) => {
  if (!req.file) {
    res.status(400).json({ error: "No file uploaded or invalid file type" });
    return;
  }

  try {
    const filename = `${Date.now()}-${Math.random().toString(36).slice(2)}.webp`;
    const outputPath = path.join(PROCESSED_DIR, filename);

    await sharp(req.file.buffer)
      .resize({ width: 1200, withoutEnlargement: true })
      .webp({ quality: 85 })
      .toFile(outputPath);

    const url = `${BASE_URL}/files/${filename}`;
    res.json({ url, filename });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("[media-service] Process error:", message);
    res.status(500).json({ error: message });
  }
});

/**
 * POST /upload/avatar
 * Crops and resizes to 400x400 square avatar.
 */
app.post("/upload/avatar", upload.single("file"), async (req, res) => {
  if (!req.file) {
    res.status(400).json({ error: "No file uploaded" });
    return;
  }

  try {
    const filename = `avatar-${Date.now()}-${Math.random().toString(36).slice(2)}.webp`;
    const outputPath = path.join(PROCESSED_DIR, filename);

    await sharp(req.file.buffer)
      .resize(400, 400, { fit: "cover", position: "center" })
      .webp({ quality: 90 })
      .toFile(outputPath);

    const url = `${BASE_URL}/files/${filename}`;
    res.json({ url, filename });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    res.status(500).json({ error: message });
  }
});

/**
 * DELETE /files/:filename — delete processed file
 */
app.delete("/files/:filename", (req, res) => {
  const filename = path.basename(req.params.filename); // sanitize
  const filePath = path.join(PROCESSED_DIR, filename);
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
    res.json({ ok: true });
  } else {
    res.status(404).json({ error: "File not found" });
  }
});

app.listen(PORT, () => {
  console.log(`[media-service] Running on port ${PORT}`);
});
