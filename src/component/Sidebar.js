import React, { useEffect, useState } from 'react';
import profile from '../images/profile.jpg';
import '../styles/sidebar.css';
import SidebarButton from './SidebarButton';
import { FaGripfire, FaPlay } from "react-icons/fa";
import { FaSignOutAlt } from "react-icons/fa";
import { IoLibrary } from "react-icons/io5";
import { MdSpaceDashboard } from "react-icons/md";
import apiClient from './Spotify';
import { MdOutlineFeaturedPlayList } from "react-icons/md";
const Sidebar = ({token}) => {
  const [image,setImage]=useState(profile);
  useEffect(() => {
    apiClient.get("me").then((response) => {
    if (response.data.images.length===0){
      setImage(profile)
    }
    else{
setImage(response.data.images[0].url)
    }
     
    });
  }, []);

  const logout=()=>{
    localStorage.removeItem("token");
    window.location.href = '/login';
  }
  return token?( 
    <div className='sidebar-container'>
        <img src={image} alt= 'profile' className='profile-img'/>
        <div>
        {/* <SidebarButton title="Feed" to="/feed" icon={<MdSpaceDashboard />}/> */}
        {/* <SidebarButton title="NewRelease" to="/new" icon={<FaGripfire />}/> */}
        <SidebarButton  title="Player" to="/player" icon={<FaPlay />}/>
        <SidebarButton  title="Featured"
          to="/favorites"
          icon={<MdSpaceDashboard />}/>
        <SidebarButton  title="Library" to="/" icon={<IoLibrary />}/>
        </div>
       <div onClick={logout}><SidebarButton title="Sign Out" to="" icon={<FaSignOutAlt />}/></div> 
    </div>
   
  ) :null
}

export default Sidebar