import type { NextApiRequest, NextApiResponse } from 'next'

import { Recipe } from '@/utils/types'
import { recipeCollection, userCollection } from '@/utils/config'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { ...recipe } = req.body as Recipe
  const { user } = req.query as { user: string }

  /** check recipe integrity ?? */

  try {
    const insertedRecipe = await recipeCollection.insertOne({ ...recipe })
    const { insertedId } = insertedRecipe
    await userCollection.updateOne(
      { username: user },
      { $push: { recipes: insertedId.toString() } }
    )
    res.status(200).json({ success: true })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'An error occured, please try again later',
    })
  }
}

export default handler
