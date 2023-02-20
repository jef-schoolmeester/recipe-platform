import type { NextApiRequest, NextApiResponse } from 'next'

import { hash } from 'bcrypt'

import { userCollection } from '@/utils/config'
import { UserRegisterRequest } from '@/utils/types'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { username, password } = req.body as UserRegisterRequest

  if (!username || !password) {
    res.status(400).json({ message: 'Invalid request' })
    return
  }

  const encryptedPassword = await hash(password, 10)

  await userCollection.insertOne({
    username,
    password: encryptedPassword,
  })

  res.status(200).json({ success: true })
}

export default handler
