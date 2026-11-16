import 'dotenv/config'

function toNumber(value: string | undefined, fallback: number): number {
  const parsed = Number(value)
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback
}

function toList(value: string | undefined, fallback: string[]): string[] {
  if (!value) return fallback
  return value
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean)
}

/**
 * Настройки сервера читаются из `.env` в корне проекта.
 * CRA использует тот же файл, поэтому серверные переменные намеренно названы
 * не `PORT` (его перехватывает react-scripts), а `API_PORT`.
 */
export const config = {
  port: toNumber(process.env.API_PORT, 3001),
  databaseUrl:
    process.env.DATABASE_URL ?? 'postgres://postgres:postgres@localhost:5433/react_burger',
  jwtSecret: process.env.JWT_SECRET ?? 'react-burger-dev-secret',
  accessTokenTtl: process.env.JWT_ACCESS_TTL ?? '20m',
  refreshTokenTtlDays: toNumber(process.env.JWT_REFRESH_TTL_DAYS, 30),
  corsOrigins: toList(process.env.CORS_ORIGIN, ['http://localhost:3000']),
  seedDemoData: (process.env.SEED_DEMO_DATA ?? 'true') !== 'false',
  passwordResetCodeTtlMinutes: toNumber(process.env.PASSWORD_RESET_TTL_MINUTES, 15),
}
