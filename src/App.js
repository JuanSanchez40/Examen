import React, { useEffect, useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Login from "./components/login.component";
import Register from "./components/register.component";
import Home from "./components/home.component";
import Profile from "./components/profile.component";

function App() {
  const localSignUp = localStorage.getItem("signUp");
  const localLoginOn = localStorage.getItem("loginOn");
  const [showHome, setShowHome] = useState(false);
  
  const localUsername = localStorage.getItem("username");

  useEffect(() => {
    if (localSignUp) {
      setShowHome(true);
    }
  },[localSignUp]);

  const logout = () => {
    localStorage.removeItem("signUp");
    localStorage.clear();
    window.location.reload();
  };

  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-primary">
        {showHome && localLoginOn ? (
          <a class="navbar-brand" href="/home">
            <img
              src="/preview1.png"
              className="img-responsive"
              id="logo"
              alt=""
            />
          </a>
        ) : (
          <a class="navbar-brand" href="/login">
            <img
              src="/preview1.png"
              className="img-responsive"
              id="logo"
              alt=""
            />
          </a>
        )}

        <div className="navbar-nav mr-auto" style={{ marginLeft: "5%" }}>
          {showHome && localLoginOn ? (
            <li className="nav-item">
              <Link to={"/home"} className="nav-link">
                INICIO
              </Link>
            </li>
          ) : null}
        </div>

        {showHome ? (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/profile"} className="nav-link">
                {localUsername}
              </Link>
            </li>
            <li className="nav-item">
              <a href="/register" className="nav-link" onClick={logout}>
                SALIR
              </a>
            </li>
          </div>
        ) : null}

        {!showHome ? (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/login"} className="nav-link">
                LOGIN
              </Link>
            </li>

            <li className="nav-item">
              <Link to={"/register"} className="nav-link">
                REGISTRARSE
              </Link>
            </li>
          </div>
        ) : null}
      </nav>

      <div className="container mt-3">
        <Routes>
          {localLoginOn ? (
            <Route path="/" element={<Home />} />
          ) : (
            <Route path="/" element={<Register />} />
          )}
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
