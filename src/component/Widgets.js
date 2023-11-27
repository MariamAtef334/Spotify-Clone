import React, { useEffect, useState } from 'react';
import '../styles/widgets.css';
import apiClient from './Spotify';
import WidgetCard from './WidgetCard';
import { useNavigate } from 'react-router-dom';
const Widgets = ({artistId}) => {
    const [similar,setSimilar]=useState([]);
    const [featured,setFeatured]=useState([]);
   
     const id=artistId;
   async function getRelated(){
    try{
      console.log("artisId",artistId)
   const {data}= await apiClient.get(`artists/${artistId}/related-artists`);
   if(data){

    console.log("related data",data.artists.slice(0,3));
    setSimilar(data.artists.slice(0,3));

   
   }
  }
  catch (error) {
    console.error('Error fetching related data:', error);
}
}    ;
async function getFeatured(){
  try{
 const {data}= await apiClient.get(`browse/featured-playlists`);
 if(data){

  console.log("featured data",data.playlists.items.slice(0,3));
  setFeatured(data.playlists.items.slice(0,3));
 }
}
catch (error) {
  console.error('Error fetching related data:', error);
}
}    

useEffect(()=>{
  if(artistId){
getRelated();

  }
    },[artistId]);

    useEffect(()=>{
    
    getFeatured();
    
      
        },[]);

    useEffect(()=>{
      
       console.log("similar",similar);
       console.log("featured",featured);
      
        },[similar,featured])
       
        
  return (
    <div className="widgets-body flex ">
      <WidgetCard title="Similar Artists" similar={similar} id={artistId}/>
      <WidgetCard title="Made For You" featured={featured} id={artistId}/>
     
    </div>
  )
}

export default Widgets