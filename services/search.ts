import axios from 'axios'
import Redis from 'ioredis'

let redis = new Redis(process.env.REDIS_URL as string);
export const search = async (query: any) => {

    const data = await redis.get('search-${query}', (err: any, result: any) => {
        if (result !== undefined || result !== null) {
            return JSON.parse(result)
        }
    })

    if (data !== undefined && data !== null) {
        return JSON.parse(data)
    }

    const options = {
        method: 'GET',
        url: 'https://shazam.p.rapidapi.com/search',
        params: {
            term: query,
            limit: '10'
        },
        headers: {
            'X-RapidAPI-Key': process.env.RAPIDAPI_KEY,
            'X-RapidAPI-Host': 'shazam.p.rapidapi.com'
        }
    };

    const axiosResponse = await axios.request(options).then(function (response) {
        let data: any = [];
        const { tracks } = response.data
        const { hits } = tracks

        hits?.map((track: any) => {
            if (hits === undefined || hits === null) return

            data.push({
                id: track.track.hub.actions[0].id,
                music: track.track.hub.actions[1].uri,
                image: track.track.images.coverart,
                artist: track.track.subtitle,
                title: track.track.title,
            })
        })
        redis.set(`search-${query}`, JSON.stringify({ songs: data }))
        return { songs: data }

    }).catch(function (error) {
        console.log(error);
    });

    return axiosResponse
}