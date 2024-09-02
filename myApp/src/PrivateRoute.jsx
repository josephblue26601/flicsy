import React from 'react';
import { Navigate } from 'react-router-dom';
import { getAuth } from "firebase/auth";

function PrivateRoute({ children }) {
    const auth = getAuth();
    const user = auth.currentUser;

    return user ? children : <Navigate to="/Login" />;
}

export default PrivateRoute;
