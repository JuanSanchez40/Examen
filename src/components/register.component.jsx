import React, { useRef, useState } from "react";

import { isEmail } from "validator";

import { Snackbar } from "@mui/material";

function Register () {

  const username = useRef();
  const edad = useRef();
  const email = useRef();
  const password = useRef();
  const [successful, setSuccesful] = useState(false);
  const [message, setMessage] = useState(false);
  const [messageSucces, setMessageSucces] = useState('');
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [messageSnackbar, setMessageSnackbar] = useState(false);

  

  const handleOnChangeEmail = (value) => {
    if (!isEmail(value)) {
      setShowSnackbar(true);
      setMessageSnackbar('Este no es un email valido.');
    }else{
      setShowSnackbar(true);
      setMessageSnackbar('Email valido.');
    }
  };
  
  const handleOnChangeAge = value => {
    const values = value.replace(/\D/g, "");
    localStorage.setItem("edad", values);
  };

  const handleCloseSnackbar = () => {
     setShowSnackbar(false);
  };

  const handleClick = () => {
    
    if (username.current.value && email.current.value && password.current.value && edad.current.value) {
      let usser = username.current.value;
      console.log(usser);
      if (usser.length < 3 || usser.length > 20) {
        setShowSnackbar(true);
        setMessageSnackbar('El username debe tener entre 3 a 20 caracteres');
      }else{

        let emails = email.current.value;
        if (!isEmail(emails)) {
          setShowSnackbar(true);
          setMessageSnackbar('Este no es un email valido.');          
        }else{
          setShowSnackbar(true);
          let passwords = password.current.value;
          if (passwords.length < 6 || passwords.length > 40) {
            setShowSnackbar(true);
            setMessageSnackbar('El password debe tener entre 6 a 40 caracteres');
          }else{
            if(edad.current.value >= 12){
              localStorage.setItem("username", username.current.value);
              localStorage.setItem("edad", edad.current.value);
              localStorage.setItem("email", email.current.value);
              localStorage.setItem("password", password.current.value);
              localStorage.setItem("signUp", email.current.value);
              localStorage.setItem("loginOn", false);
              setSuccesful(true);
              setMessage(true);
              setMessageSucces('User registered successfully!!')
              setShowSnackbar(false);
              }else{
                setShowSnackbar(true);
                setMessageSnackbar('Para registarse debes tener de 12 años en adelante.');
              }
          }
        }
      }
    }else{
      setShowSnackbar(true);
      setMessageSnackbar('Todos los campos son requeridos, no pueden estar vacios.');
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

         
            {!successful && (
              <div>
                <div className="form-group">
                  <label htmlFor="username">Username</label>
                  <input
                    type="text"
                    className="form-control"
                    name="username"
                    ref={username}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="text"
                    className="form-control"
                    name="email"
                    ref={email}
                    onChange={e=>handleOnChangeEmail(e.target.value)}
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
                  <label htmlFor="edad">Age</label>
                  <input
                    type="number"
                     
                    className="form-control arrows"
                    name="edad"
                    ref={edad}
                    disabled={false}
                    error={false}
                  />
                </div>

                <div className="form-group">
                  <button 
                    className="btn btn-primary btn-block" 
                    onClick={handleClick}
                    >Sign Up</button>
                </div>
                
              </div>
            )}

            {message && (
              <div className="form-group">
                <div
                  className={
                    successful
                      ? "alert alert-success"
                      : "alert alert-danger"
                  }
                  role="alert"
                >
                  {messageSucces}
                </div>
              </div>
            )}
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
export default Register;
