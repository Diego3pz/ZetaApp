import { v4 as uuidv4 } from 'uuid'
import localForage from 'localforage'

export const newPlaylist = async (name: string, song: any | any[]) => {
    const result = localForage.getItem('playlists')
        .then((result: any | any) => {
            if (result === null) result = []
            result.unshift(
                {
                    uuid: uuidv4(),
                    name: name,
                    song: song
                }
            )
            localForage.setItem('playlists', result)
            return result
        })
    return result
}

export const addSong = (uuid: string, song: any) => {
    localForage.getItem('playlists')
        .then((result: any | any) => {
            result.map((playlist: any | any) => {
                if (playlist.uuid === uuid) {
                    playlist.song.push(song)
                }
            })

            localForage.setItem('playlists', result)
        })
}

export const deletePlaylist = async (uuid: string) => {
    const result = await localForage.getItem('playlists')
        .then((result: any | any) => {
            if (result === null) result = []
            result = result.filter((playlist: any) => playlist.uuid !== uuid)
            localForage.setItem('playlists', result)
            return result
        })
    return result
}

export const editNamePlaylist = (uuid: string, name: string) => {

}