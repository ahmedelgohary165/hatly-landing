import postgres from 'postgres';

let client: ReturnType<typeof postgres> | null = null;

/**
 * Shared Postgres client for Vercel serverless + Supabase DATABASE_URL.
 * Uses SSL (required by Supabase) and a single connection per invocation.
 */
export function getSql() {
  const connectionString = process.env.DATABASE_URL?.trim();
  if (!connectionString) {
    throw new Error('DATABASE_URL is not configured');
  }

  if (!client) {
    client = postgres(connectionString, {
      ssl: 'require',
      max: 1,
      idle_timeout: 20,
      connect_timeout: 10,
      prepare: false,
    });
  }

  return client;
}

export function getPostgresErrorCode(error: unknown): string | undefined {
  if (error && typeof error === 'object' && 'code' in error) {
    const code = (error as { code?: unknown }).code;
    return typeof code === 'string' ? code : undefined;
  }
  return undefined;
}
