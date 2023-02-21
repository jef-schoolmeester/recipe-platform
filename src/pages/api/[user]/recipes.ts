import { recipeCollection, userCollection } from '@/utils/config'
import { ObjectId } from 'mongodb'
import type { NextApiRequest, NextApiResponse } from 'next'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { user: username } = req.query as { user: string }

  const user = await userCollection.findOne({
    username,
  })
  if (!user) {
    res.status(400).json({ success: false, message: 'User not found' })
    return
  }
  const recipeIds = user.recipes.map((recipe: string) => new ObjectId(recipe))
  const recipes = await recipeCollection
    .find({ _id: { $in: recipeIds } })
    .toArray()
  res.status(200).json({ recipes })
}

export default handler
