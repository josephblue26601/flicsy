import axios from 'axios';
import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { auth, db } from './config.js';
import { doc, updateDoc, arrayUnion } from 'firebase/firestore';

function MovieInfo() {
    const [movie, setMovie] = useState(null);
    const { id } = useParams();
    const APIKEY = "ccad613cef0646f5709c9d3d341c4cb7";
    const [error, setError] = useState(null);
    const [videos, setVideos] = useState([]);
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        document.body.classList.add('movie-info-background');

        const fetchMovieInfo = async () => {
            try {
                console.log(`Fetching movie info for ID: ${id}`);
                const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${APIKEY}`);
                console.log("API Response:", response.data);
                if (!response) {
                    throw new Error("Movie info couldn't be found");
                }
                setMovie(response.data);

                const videoResponse = await axios.get(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${APIKEY}`);
                console.log("Video API Response", videoResponse.data);
                setVideos(videoResponse.data.results);

                if (response.data.backdrop_path) {
                    document.body.style.backgroundImage = `url(https://image.tmdb.org/t/p/original${response.data.backdrop_path})`;
                    document.body.style.backgroundSize = 'cover';
                    document.body.style.backgroundPosition = 'center';
                    document.body.style.backgroundRepeat = 'no-repeat';
                }
            } catch (error) {
                console.error("Error fetching movie info:", error);
                setError("There has been an error fetching the movie info.");
            }
        };

        fetchMovieInfo();

        return () => {
            document.body.classList.remove('movie-info-background');
            document.body.style.backgroundImage = '';
            document.body.style.backgroundSize = '';
            document.body.style.backgroundPosition = '';
            document.body.style.backgroundRepeat = '';
        };
    }, [id, APIKEY]);

    if (error) {
        return <div>{error}</div>;
    }

    if (!movie) {
        return <div>Loading...</div>;
    }

    const addToFavorites = async () => {
      

        try {
            const user = auth.currentUser;



            if (!user) {
                throw new Error("User not authenticated.");
            }

            const movieData = {
                id: movie.id,
                title: movie.title,
                image: `https://image.tmdb.org/t/p/w185${movie.poster_path}`,
                description: movie.overview
            };

            const userDoc = doc(db, 'users',user.uid);
               
            await updateDoc(userDoc, {
                favorites: arrayUnion(movieData)
            });

        }
       

        catch (error) {
            console.error("There has been an error:", error);
            setError("Failed to add movie to favorites");
        }

        handleFavoriteClick();
    };

    const handleFavoriteClick = () => {
        setIsFavorite(!isFavorite);
    };

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-4">
                    <img
                        src={`https://image.tmdb.org/t/p/w185${movie.poster_path}`}
                        alt={movie.title}
                        className="img-fluid rounded custom-size"
                    />
                </div>
                <div className="col-md-8">
                    <h1 className="mb-3 custom-header">{movie.title}</h1>
                    <p className="custom-header">Popularity: {movie.popularity}</p>
                    <button
                        className="btn btn-dark favorite-button"
                        onClick={addToFavorites}
                        style={{
                            backgroundColor: isFavorite ? 'black' : 'white',
                            color: isFavorite ? 'white' : 'black'
                        }}
                        disabled={isFavorite}
                    >
                       {isFavorite ? "Movie Added" : "💖 Add to Favorites"}
                    </button>
                    <p className="mt-5 custom-overview">{movie.overview}</p>
                    {videos.length > 0 ? (
                        <div className="mt-5 custom-video">
                            <h3>Watch Trailer</h3>
                            <iframe
                                width="900"
                                height="500"
                                src={`https://www.youtube.com/embed/${videos[0].key}`}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        </div>
                    ) : (
                        <div className="mt-4">
                            <p>No trailer available.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default MovieInfo;
