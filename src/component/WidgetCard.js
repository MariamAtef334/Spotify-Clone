import React from 'react';
import "../styles/widgetCard.css";
import WidgetEntry from "./widgetEntry";
import { IconContext } from "react-icons";
import { FiChevronRight } from "react-icons/fi";
import { useNavigate } from 'react-router-dom';
const WidgetCard = ({ title, similar, featured, newRelease,id }) => {
    const navigate=useNavigate();
    const playPlaylist=(id)=>{
  navigate('/player',{state:{id:id}});
    }
  return (
      <div className="widgetcard-body">
      <p className="widget-title">{title}</p>
      {similar
        ? similar.map((artist) => {
            <div onClick={()=>playPlaylist(id)}>
            <WidgetEntry
              title={artist?.name}
              subtitle={artist?.followers?.total + " Followers"}
              image={artist?.images[2]?.url}
            />
         </div>})
        : featured
        ? featured.map((playlist) => {
           <div onClick={()=>playPlaylist(id)}>
            <WidgetEntry
              title={playlist?.name}
              subtitle={playlist?.tracks?.total + " Songs"}
              image={playlist?.images[0]?.url}
            />
       </div> })
        : newRelease
        ? newRelease.map((album) => {
            return <div  className='w-100' >
            <WidgetEntry
              title={album?.name}
              subtitle={album?.artists[0]?.name}
              image={album?.images[2]?.url}
                />
        </div>})
        : null}
      <div className="widget-fade">
        <div className="fade-button">
          <IconContext.Provider value={{ size: "24px", color: "#c4d0e3" }}>
            <FiChevronRight />
          </IconContext.Provider>
        </div>
      </div>
    </div>
  )
}

export default WidgetCard