import { usePlaylistsStore } from '@/hooks/playlistStore';
import React, { useState } from 'react';

const ModalAddToPlaylist = ({ setShowModal, song }: any) => {
  const { playlists }: any = usePlaylistsStore();
  const { setPlaylists }: any = usePlaylistsStore();
  const [selectedPlaylist, setSelectedPlaylist] = useState('');
  const [isCreatingNewPlaylist, setIsCreatingNewPlaylist] = useState(false);
  const [newPlaylistName, setNewPlaylistName] = useState('');

  const handleAddToPlaylist = () => {
    if (isCreatingNewPlaylist && newPlaylistName) {
      const newPlaylist = { name: newPlaylistName, songs: [song] };
      setPlaylists([...playlists, newPlaylist]);
    } else if (selectedPlaylist) {
      const updatedPlaylists = playlists.map((playlist: any) => {
        if (playlist.name === selectedPlaylist) {
          return { ...playlist, songs: [...playlist.songs, song] };
        }
        return playlist;
      });
      setPlaylists(updatedPlaylists);
    }
    setShowModal(false);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-md w-96">
        <h2 className="text-lg font-bold mb-4">Add "{song.title}" to Playlist</h2>
        {!isCreatingNewPlaylist ? (
          <div className="flex flex-col space-y-4">
            <select
              className="p-2 border rounded"
              value={selectedPlaylist}
              onChange={(e) => setSelectedPlaylist(e.target.value)}
            >
              <option value="" disabled>Select a Playlist</option>
              {playlists.map((playlist: any, index: number) => (
                <option key={index} value={playlist.name}>{playlist.name}</option>
              ))}
            </select>
            <button
              onClick={() => setIsCreatingNewPlaylist(true)}
              className="text-blue-500"
            >
              + Create New Playlist
            </button>
          </div>
        ) : (
          <div className="flex flex-col space-y-4">
            <input
              type="text"
              placeholder="New Playlist Name"
              className="p-2 border rounded"
              value={newPlaylistName}
              onChange={(e) => setNewPlaylistName(e.target.value)}
            />
            <button
              onClick={() => setIsCreatingNewPlaylist(false)}
              className="text-blue-500"
            >
              Back to Playlists
            </button>
          </div>
        )}
        <div className="flex justify-end space-x-4 mt-6">
          <button
            onClick={() => setShowModal(false)}
            className="bg-gray-500 text-white px-4 py-2 rounded"
          >
            Cancel
          </button>
          <button
            onClick={handleAddToPlaylist}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalAddToPlaylist;
