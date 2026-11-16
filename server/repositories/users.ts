import { query } from '../db/pool'
import { newId } from '../lib/ids'
import { UserDTO, UserRow } from '../types'

const COLUMNS = 'id, email, name, password_hash, created_at, updated_at'

export function toUserDTO(row: UserRow): UserDTO {
  return { email: row.email, name: row.name }
}

export async function findUserByEmail(email: string): Promise<UserRow | null> {
  const { rows } = await query<UserRow>(
    `select ${COLUMNS} from users where lower(email) = lower($1)`,
    [email]
  )

  return rows[0] ?? null
}

export async function findUserById(id: string): Promise<UserRow | null> {
  const { rows } = await query<UserRow>(`select ${COLUMNS} from users where id::text = $1`, [id])

  return rows[0] ?? null
}

export async function createUser(input: {
  email: string
  name: string
  passwordHash: string
}): Promise<UserRow> {
  const { rows } = await query<UserRow>(
    `insert into users (id, email, name, password_hash)
     values ($1, $2, $3, $4)
     returning ${COLUMNS}`,
    [newId(), input.email, input.name, input.passwordHash]
  )

  return rows[0]
}

export async function updateUser(
  id: string,
  patch: { email?: string; name?: string; passwordHash?: string }
): Promise<UserRow> {
  const { rows } = await query<UserRow>(
    `update users
        set email         = coalesce($2, email),
            name          = coalesce($3, name),
            password_hash = coalesce($4, password_hash),
            updated_at    = now()
      where id::text = $1
      returning ${COLUMNS}`,
    [id, patch.email ?? null, patch.name ?? null, patch.passwordHash ?? null]
  )

  return rows[0]
}
