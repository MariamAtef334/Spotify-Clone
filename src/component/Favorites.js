import React, { useState,useEffect } from 'react'
import APIKit from './Spotify';
import '../styles/library.css';
import {AiFillPlayCircle} from 'react-icons/ai';
import { IconContext } from 'react-icons';
import { useNavigate } from 'react-router-dom';
export default function Favorites()  {
  const [albums, setAlbums] = useState([]);

  async function getData(){
   const {data}=await APIKit.get("browse/featured-playlists");
   console.log("data.items",data.playlists.items);
  setAlbums(data.playlists.items);
   }
  useEffect(() => {
   getData();
  }, []);

  useEffect(() => {
   console.log("albums",albums);
  }, [albums]); 
  const navigate=useNavigate();
  const playPlaylist=(id)=>{
    console.log('Clicked playlist ID:',id); 
navigate('/player',{state:{id:id}});
  }
  return (
    <div className='screen-container'>
      <div className='library-body'>
      {albums ? albums.map((album)=>{
       return <div className='playlist-card' key={album?.id} onClick={()=>playPlaylist(album?.id)}>
        <img src={album?.images[0].url} className='playlist-image' alt='playlist-image'/>
        <p className='playlist-title'>{album?.name}</p>
        <p className='playlist-subtitle'>{album?.tracks.total} Songs</p> 
        <div className='playlist-fade'>
          <IconContext.Provider value={{size:"46px",color:"#E99D72"}}>
            <AiFillPlayCircle/>
          </IconContext.Provider>
        </div>
        </div>
      }):<div className=' d-flex align-items-center  justify-content-center '>
      <i className='fas fa-spinner fa-spin'>loading</i></div>}
      </div>
    </div>
  )
}

