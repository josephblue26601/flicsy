import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons'

function SearchBar() {
  const [input, setInput] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const APIKEY = "ccad613cef0646f5709c9d3d341c4cb7";

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleKey = async (e) => {
    if (e.key === 'Enter' && input.trim()) {
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/search/movie?query=${input}&api_key=${APIKEY}`);
        if (!response) {
          throw new Error("Could not fetch data");
        }
        console.log("Movie input", input);
        navigate('/moviedetails/' + encodeURIComponent(input));
      } catch (error) {
        console.error(error);
        setError("There has been an error fetching data");
      }
    }
  };

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <>
      
          <input 
        type="text" 
        value={input}  
        className="form-control form-control-md search-bar" 
        onChange={handleInputChange} 
        onKeyDown={handleKey} 
        placeholder="Find a Movie..."
        style={{ color: 'white' }}
      />
         <button className="search-button" onClick={() => handleKey({ key: 'Enter' })}><FontAwesomeIcon icon={faMagnifyingGlass} /></button>
    </>
  );
}

export default SearchBar;