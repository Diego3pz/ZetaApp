
import { getDetails } from '@/services/getDetails'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { id } = req.query;
    const data = await getDetails(id)

    res.status(200).json(data || [])
}