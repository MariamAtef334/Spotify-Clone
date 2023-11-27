import React, { useEffect,useState } from 'react';
import '../styles/player.css' ;
import {useLocation} from 'react-router-dom';
import apiClient from './Spotify';
import SongCard from './SongCard';
import Queue from './Queue';
import AudioPlayer from './AudioPlayer';
import Widgets from './Widgets';
const Player = () => {
const location=useLocation();
const [tracks,setTracks]=useState([]);
const [currentTrak,setCurrentTrack]=useState({});
const [currentIndex,setCurrentIndex]=useState(0);
const [loading,setLoading]=useState(true);
const [error, setError] = useState(false); 
console.log(location.state?.id)
async function getItems(){
  if (!location.state?.id) {
    setLoading(false);
    setError(true);
    return;
  }
  const {data}=await apiClient.get("playlists/"+location.state?.id+"/tracks");

  if(data){
    setLoading(false);
    setTracks(data?.items);
  setCurrentTrack(data?.items[0]?.track);

  }
  else{
    setLoading(true)
  }

}
useEffect(()=>{
  getItems();
  
},[location.state])
useEffect(()=>{
  if(!loading)
{
  console.log("tracks: "+tracks);

}
  
},[tracks]);
useEffect(()=>{
  if(!loading){
  setCurrentTrack(tracks[currentIndex]?.track);
  console.log("currentTrack: "+ currentTrak);
  console.log("current track album: "+currentTrak?.album);
  console.log('currentindex',currentIndex);}
},[currentIndex,tracks])
  return (
    <>
 {!loading? (
  !error?(
    
    <div  className='screen-container flex'>
      
      <div className='left-player-body'>
        <AudioPlayer album={currentTrak?.album} setCurrentIndex={setCurrentIndex} currentIndex={currentIndex} total={tracks}/>
        <Widgets artistId={currentTrak?.album?.artists[0]?.id}/>
      </div>
     
      <div className='right-player-body '>
            <SongCard album={currentTrak?.album}/>
            <Queue tracks={tracks} setCurrentIndex={setCurrentIndex} />
      </div>
    </div>
  )
  : (
    <div className=' d-flex align-items-center justify-content-center m-auto '> <h1>No playlist is playing now!</h1></div>
   
  )
 )
   
       : <div className=' d-flex align-items-center  justify-content-center w-100  '>
       <i className='fas fa-spinner fa-spin'></i></div>}
    </>
  )
}

export default Player