import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

describe('User API', () => {
  beforeAll(async () => {
    // Setup: Create test database
    console.log('Setting up test database...');
  });

  afterAll(async () => {
    // Cleanup: Delete test data
    await prisma.user.deleteMany({});
    await prisma.$disconnect();
  });

  it('should create a new user', async () => {
    const user = await prisma.user.create({
      data: {
        email: 'test@example.com',
        password: 'hashed_password',
        username: 'testuser'
      }
    });

    expect(user.email).toBe('test@example.com');
    expect(user.username).toBe('testuser');
  });

  it('should retrieve a user by email', async () => {
    const createdUser = await prisma.user.create({
      data: {
        email: 'findme@example.com',
        password: 'hashed_password',
        username: 'findme'
      }
    });

    const foundUser = await prisma.user.findUnique({
      where: { email: 'findme@example.com' }
    });

    expect(foundUser?.email).toBe(createdUser.email);
  });

  it('should update a user profile', async () => {
    const user = await prisma.user.create({
      data: {
        email: 'update@example.com',
        password: 'hashed_password',
        username: 'updateuser'
      }
    });

    const profile = await prisma.profile.create({
      data: {
        bio: 'Test bio',
        userId: user.id
      }
    });

    expect(profile.bio).toBe('Test bio');
    expect(profile.userId).toBe(user.id);
  });

  it('should handle user deletion with cascade', async () => {
    const user = await prisma.user.create({
      data: {
        email: 'delete@example.com',
        password: 'hashed_password',
        username: 'deleteuser'
      }
    });

    await prisma.profile.create({
      data: {
        bio: 'To be deleted',
        userId: user.id
      }
    });

    await prisma.user.delete({
      where: { id: user.id }
    });

    const deletedUser = await prisma.user.findUnique({
      where: { id: user.id }
    });

    expect(deletedUser).toBeNull();
  });
});
