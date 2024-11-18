// src/App.jsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './firebase';

import Home from './views/home/Home';
import Login from './views/login/login';
import SignUp from './views/singup/singup';
import ProtectedRoute from './ProtectedRoute';

function App() {
  const [user, loading, error] = useAuthState(auth);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
      <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
      <Route path="/signup" element={!user ? <SignUp /> : <Navigate to="/" />} />
      {/* Default Route */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;


