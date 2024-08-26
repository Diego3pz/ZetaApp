import { getFavorites } from '@/services/likes'
import { useEffect, useState } from 'react'

export const useFavorites = () => {
    const [favorites, setFavorites] = useState()

    useEffect(() => {
        handleFavorites()
    }, [])

    const handleFavorites = async () => {
        const data = await getFavorites()
        setFavorites(data)
    }

    return { favorites }
}