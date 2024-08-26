import axios from 'axios'
import Redis from 'ioredis'

let redis = new Redis(process.env.REDIS_URL as string);

export const top = async () => {

  const data = await redis.get('top', (err: any, result: any) => {
    if (result !== undefined || result !== null) {
      return JSON.parse(result)
    }
  })

  if (data !== undefined && data !== null) {
    return JSON.parse(data)
  }

  const options = {
    method: 'GET',
    url: 'https://shazam.p.rapidapi.com/charts/track',
    headers: {
      'X-RapidAPI-Key': process.env.RAPIDAPI_KEY,
      'X-RapidAPI-Host': 'shazam.p.rapidapi.com'
    }
  };

  const axiosResponse = await axios.request(options).then(function (response) {
    let data: any = [];

    const track = response.data
    const tracksWithId = track.tracks.filter((track: any) => !!track.hub?.actions?.[0]?.id);

    tracksWithId.map((track: any, index: number) => {
      const { hub, images, title, subtitle, key } = track

      if (hub.actions === undefined || hub.actions === null) return

      data.push({
        id: hub.actions[0].id,
        music: hub.actions[1].uri,
        image: images.coverart,
        title: title,
        artist: subtitle,
        key: key
      })
    })
    redis.set('top', JSON.stringify({ top: data }), 'EX', 60 * 60 * 24)
    return { top: data }

  }).catch(function (error) {
    console.log(error);
  });

  return axiosResponse
}

