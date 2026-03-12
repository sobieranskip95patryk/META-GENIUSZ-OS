/**
 * META-GENIUSZ SDK — Public API client for external integrations
 */

const DEFAULT_BASE_URL = 'http://localhost:3001/api';

export interface SDKConfig {
  baseUrl?: string;
  apiKey?: string;
}

export class MetaGeniuszSDK {
  private baseUrl: string;
  private apiKey: string | undefined;

  constructor(config: SDKConfig = {}) {
    this.baseUrl = config.baseUrl ?? DEFAULT_BASE_URL;
    this.apiKey = config.apiKey;
  }

  private async request<T>(path: string, options: RequestInit = {}): Promise<T> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(this.apiKey ? { Authorization: `Bearer ${this.apiKey}` } : {}),
    };

    const res = await fetch(`${this.baseUrl}${path}`, {
      ...options,
      headers: { ...headers, ...(options.headers as Record<string, string>) },
    });

    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      throw new Error(body.error ?? `HTTP ${res.status}`);
    }

    return res.json() as Promise<T>;
  }

  /** Health check */
  ping() {
    return this.request<{ status: string }>('/health');
  }

  /** Users */
  getUser(id: string) {
    return this.request<{ data: unknown }>(`/users/${encodeURIComponent(id)}`);
  }

  /** Posts */
  getPosts(params?: { page?: number; limit?: number }) {
    const q = new URLSearchParams();
    if (params?.page) q.set('page', String(params.page));
    if (params?.limit) q.set('limit', String(params.limit));
    return this.request<{ data: unknown[] }>(`/posts?${q}`);
  }

  /** Search */
  search(query: string, type: 'users' | 'posts' = 'users') {
    return this.request<{ data: unknown[] }>(
      `/search?q=${encodeURIComponent(query)}&type=${type}`,
    );
  }
}

export function createSDK(config?: SDKConfig) {
  return new MetaGeniuszSDK(config);
}
