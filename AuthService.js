import React from "react";

const AuthService = () => {
  auth = () => {
    return localStorage.getItem("auth");
  };
};

export default AuthService;
