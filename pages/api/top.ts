import { top } from "@/services/top";
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  const data = await top()

  res.status(200).json(data || [])
}