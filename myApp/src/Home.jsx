import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom'

function Home() {
  

    const navigate = useNavigate();




    const handleClick = () =>{

      navigate("/SignUp");



    }
    return(<>
    <div className= "home-container">
   <h1 className ="home-header">Discover your next favorite Movie</h1>

   <h3 id ="Explore">Explore. Curate. Connect.</h3>

     <p className="mt-5 paragraph-words" >Discover shows and movies, create a personalized watchlist, and keep up with the latest trends. Log in to add favorites and manage your watchlist. Connect with others by sharing reviews, recommendations, and ratings on Flicsy.

</p>

     <button className=" btn btn-danger  btn-lg mt-5" onClick={handleClick}>Join Flicsy for free</button>



    </div>
    
    
    
    </>)

}

export default Home;
