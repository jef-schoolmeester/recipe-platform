import { sign } from 'jsonwebtoken'

import { JWT_SECRET } from '@/utils/config'

export const signToken = (userId: string) => {
  if (!JWT_SECRET) throw new Error('JWT SECRET not provided')

  const token = sign({ userId: userId }, JWT_SECRET, {
    expiresIn: '8h',
  })

  return token
}
