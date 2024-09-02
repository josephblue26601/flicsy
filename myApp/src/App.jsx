
import Home from './Home';
import CustomNavBar from './CustomNavBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import MovieDetails from './MovieDetails';
import { Routes, Route } from 'react-router-dom';
import MovieInfo from './MovieInfo.jsx';
import SearchBar from './SearchBar.jsx';
import '@fortawesome/fontawesome-free/css/all.min.css';
import SignUpPage from './SignUpPage.jsx';
import LoginPage from './LoginPage';
import PrivateRoute from './PrivateRoute.jsx';
import Profile from './Profile.jsx'
import React,{useEffect} from 'react'
function App() {
    

    return (
        <>
            <CustomNavBar />
           
            <Routes>
            <Route path="/" element={<Home />} />
                <Route path="/moviedetails/:id" element={<MovieDetails />} />
                <Route path ="movieinfo/:id" element ={<MovieInfo />}/>
                <Route path ="/SignUp" element ={<SignUpPage />} />
                <Route path ="/Login" element ={<LoginPage/>}/>
                <Route  path ="/Profile" element ={<PrivateRoute>
                    <Profile />
                </PrivateRoute>}/>
            </Routes>
        </>
    );
}

export default App;
