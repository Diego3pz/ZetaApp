import axios from 'axios';

const TrackLyrics = async ({ id }: any) => {

     console.log(id);

    const options = {
        method: 'GET',
        url: 'https://shazam.p.rapidapi.com/shazam-songs/get-details',
        params: { id: id },
        headers: {
            'X-RapidAPI-Key': '757e4aef7emsh211c7ea609e9712p1fb321jsnc1a25867c5d0',
            'X-RapidAPI-Host': 'shazam.p.rapidapi.com'
        }
    };

    const response = await axios.request(options);
    const Datos = response.data.resources.lyrics;
    const primerValor = Object.keys(Datos)
    // console.log(primerValor[0]);

    const data = response.data.resources.lyrics[primerValor[0]].attributes.text
    // console.log(data);


    return (
        <>
            <div className=" mt-5 mb-7">
                {
                    data.map((lyric: any, i: number) => (
                        <p key={i} className="text-zinc-300 ">{lyric}</p>
                    ))
                }
            </div>
        </>
    )
}

export default TrackLyrics