import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Library from './Library';
import Player from './Player';
import Favorites from './Favorites';
import '../styles/home.css';
import Sidebar from './Sidebar';
import Login from './Login';
import { setClientToken } from './Spotify';
const Home = () => {
  const [token,setToken]=useState();
  
  useEffect(()=>{
    const token=localStorage.getItem("token");
    const hash=window.location.hash;
    window.location.hash="";
    if(!token && hash){
      const _token =hash.split("&")[0].split('=')[1];
      localStorage.setItem('token',_token)
      setToken(_token);
      setClientToken(_token)
    }
   else{
    setToken(token);
    setClientToken(token);
   }
  },[])

  return !token?(
    <Login/>
  ):(
<div className='main-body'>
<Sidebar  token={token}/>
    <Routes>
        <Route path='/' element={<Library/>}/>
        <Route path='/player' element={<Player/>}/>
        <Route path='/favorites' element={<Favorites/>}/>

    </Routes>
    </div>
  )
}

export default Home;