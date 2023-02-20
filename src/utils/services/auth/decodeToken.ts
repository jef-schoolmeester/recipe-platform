import { verify } from 'jsonwebtoken'

import { JWT_SECRET } from '@/utils/config'

export const decodeToken = (token: string) => {
  if (!JWT_SECRET) throw new Error('JWT KEY not provided')

  return verify(token, JWT_SECRET)
}
