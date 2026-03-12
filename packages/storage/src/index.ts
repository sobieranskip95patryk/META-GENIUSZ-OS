import multer from 'multer';
import path from 'path';
import fs from 'fs';
import crypto from 'crypto';

// ============================================================
// STORAGE CONFIGURATION
// ============================================================

export interface StorageFile {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  size: number;
  path: string;
  url: string;
  filename: string;
}

const ALLOWED_MIMES = new Set([
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/gif',
  'video/mp4',
  'video/webm',
]);

const MAX_SIZE_BYTES = 50 * 1024 * 1024; // 50 MB

function getStoragePath(): string {
  const localPath = process.env.STORAGE_LOCAL_PATH ?? './uploads';
  if (!fs.existsSync(localPath)) {
    fs.mkdirSync(localPath, { recursive: true });
  }
  return localPath;
}

// ============================================================
// MULTER DISK STORAGE
// ============================================================

const diskStorage = multer.diskStorage({
  destination(_req, _file, cb) {
    const storagePath = getStoragePath();
    cb(null, storagePath);
  },
  filename(_req, file, cb) {
    const ext = path.extname(file.originalname).toLowerCase();
    const uniqueName = `${Date.now()}-${crypto.randomBytes(8).toString('hex')}${ext}`;
    cb(null, uniqueName);
  },
});

export const upload = multer({
  storage: diskStorage,
  limits: {
    fileSize: MAX_SIZE_BYTES,
    files: 10,
  },
  fileFilter(_req, file, cb) {
    if (ALLOWED_MIMES.has(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error(`Unsupported file type: ${file.mimetype}`));
    }
  },
});

// ============================================================
// URL HELPER
// ============================================================

export function getFileUrl(filename: string): string {
  const baseUrl = process.env.STORAGE_BASE_URL ?? 'http://localhost:3001/uploads';
  return `${baseUrl.replace(/\/+$/, '')}/${filename}`;
}

export function multerFileToStorageFile(file: Express.Multer.File): StorageFile {
  return {
    ...file,
    path: file.path,
    filename: file.filename,
    url: getFileUrl(file.filename),
  };
}

// ============================================================
// DELETE FILE
// ============================================================

export function deleteFile(filename: string): void {
  const storagePath = getStoragePath();
  const filePath = path.join(storagePath, path.basename(filename));
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
  }
}

// ============================================================
// STATIC MIDDLEWARE HELPER
// ============================================================

import express from 'express';

export function staticFilesMiddleware() {
  const storagePath = getStoragePath();
  return express.static(storagePath);
}
