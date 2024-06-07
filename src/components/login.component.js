import React, { useRef,useEffect, useState } from "react";

import { withRouter } from '../common/with-router';

const required = value => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        Este espacio no puede ir vacio!
      </div>
    );
  }
};

function Login(props) {
  const email = useRef();
  const password = useRef();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const localEmail = localStorage.getItem("email");
  const localPassword = localStorage.getItem("password");

  const handleSignIn = () => {
    if (
      email.current.value === localEmail &&
      password.current.value === localPassword
    ) {
      localStorage.setItem("signUp", email.current.value);
      localStorage.setItem("loginOn", true);
      props.router.navigate("/home");
      window.location.reload();
    } else {
      alert("Please Enter valid Credential");
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
                validations={[required]}
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className="form-control"
                name="password"
                ref={password}
                validations={[required]}
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

            {message && (
              <div className="form-group">
                <div className="alert alert-danger" role="alert">
                  {message}
                </div>
              </div>
            )}
           
         
        </div>
      </div>
    );
  
}

export default withRouter(Login);