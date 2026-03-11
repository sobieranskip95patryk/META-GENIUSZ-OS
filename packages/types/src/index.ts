// User types
export interface User {
  id: string;
  email: string;
  username?: string;
  role: 'user' | 'admin' | 'moderator';
  createdAt: Date;
  updatedAt: Date;
}

export interface Profile {
  id: string;
  bio?: string;
  avatar?: string;
  userId: string;
}

// Post types
export interface Post {
  id: string;
  content: string;
  image?: string;
  authorId: string;
  likes: number;
  createdAt: Date;
  updatedAt: Date;
}

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}

// Auth types
export interface AuthToken {
  access_token: string;
  refresh_token?: string;
  expires_in: number;
}

export interface JwtPayload {
  sub: string;
  email: string;
  role: string;
  iat: number;
  exp: number;
}

// Error types
export interface ErrorResponse {
  code: string;
  message: string;
  details?: Record<string, any>;
}
