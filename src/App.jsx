import React, { useEffect } from "react";
import HomePage from "./components/pages/Home/HomePage";
import LoginPage from "./components/pages/Login/LoginPage";
import { Route, Routes, useNavigate, useRoutes } from "react-router-dom";
import PlayerPage from "./components/pages/Player/PlayerPage";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const App = () => {

  const navigate = useNavigate()

  useEffect(() => {
   onAuthStateChanged(auth, async(user) => {
    if (user) {
      console.log("logeado");
      navigate('/')
      
    } else {
      console.log("No logeado");
      navigate('/login')
      
    }
   })
  }, [])
  


  return (
    <div>
      <ToastContainer theme="dark" />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/player/:id" element={<PlayerPage />} />
      </Routes>
    </div>
  )
};
