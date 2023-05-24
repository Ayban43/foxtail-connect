import React from 'react';
import "./LoadingSpinner.css"
import logo from "../../assets/logo.png"

const LoadingSpinner = () => (

  <div className="spinner">
    <img src={logo} alt="Loading..." />
  </div>

);

export default LoadingSpinner;