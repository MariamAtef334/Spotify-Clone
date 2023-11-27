import React from 'react';
import '../styles/albumInfo.css';
const AlbumInfo = ({album}) => {
 console.log(album);
  return (
    <div className='albumInfo-card'>
        <div className='albumName-container'>
            <div className='marquee'>
            <p>{`${album?.name} - ${album?.artists[0]?.name}`}</p>
            </div>
        </div>
        <div className='albumInfo'>
            <p>{`${album?.name} is an ${album?.album_type} by ${album?.artists[0]?.name} with ${album?.total_tracks} track`}</p>
        </div>
        <div className='albumRelease'>
            <p>{`Release Date : ${album?.release_date}`}</p>
        </div>
    </div>
  )

}

export default AlbumInfo