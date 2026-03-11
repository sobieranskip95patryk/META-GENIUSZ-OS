-- Migration: 01_init_postgresql
-- Description: Initialize PostgreSQL database with core schema

-- Create User table
CREATE TABLE "User" (
  id TEXT NOT NULL PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL,
  username TEXT UNIQUE,
  role TEXT NOT NULL DEFAULT 'user',
  "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Create Profile table
CREATE TABLE "Profile" (
  id TEXT NOT NULL PRIMARY KEY DEFAULT gen_random_uuid(),
  bio TEXT,
  avatar TEXT,
  "userId" TEXT NOT NULL UNIQUE,
  FOREIGN KEY ("userId") REFERENCES "User"(id) ON DELETE CASCADE
);

-- Create Post table
CREATE TABLE "Post" (
  id TEXT NOT NULL PRIMARY KEY DEFAULT gen_random_uuid(),
  content TEXT NOT NULL,
  image TEXT,
  "authorId" TEXT NOT NULL,
  likes INTEGER NOT NULL DEFAULT 0,
  "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY ("authorId") REFERENCES "User"(id) ON DELETE CASCADE
);

-- Create Follow table
CREATE TABLE "Follow" (
  id TEXT NOT NULL PRIMARY KEY DEFAULT gen_random_uuid(),
  "followerId" TEXT NOT NULL,
  "followingId" TEXT NOT NULL,
  "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE("followerId", "followingId"),
  FOREIGN KEY ("followerId") REFERENCES "User"(id) ON DELETE CASCADE,
  FOREIGN KEY ("followingId") REFERENCES "User"(id) ON DELETE CASCADE
);

-- Create Session table
CREATE TABLE "Session" (
  id TEXT NOT NULL PRIMARY KEY DEFAULT gen_random_uuid(),
  "userId" TEXT NOT NULL,
  token TEXT NOT NULL UNIQUE,
  "expiresAt" TIMESTAMP NOT NULL,
  "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY ("userId") REFERENCES "User"(id) ON DELETE CASCADE
);

-- Create indexes
CREATE INDEX "User_email_idx" ON "User"(email);
CREATE INDEX "User_username_idx" ON "User"(username);
CREATE INDEX "Post_authorId_idx" ON "Post"("authorId");
CREATE INDEX "Follow_followerId_idx" ON "Follow"("followerId");
CREATE INDEX "Follow_followingId_idx" ON "Follow"("followingId");
CREATE INDEX "Session_userId_idx" ON "Session"("userId");
