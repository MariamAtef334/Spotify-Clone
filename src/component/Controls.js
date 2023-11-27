import React from 'react';
import '../styles/controls.css';
import { IconContext } from 'react-icons';
import { FaPause } from "react-icons/fa";
import { IoPlaySkipBack, IoPlaySkipForward, IoPlay } from "react-icons/io5";
const Controls = ({isPlaying,setIsPlaying,handleNext,handlePrev,total}) => {
  return (
    <IconContext.Provider value={{size:"30px",color:"#C4DBE3"}}>
    <div className="controls-wrapper flex">
        <div className="action-btn flex" onClick={handlePrev}>
          <IoPlaySkipBack />
        </div>
        <div
          className={
            isPlaying ? "play-pause-btn flex active" : "play-pause-btn flex"
          }
          onClick={() => setIsPlaying(!isPlaying)}
        >
          {isPlaying ? <FaPause /> : <IoPlay />}
        </div>
        <div className="action-btn flex" onClick={handleNext}>
          <IoPlaySkipForward />
        </div>
      </div>
    </IconContext.Provider>

  )
}

export default Controls