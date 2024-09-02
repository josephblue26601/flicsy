import React from 'react';
import {Navbar,Nav} from 'react-bootstrap';
import {Link} from 'react-router-dom'
import SearchBar from './SearchBar.jsx';



function CustomNavBar(){

    return(<>
      <Navbar expand= "lg">
     <Navbar.Brand  as ={Link} to ="/">🍿Flicsy </Navbar.Brand>
      <Navbar.Toggle aria-controls ="basic-navbar-nav" />
      <Navbar.Collapse id ="basic-navbar-nav">
     
      <SearchBar className ="mr-auto" />
    <Nav className="ml-auto">
         <Nav.Link as={Link} to="/Profile">Profile</Nav.Link>
        <Nav.Link as ={Link} to = "/SignUp">Sign Up</Nav.Link>
        <Nav.Link as ={Link} to = "/Login">Login</Nav.Link>
    </Nav>
     
      </Navbar.Collapse>
           
    </Navbar>
    
    
    </>)
  



}

export default CustomNavBar