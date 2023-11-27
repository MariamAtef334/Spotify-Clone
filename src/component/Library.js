import React, { useState,useEffect } from 'react'
import APIKit from './Spotify';
import '../styles/library.css';
import {AiFillPlayCircle} from 'react-icons/ai';
import { IconContext } from 'react-icons';
import { useNavigate } from 'react-router-dom';
export default function Library()  {
  const [playlists, setPlaylists] = useState([]);

  async function getData(){
   const {data}=await APIKit.get("me/playlists");
  setPlaylists(data.items);
   }
  useEffect(() => {
   getData();
  }, []);

  useEffect(() => {
   // console.log(playlists);
  }, [playlists]); 
  const navigate=useNavigate();
  const playPlaylist=(id)=>{
    console.log('Clicked playlist ID:', id); 
navigate('/player',{state:{id:id}});
  }
  return (
    <div className='screen-container'>
      <div className='library-body'>
      {playlists ? playlists.map((playlist)=>{
       return <div className='playlist-card' key={playlist.id} onClick={()=>playPlaylist(playlist.id)}>
        <img src={playlist.images[0].url} className='playlist-image' alt='playlist-image'/>
        <p className='playlist-title'>{playlist.name}</p>
        <p className='playlist-subtitle'>{playlist.tracks.total} Songs</p>
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

