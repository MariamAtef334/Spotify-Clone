import React, { useEffect } from 'react';
import '../styles/queue.css';
const Queue = ({tracks,setCurrentIndex}) => {

  return (
    <div className='queue-container flex'>
        <div className='queue flex'>
            <p className='upNext'>Up Next</p>
            <div className='queue-list'>
                {tracks.map((track,index)=>{
                    return <div className='queue-item flex' onClick={()=>setCurrentIndex(index)} key={index}>
                        <p className='track-name'>{track?.track?.name}</p>
                        <p>0:30</p>
                    </div>
                })}
            </div>
        </div>
    </div>
  )
}

export default Queue