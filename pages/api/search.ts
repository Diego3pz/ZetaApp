import type { NextApiRequest, NextApiResponse } from 'next'
import { search } from '@/services/search'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {

    if (req.query.song === undefined) return res.status(200).json([])

    const data = await search(req.query.song as string)

    return res.status(200).json(data || [])
}