import React, { useState, useEffect, useRef } from "react";
import "./Navbar.css";
import logo from "../../assets/logo.png";
import SearchIcon from "../../assets/search_icon.svg";
import BellIcon from "../../assets/bell_icon.svg";
import ProfileIcon from "../../assets/profile_img.png";
import CaretIcon from "../../assets/caret_icon.svg";
import { logOut, getCurrentUser, getUsername } from "../../firebase";

export const Navbar = () => {
  const [username, setUsername] = useState("");
  
  const navbarRef = useRef()

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 80) {
        navbarRef.current.classList.add("navbar-black");
      } else {
        navbarRef.current.classList.remove("navbar-black");
      }
    };

    window.addEventListener('scroll', handleScroll);

  
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []); 

  useEffect(() => {
    const fetchUsername = async () => {
      try {
          const user = await getCurrentUser();
          if (user) {
              const name = await getUsername(user.uid);
              setUsername(name);
          }
      } catch (error) {
          console.log(error);
      }
  };

    fetchUsername();
  }, []);

  return (
    <div ref={navbarRef} className="navbar">
      <div className="navbar-left">
        <a href="/">
          <img src={logo} alt="logo" />
        </a>
      </div>
      <div className="navbar-right">
        <div className="navbar-profile">
          <img className="profile" src={ProfileIcon} alt="Icono Perfil" />
          <p>{username}</p>
          <img src={CaretIcon} alt="Caret Icon" />
          <div className="dropdown">
            <p onClick={logOut}>Sign Out of Netflix</p>
          </div>
        </div>
      </div>
    </div>
  );
};
