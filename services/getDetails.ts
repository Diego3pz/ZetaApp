import axios from 'axios'
import Redis from 'ioredis'

let redis = new Redis(process.env.REDIS_URL as string);
export const getDetails = async (id: any) => {
    const data = await redis.get(`track-${id}`, (err: any, result: any) => {
        if (result !== undefined || result !== null) {
            return JSON.parse(result)
        }
    })

    if (data !== undefined && data !== null) {
        return JSON.parse(data)
    }

    const options = {
        method: 'GET',
        url: 'https://shazam.p.rapidapi.com/songs/v2/get-details',
        params: { id: id },
        headers: {
            'X-RapidAPI-Key': process.env.RAPIDAPI_KEY,
            'X-RapidAPI-Host': 'shazam.p.rapidapi.com'
        }
    };

    const axiosResponse = await axios.request(options).then(function (response) {
        let data: any = [];

        const { id } = response.data.data[0]
        const { attributes } = response.data.data[0]
        const { albumName, durationInMillis, releaseDate, composerName, previews, artwork, artistName, name } = attributes
        const urlImg = artwork.url
        const width = '400', height = '400';
        const color = artwork.bgColor

        const fixUrlImg = urlImg.replace('{w}', width).replace('{h}', height);

        if (attributes === undefined || attributes === null) return

        data = {
            id,
            music: previews[0].url,
            album: albumName,
            duration: durationInMillis,
            releaseDate: releaseDate,
            composer: composerName,
            image: fixUrlImg,
            artist: artistName,
            title: name,
            bgColor: color
        }

        redis.set(`track-${id}`, JSON.stringify(data))
        return data

    }).catch(function (error) {
        console.log(error);
    });

    return axiosResponse
}

