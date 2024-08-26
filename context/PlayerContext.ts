import React, { createContext, useState } from 'react';

const PlayerContext = createContext(null);

export const PlayerProvider = ({ children }: any) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentSong, setCurrentSong] = useState(null);
};

export default PlayerContext;