import React from 'react'
import PlayIcon from '../icons/Play'
import PauseIcon from '../icons/Pause'
import { usePlayerIndexStore, usePlayerStore } from '@/hooks/playerStore';
import { useStatusShuffle } from '@/hooks/shuffle';

interface Track {
    id: string;
    music: string;
    image: string;
    title: string;
    artist: string;
    key: string;
}

interface CardPlayButtonProps {
    track: Track[];
    position: number;
}

const CardPlayButton: React.FC<CardPlayButtonProps> = ({ track, position }) => {

    const {
        id,
        music,
        image,
        title,
        artist,
    } = track[position];

    const {
        currentMusic,
        isPlaying,
        setIsPlaying,
        setCurrentMusic
    } = usePlayerStore(state => state);

    const isPlayingTrack = isPlaying && currentMusic?.song?.id === id;

    const { setIndex, index } = usePlayerIndexStore();

    const { statusShuffle } = useStatusShuffle(state => ({
        statusShuffle: state.statusShuffle
    }));

    const handleClick = () => {
        if (isPlayingTrack) {
            setIsPlaying(false);
            return;
        }
        setIsPlaying(true);
        setIndex(position);
        setCurrentMusic({ song: { id, track, music, image, artist, title, position }, playlist: track });
    }

    return (
        <button onClick={handleClick} className='card-play-button rounded-full bg-green-500 p-4'>
            {isPlayingTrack ? <PauseIcon /> : <PlayIcon />}
        </button>
    )
}

export default CardPlayButton;