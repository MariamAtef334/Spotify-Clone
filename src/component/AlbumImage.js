import React from 'react'
import '../styles/albumImage.css'
const AlbumImage = ({url}) => {
    console.log(url)
  return (
        <div className='albumImage flex'>
            <img src={url} alt='albumImage'/>
            <div className='albumImage-shadow'>
            <img src={url} alt='shadow' className='albumImage-shadow'/>
        </div>
        </div>

  )
}

export default AlbumImage