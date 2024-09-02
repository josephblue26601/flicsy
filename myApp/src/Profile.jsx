import React, {useState, useEffect} from 'react';
import { getAuth,signOut } from 'firebase/auth';
import { getDoc, doc } from 'firebase/firestore';
import { auth, db } from './config.js';
import {useNavigate} from 'react-router-dom';


function Profile() {
    const auth = getAuth();
    const user = auth.currentUser;
    const [error, setError] = useState(null);
    const [favoritemovies, setFavoriteMovies] = useState([]);
   const navigate = useNavigate();
    useEffect(() => {
        const fetchFavoriteMovies = async () => {
            try {
                const user = auth.currentUser;

                if (user) {
                    const docRef = doc(db, 'users', user.uid);
                    const docSnap = await getDoc(docRef);

                    if (docSnap.exists()) {
                        const data = docSnap.data();
                        console.log('Fetched data:', JSON.stringify(data, null, 2)); // Detailed log
                        setFavoriteMovies(data.favorites || []);
                    } else {
                        console.log("No document was found");
                    }
                }
            } catch (error) {
                console.log("There has been an error", error);
                setError("There has been an error fetching data");
            }
        };

        fetchFavoriteMovies();
    }, [user]);

    if (error) {
        return <div className="error">{error}</div>;
    }

    
    const handleMovieInfo = (movieId) =>{

        console.log("Navigating to movie ID:", movieId);
        navigate(`/movieinfo/${movieId}`);




    }



  const handleLogOut = async () =>{
 
    try{
     if(window.confirm("are you sure you want to  Log out?")){
       await signOut(auth);
      navigate('/Login');
     }
    }
    catch (error) {
        setError(error.message);
      }



  }



    

    return (
        <div>
            <h2 style={{fontSize:'50px'}}>Hello, welcome {user.email}</h2>  
            <button className="btn btn-outline-danger btn-lg mr-5 logout-press" onClick ={handleLogOut}>Log out</button>
            <hr></hr>
         
            <h3 style ={{fontSize:'40px',fontWeight:600}}>Your Favorite Movies: </h3>
           
            <ul className="favorite-list">
          {favoritemovies.map(movie => <li key ={movie.id} className="mt-4 favorite-movies">

            <img src={movie.image}  onClick ={() =>handleMovieInfo(movie.id)}/>
         
           
          </li>)}


            </ul>
          
            
        </div>
    );
}

export default Profile;
