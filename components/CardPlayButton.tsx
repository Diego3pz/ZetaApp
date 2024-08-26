import React from 'react'
import PlayIcon from '../icons/Play'
import PauseIcon from '../icons/Pause'
import { usePlayerIndexStore, usePlayerStore } from '@/hooks/playerStore';
import { useStatusShuffle } from '@/hooks/shuffle';
import { Prev } from '@/icons/Prev';
import { Next } from '@/icons/Next';

const CardPlayButton = ({ track, position }: any,) => {

    const {
        id,
        music,
        image,
        title,
        artist,
        key
    } = track[position]

    const {
        currentMusic,
        isPlaying,
        setIsPlaying,
        setCurrentMusic
    } = usePlayerStore(state => state)

    const isPlayingTrack = isPlaying && currentMusic?.song?.id === id

    const { setIndex, index }: any = usePlayerIndexStore()

    const { statusShuffle } = useStatusShuffle((state) => ({
        statusShuffle: state.statusShuffle
    }))



    const handleClick = () => {
        if (isPlayingTrack) {
            setIndex(position)
            console.log(index);
            setIsPlaying(false)
            return
        }
        setIsPlaying(true)
        setIndex(position)
        setCurrentMusic({ song: { id, track, music, image, artist, title, position }, playlist: track })

    }



    return (
        <button onClick={handleClick} className='card-play-button rounded-full bg-green-500 p-4'>
            {isPlayingTrack ? <PauseIcon /> : <PlayIcon />}
        </button>
    )
}

export default CardPlayButton

function shuffle(copySongs: any[]): any[] {
    throw new Error('Function not implemented.');
}

