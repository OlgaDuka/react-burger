import { randomBytes } from 'node:crypto'

/**
 * Идентификаторы в стиле Mongo ObjectId: 24 шестнадцатеричных символа.
 * Так ответы локального API неотличимы по формату от учебного сервиса.
 */
export function newId(): string {
  return randomBytes(12).toString('hex')
}
