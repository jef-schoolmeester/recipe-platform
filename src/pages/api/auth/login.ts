import type { NextApiRequest, NextApiResponse } from 'next'

import { compare, genSalt, hash } from 'bcrypt'

import { UserLoginRequest } from '@/utils/types'
import { userCollection } from '@/utils/config'
import { signToken } from '@/utils/services/auth/signToken'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { username, password } = JSON.parse(req.body) as UserLoginRequest

  if (!username || !password) {
    res.status(400).json({ message: 'BODY' })
    return
  }

  const user = await userCollection.findOne({
    username,
  })

  if (!user) {
    res.status(400).json({ message: 'NOT FOUND' })
    return
  }

  const isPasswordValid = await compare(password, user.password)
  if (!isPasswordValid) {
    res.status(400).json({ message: 'PWD' })
    return
  }

  const userId = user._id.toString()
  const jwtToken = signToken(userId)

  res.status(200).json({ token: jwtToken, username, id: userId })
}

export default handler
