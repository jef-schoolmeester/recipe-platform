import type { NextApiRequest, NextApiResponse } from 'next'

import { Recipe } from '@/utils/types'
import { recipeCollection, userCollection } from '@/utils/config'
import { ObjectId } from 'mongodb'

const allowed_method = ['PUT', 'DELETE']

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req
  if (!method || !allowed_method.includes(method)) {
    res.setHeader('Allow', ['PUT', 'DELETE'])
    res.status(405).end(`Method ${method} Not Allowed`)
    return
  }
  const { id: recipeId, user } = req.query as { user: string; id: string }
  // check if user owns recipe
  if (method === 'PUT') {
    const { ...recipe } = req.body as Recipe
    await recipeCollection.replaceOne(
      { _id: new ObjectId(recipeId) },
      { ...recipe }
    )
    res.status(200).json({ success: true })
  }

  if (method === 'DELETE') {
    await recipeCollection.deleteOne({ _id: new ObjectId(recipeId) })
    await userCollection.updateOne(
      { username: user },
      { $pull: { recipes: new ObjectId(recipeId) } }
    )
    res.status(200).json({ success: true })
  }
}

export default handler
