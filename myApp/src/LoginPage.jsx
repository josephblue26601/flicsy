import React, { useState, useEffect } from 'react';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { auth,db } from './config.js';
import {useNavigate} from 'react-router-dom';
import {doc,getDoc,setDoc} from 'firebase/firestore';

function LoginPage(){

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();

useEffect(()=>{

document.body.classList.add("LoginPage-background");



return () =>{
    document.body.classList.remove("LoginPage-background");


};


},[]);


const handlePassword = (e) => {
    setPassword(e.target.value);
  }

  const handleEmail = (e) => {
    setEmail(e.target.value);
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log("User Logged in:", user);

       
      const refDoc =doc(db,'users',user.uid);

      const docSnap =  await getDoc(refDoc);

      if(!docSnap.exists()){
       console.log("Do not have a documentCreating one...");
       await setDoc(doc(db,'users',user.uid),{

        email:user.email,
        favorites:[]


       });
        


     
    }
    navigate('/Profile'); 
  }
  catch (error) {
    setError(error.message);
  }

}
  return (
    <>
      <form className="Loginform-container">
        <div className="Login-container">
          <h3 style={{ color: "white" }} className="mb-5">Login</h3>
          <label htmlFor="Email" style={{ color: "white" }}>Email*</label>
          <input
            type="email"
            value={email}
            className="Login-input"
            name="Email"
            placeholder="Email"
            onChange={handleEmail}
          required/>

          <label htmlFor="password" className="mt-4" style={{ color: "white" }}>Password*</label>
          <input
            type="password"
            value={password}
            name="password"
            className="Login-input"
            placeholder="Password"
            onChange={handlePassword}
          required/>

          <button className="btn btn-danger mt-5 login-button" onClick={handleLogin}>Login</button>
        </div>

        {error && <div className="error">{error}</div>}
      </form>
    </>
  );






}

export default LoginPage;