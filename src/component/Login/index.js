import React, { useState } from "react";
import "./index.css";
import loginlogo from "./images/loginlogo.png";
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('')
  const handleLogin = (event) => {
    event.preventDefault();
    console.log('Email:', email);
    console.log('Password:', password);

    const loginData = {
      body: {
        "username": email,
        "password": password
      }
    };

    fetch('https://01036p2kcg.execute-api.ap-south-1.amazonaws.com/dev/login', {
      method: 'POST',
      headers: {
        // 'Content-Type': 'application/json',
        // Include other headers if necessary
      },
      body: JSON.stringify(loginData)
    })
      .then(response => {
        if (response.status >= 500) {
          setErrorMsg('Unable to assist you right now. Please contact admin...')
        }
        if (response.status >= 400) {
          setErrorMsg('Incorrect username or password')
        }
        if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
      })
      .then(data => {
        if (data.statusCode >= 500) {
          setErrorMsg('Unable to assist you right now. Please contact admin...')
          return
        }
        if (data.statusCode >= 400) {
          setErrorMsg('Incorrect username or password')
          return
        }
        // Handle the response data
        console.log('Success:', JSON.parse(data.body).IdToken);
        localStorage.setItem("token", JSON.parse(data.body).IdToken)
        navigate('/');
      })
      .catch(error => {
        // Handle any errors that occurred during the fetch
        console.error('Error:', error);
      });
  }


  return (
    <div className="login-page">
      <div className="login-page-logo">
        <img src={loginlogo} alt="Login Logo" />
      </div>
      <div className="login-form">
        <form onSubmit={handleLogin}>
          <div style={{ textAlign: "center", fontSize: "23px", fontWeight: "600", color: "#000000e6" }}>Login</div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div style={{ textAlign: "center" }}>
            <a href="#" class="forgot-password">Forgot Password?</a>

          </div>
          <div className="form-group">
            <button type="submit">Login</button>
          </div>
        </form>
        <div className="signup-option">
          Don't have an account? <a href="#">Sign Up</a>
        </div>
        <p style={{ textAlign: 'center', color: 'red', }}>{errorMsg}</p>
        {/* <div style={{ textAlign: "center", fontSize: "20px", color: "#000000b0", paddingTop: "10px" }}>or</div>
        <div className="login-options d-flex flex-column gap-2">
          <button className="btn btn-primary facebook-login d-flex align-items-center">
            <i className="bi bi-facebook me-2"></i>
            Login with Facebook
          </button>
          <button className="btn btn-danger google-login d-flex align-items-center">
            <i className="bi bi-google me-2"></i>
            Login with Google
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default Login;
