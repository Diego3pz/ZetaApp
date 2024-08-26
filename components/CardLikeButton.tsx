"use client"

import React, { useEffect, useState } from 'react'
import LikeIcon from '../icons/Like';
import LikeGreenIcon from '../icons/LikeGreen';
import localForage from "localforage";
import { useActionInfoStore } from '@/hooks/likeStore';

const CardLikeButton = ({ track }: any) => {

    const { setTextInfo }: any = useActionInfoStore()
    const [active, setActive] = useState(false)

    const handleClickLike = () => {
        setActive(!active)

        if (!active) {
            localForage.getItem('likedSongs')
                .then((result: any) => {
                    if (result === null) { result = [] }
                    localForage.setItem('likedSongs', [track, ...result])
                    setTextInfo({
                        text: 'Added to your liked songs',
                        active: true
                    })
                })
        } else {
            localForage.getItem('likedSongs')
                .then((result: any) => {
                    result = result.filter((items: any) => items.id !== track.id)
                    localForage.setItem('likedSongs', result)
                    setTextInfo({
                        text: 'Removed from your liked songs',
                        active: true
                    })
                })
        }
    }

    useEffect(() => {
        localForage.getItem('likedSongs')
            .then((result: any) => {
                if (result === null) return
                result.find((item: any) => item.id === track.id) && setActive(true)
            })
    }, [track])


    return (
        <button onClick={handleClickLike} className='relative card-play-button rounded-full bg-zinc-900 p-2 hover:scale-110 transition-all'>
            {active ? <LikeGreenIcon /> : <LikeIcon />}
        </button>
    )
}

export default CardLikeButton