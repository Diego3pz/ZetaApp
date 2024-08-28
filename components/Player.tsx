import PlayIcon from '../icons/Play';
import PauseIcon from '../icons/Pause';
import VolumeIcon from '../icons/Volume';
import VolumeSilenceIcon from '../icons/VolumeSilence';
import { useRef, useState, useEffect, MutableRefObject } from 'react';
import { Slider } from './Slider';
import { usePlayerIndexStore, usePlayerStore } from '@/hooks/playerStore';
import { Next } from '@/icons/Next';
import { Prev } from '@/icons/Prev';

interface Track {
    id: string;
    title: string;
    artist: string;
    image: string;
    music: string;
    position: number;
}

interface CurrentSongProps {
    track: Track;
}

interface SongControlProps {
    audio: MutableRefObject<HTMLAudioElement | null>;
}

interface PlayerState {
    currentMusic: {
        playlist: Track[];
        song: Track | null;
    };
    isPlaying: boolean;
    setCurrentMusic: (music: { playlist: Track[]; song: Track }) => void;
    setIsPlaying: (isPlaying: boolean) => void;
    volume: number;
}

const CurrentSong: React.FC<CurrentSongProps> = ({ track }) => {
    return (
        <div className='flex items-center gap-5 relative overflow-hidden'>
            <picture className='flex-none w-16 h-16 bg-zinc-800 rounded-md shadow-lg overflow-hidden'>
                <img src={track.image} alt={track.title} />
            </picture>
            <div className='flex flex-col overflow-hidden'>
                <h3 className='font-semibold text-sm w-full first-letter:uppercase md:truncate'>
                    {track.title}
                </h3>
                <span className='text-xs w-full opacity-80 md:truncate'>
                    {track.artist}
                </span>
            </div>
        </div>
    );
};

const SongControl: React.FC<SongControlProps> = ({ audio }) => {
    const [currentTime, setCurrentTime] = useState(0);

    useEffect(() => {
        const handleTimeUpdate = () => {
            if (audio.current) {
                setCurrentTime(audio.current.currentTime);
            }
        };

        audio.current?.addEventListener('timeupdate', handleTimeUpdate);
        return () => {
            audio.current?.removeEventListener('timeupdate', handleTimeUpdate);
        };
    }, [audio]);

    const formatTime = (time: number | null | undefined) => {
        if (time === null || time === undefined) {
            return '0:00';
        }

        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);

        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    };

    const duration = audio.current?.duration ?? 0;

    return (
        <div className='text-xs pt-2 w-full md:w-[350px] lg:w-[450px] absolute md:relative md:flex left-0 bottom-[143px] md:left-auto md:bottom-auto'>
            <span className='opacity-50 w-12 text-right hidden md:flex'>
                {formatTime(currentTime)}
            </span>
            <Slider
                defaultValue={[0]}
                value={[currentTime]}
                max={duration}
                min={0}
                className='w-full flex z-[999]'
                onValueChange={(value) => {
                    if (audio.current) {
                        audio.current.currentTime = value[0];
                    }
                }}
            />
            <span className='pl-4 opacity-50 w-12 hidden md:flex'>
                {duration ? formatTime(duration) : '0:00'}
            </span>
        </div>
    );
};

const VolumeControl: React.FC = () => {
    const volume = usePlayerStore(state => state.volume);
    const setVolume = usePlayerStore(state => state.setVolume);
    const previousVolumeRef = useRef(volume);

    const isVolumeSilenced = volume < 0.1;

    const handleClickVolume = () => {
        if (isVolumeSilenced) {
            setVolume(previousVolumeRef.current);
        } else {
            previousVolumeRef.current = volume;
            setVolume(0);
        }
    };

    return (
        <div className='md:flex justify-center gap-x-2'>
            <button className='opacity-70 hover:opacity-100' onClick={handleClickVolume}>
                {volume < 0.1 ? <VolumeSilenceIcon /> : <VolumeIcon />}
            </button>
            <Slider
                defaultValue={[100]}
                max={100}
                min={0}
                className='sm:w-[50px] lg:w-[95px] hidden md:flex'
                value={[volume * 100]}
                onValueChange={(value) => {
                    setVolume(value[0] / 100);
                }}
            />
        </div>
    );
};

const Player: React.FC = () => {
    const { currentMusic, setCurrentMusic, isPlaying, setIsPlaying, volume } = usePlayerStore(
        state => state as PlayerState
    );
    const audioRef = useRef<HTMLAudioElement>(null);

    useEffect(() => {
        if (isPlaying) {
            audioRef.current?.play();
        } else {
            audioRef.current?.pause();
        }
    }, [isPlaying]);

    useEffect(() => {
        const { song } = currentMusic;
        if (song) {
            audioRef.current!.src = song.music;
            audioRef.current!.volume = volume;
            audioRef.current!.play();
        }
    }, [currentMusic]);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = volume;
        }
    }, [volume]);

    const handleClick = () => {
        setIsPlaying(!isPlaying);
    };

    const getSongIndex = (index: number, id: string) => {
        return currentMusic.playlist.findIndex(e => e.id === id);
    };

    const onNextSong = () => {
        const { song, playlist } = currentMusic;
        const index = getSongIndex(song!.position, song!.id);
        if (index > -1 && index + 1 < playlist.length) {
            setIsPlaying(false);
            setCurrentMusic({ playlist, song: playlist[index + 1] });
            setIsPlaying(true);
        }
    };

    const onPrevSong = () => {
        const { song, playlist } = currentMusic;
        const index = getSongIndex(song!.position, song!.id);
        if (index > -1 && index > 0) {
            setIsPlaying(false);
            setCurrentMusic({ playlist, song: playlist[index - 1] });
            setIsPlaying(true);
        }
    };

    return (
        <div className="flex flex-row items-center justify-between w-full p-4 bg-gradient-to-t from-zinc-950 to-zinc-900 rounded-lg text-white">
            <div className='w-full md:w-[250px] lg:w-auto absolute bottom-[9rem] p-2 md:p-0 md:relative md:flex md:bottom-auto left-0 md:left-auto backdrop-blur-md bg-zinc-800/30 md:bg-transparent z-30'>
                {currentMusic.song ? (
                    <CurrentSong track={currentMusic.song} />
                ) : (
                    <div className='flex item-center gap-5 relative overflow-hidden'>
                        <picture className='w-16 h-16 bg-zinc-800 rounded-md shadow-lg overflow-hidden'>
                            <img src={''} alt={''} />
                        </picture>
                        <h3 className='font-bold block'>{''}</h3>
                    </div>
                )}
            </div>
            <div className="grid place-content-center gap-4 flex-1 sm:mb-0">
                <div className="flex justify-center flex-col items-center">
                    <div className="flex gap-4 sm:gap-8">
                        <button onClick={onPrevSong} title="Prev" className=''>
                            <Prev />
                        </button>
                        <button className="bg-white rounded-full p-2" onClick={handleClick}>
                            {isPlaying ? <PauseIcon /> : <PlayIcon />}
                        </button>
                        <button onClick={onNextSong} title="Next" className=''>
                            <Next />
                        </button>
                    </div>
                    <SongControl audio={audioRef} />
                    <audio ref={audioRef}></audio>
                </div>
            </div>
            <div className="hidden md:grid place-content-center w-full sm:w-auto">
                <VolumeControl />
            </div>
        </div>
    );
};

export default Player;