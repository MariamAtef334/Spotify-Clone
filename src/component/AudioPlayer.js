import React, { useEffect,useState,useRef } from 'react';
import '../styles/audioPlayer.css';
import ProgressCircle from './ProgressCircle';
import Controls from './Controls';
import WaveAnimation from './WaveAnimation';
const AudioPlayer = ({album,setCurrentIndex,currentIndex,total}) => {
  const [isPlaying,setIsPlaying]=useState(true);
  const [trackProgress,setTrackProgress]=useState(0);
  let audioSrc=total[currentIndex]?.track.preview_url;
  const audioRef=useRef(new Audio(total[0]?.track.preview_url));
  // console.log(audioRef.current);
  const intervalRef=useRef();
  const isReady=useRef(false);
  const {duration}=audioRef.current;
  const currentPercentage=duration ? (trackProgress/duration)*100:0;
 // console.log(currentPercentage);
  const startTimer=()=>{
    clearInterval(intervalRef.current);
    intervalRef.current=setInterval(()=>{
      if(audioRef.current.ended){
        handleNext();
      }
      else{
        setTrackProgress(audioRef.current.currentTime);
      }
    },[1000])
  }
  const handlePlay = () => {
    setIsPlaying(true);
    audioRef.current.play().then(() => {
      startTimer();
    }).catch(error => {
      console.error("Audio playback failed:", error);
    });
  };

  const handlePause = () => {
    setIsPlaying(false);
    audioRef.current.pause();
    clearInterval(intervalRef.current);
  };

  useEffect(() => {
    if (isPlaying) {
      handlePlay();
    } else {
      handlePause();
    }
  }, [isPlaying]);
  useEffect(() => {
    audioRef.current.pause();
    audioRef.current = new Audio(audioSrc);
    setTrackProgress(audioRef.current.currentTime);
    if (isReady.current) {
      setIsPlaying(true);
      audioRef.current.play().then(() => {
        startTimer();
      });
    } else {
      isReady.current = true;
    }
  }, [currentIndex, audioSrc]);
  useEffect(()=>{
   return ()=>{
    audioRef.current.pause();
    clearInterval(intervalRef.current);
   }
  },[])
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);
  
 const handleNext=()=>{
  if (currentIndex < total.length - 1){
    setCurrentIndex(currentIndex+1);
  }
  else{
    setCurrentIndex(0);
  }
 };
 const handlePrev=()=>{
  if (currentIndex -1 <0){
    setCurrentIndex(total.length -1);
  }
  else{
    setCurrentIndex(currentIndex - 1);
  }
 };
 const addZero=(n)=>{
  return n>9?""+n:"0"+n;
 }
  return (
    <div className='player-body flex'>
        <div className='player-left-body'>
          
            <ProgressCircle
            percentage={currentPercentage}
            isPlaying={true}
            image={album?.images[0]?.url}
            size={300}
            color='#C96850'
            />
        </div>
        <div className='player-right-body flex'> 
            <p className='song-title'>{album?.name}</p>
            <p className='song-artist'>{album?.artists[0]?.name}</p>
            <div className='player-right-bottom flex'>
              <div className='song-duration flex'>
              <p className='duration'>0:{addZero(Math.round(trackProgress))}</p>
              <WaveAnimation isPlaying={isPlaying}/>
              <p className='duration'>0:30</p>
              </div>
              <Controls
              isPlaying={isPlaying}

              setIsPlaying={setIsPlaying}
              handleNext={handleNext}
              handlePrev={handlePrev}
              total={total} 
              />
            </div>
        </div>
    </div>
  )
}

export default AudioPlayer