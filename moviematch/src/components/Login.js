import React from 'react';
import '../styles/login.css'

function Login() {


    function signIn() {
  
      fetch("http://127.0.0.1:4000/login",
        {
          method: "GET",
          headers: { 'Content-Type': 'application/json' },
          credentials: "include"
        })
        .then((response) => response.json())
        .then((response) => {
          console.log(response);
          window.location.replace(response["url"]);
        }).catch((error) => {
          console.log(error);
        })
    }
  
  
    return (
      <div className="navbar-container">
        <div className='login-button' role='button' onClick={() => signIn()}>
            Login
        </div>
      </div>
    );
  }
  
  export default Login;