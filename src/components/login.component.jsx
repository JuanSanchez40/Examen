import React, { useRef, useState } from "react";

import { withRouter } from '../common/with-router';

import { Snackbar } from "@mui/material";

function Login(props) {
  const email = useRef();
  const password = useRef();
  const [loading, setLoading] = useState(false);
  const localEmail = localStorage.getItem("email");
  const localPassword = localStorage.getItem("password");
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [messageSnackbar, setMessageSnackbar] = useState(false);

  const handleCloseSnackbar = () => {
    setShowSnackbar(false);
 };

  const handleSignIn = () => {
    console.log(email.current.value.length);
    if(email.current.value.length === 0 || password.current.value.length === 0){
      setShowSnackbar(true);
      setMessageSnackbar('Los campos no pueden estar vacios, ingresa el email y contraseña correcta.');
    }else{

      if(email.current.value === localEmail){
        if(password.current.value === localPassword){
          localStorage.setItem("signUp", email.current.value);
          localStorage.setItem("loginOn", true);
          props.router.navigate("/home");
          setLoading(true);
          window.location.reload();
        }else{
          setShowSnackbar(true);
          setMessageSnackbar('La contraseña es incorrecta.');
        }
        }else{
          setShowSnackbar(true);
          setMessageSnackbar('Email no encontrado.');
        }
    }
  };
  
    return (
      <div className="col-md-12">
        <div className="card card-container">
          <img
            src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
            alt="profile-img"
            className="profile-img-card"
          />

          
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                className="form-control"
                name="email"
                ref={email}
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className="form-control"
                name="password"
                ref={password}
              />
            </div>

            <div className="form-group">
              <button
                className="btn btn-primary btn-block"
                onClick={handleSignIn}
                disabled={loading}
              >
                {loading && (
                  <span className="spinner-border spinner-border-sm"></span>
                )}
                <span>Login</span>
              </button>
            </div>
        </div>
        <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center'
        }}
        style={{ marginBottom: '14px' }}
        open={showSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message={messageSnackbar}
        />
      </div>
    );
  
}

export default withRouter(Login);