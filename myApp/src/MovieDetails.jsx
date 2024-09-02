import React, { useEffect, useState } from 'react';
import { useParams,useNavigate } from 'react-router-dom';
import axios from 'axios';


function MovieDetails() {
    const { id } = useParams();
    const [movies, setMovie] = useState(null);
    const [error, setError] = useState(null);
    const APIKEY = "ccad613cef0646f5709c9d3d341c4cb7";
      const navigate = useNavigate();
    useEffect(() => {
        // Add class to body when the component mounts
        document.body.classList.add('movie-details-background');

        const fetchMovieDetails = async () => {
            try {
                const response = await axios.get(`https://api.themoviedb.org/3/search/movie?query=${id}&api_key=${APIKEY}`);
                if (!response) {
                    throw new Error("Movie details couldn't be found");
                }
                setMovie(response.data.results);
            } catch (error) {
                console.error("Error fetching movie details:", error);
                setError("There has been an error fetching the movie details.");
            }
        };

        fetchMovieDetails();

        // Remove class when component unmounts
        return () => {
            document.body.classList.remove('movie-details-background');
        };
    }, [id, APIKEY]);

    if (error) {
        return <div className="error">{error}</div>;
    }

    if (!movies) {
        return <div>Loading...</div>;
    }

    const handleInfoClick = (movieId) =>{
      
        console.log("Navigating to movie ID:", movieId);
        navigate(`/movieinfo/${movieId}`);



    }

    return (
        <div className="movieContainer">
    {movies.map(movie => (
        <div key={movie.id} className="movieImageContainer">
            {movie.poster_path ? (
            <img
                src={`https://image.tmdb.org/t/p/w185${movie.poster_path}`}
                alt={movie.title}
                className="movieImage"   
            onClick={()=>handleInfoClick(movie.id)}/>
            ) : (<img src = "/poster-holder.jpg"  alt ="No poster avaliable" className ="movieImage"/>)}

            <div className="movieInfo">
                <h3>{movie.title}</h3>
                <p>{movie.release_date}</p>
            </div>
        </div>
    ))}
</div>

    
    );
}

export default MovieDetails;
