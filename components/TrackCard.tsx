import React from 'react'

const TrackCard = async (idParam: any) => {

    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '757e4aef7emsh211c7ea609e9712p1fb321jsnc1a25867c5d0',
            'X-RapidAPI-Host': 'spotify81.p.rapidapi.com'
          }
    };
    const res = await fetch(`https://spotify81.p.rapidapi.com/download_track?q=${idParam}`, options)
    const data = await res.json();
    const DataTrack = (data)
    console.log(DataTrack.id);

    const response = await fetch(`https://spotify81.p.rapidapi.com/download_track?q=${DataTrack.id}`, options)
    const Datos = await response.json();
    console.log(Datos);


    const idArtist = (Datos.artists[0]?.id)
    const repon = await fetch(`https://spotify81.p.rapidapi.com/artists?ids=${idArtist}`, options)
    const ArtistsId = await repon.json();
    //  console.log(ArtistsId.artists[0].images[2].url);
    return (
        <>
            <picture className="aspect-square w-full h-auto flex-none">
                <img
                    src={Datos.album.images[0].url}
                    alt={`Cover of ${Datos.name}`}
                    className="object-cover w-full h-full rounded-md"
                />
            </picture>
            <div className="flex flex-auto flex-col truncate px-2">
                <h4 className="text-white text-sm" >
                    {Datos.name}
                </h4>
                <span className="text-xs text-gray-400">
                    {ArtistsId.artists[0].name}
                </span>
            </div>
        </>
    )
}

export default TrackCard