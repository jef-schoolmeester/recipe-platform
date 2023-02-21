import type { NextApiRequest, NextApiResponse } from 'next'

import { ObjectId } from 'mongodb'

import { recipeCollection } from '@/utils/config'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id: recipeId } = req.query as { id: string }
  const recipe = await recipeCollection.findOne({
    _id: new ObjectId(recipeId),
  })
  res.status(200).json({ recipe })
}

export default handler
