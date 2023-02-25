import { NavLink } from "react-router-dom";
import { useState } from "react";
import classes from "./style.module.css";
import classNames from "classnames";
import { API_LOGIN } from "./config";
export default function Login() {
  const [error, setError] = useState("");

  function setErrorHandler(input) {
    setError(input);
    setTimeout(() => setError(""), 3000);
  }

  function loginHandler() {
    // Get Data
    const email = document.querySelector("#loginEmail").value;
    const password = document.querySelector("#loginPassword").value;
    const inputData = [email, password];
    // Validate Data
    if (inputData.some((input) => input === "")) {
      return setErrorHandler("Please provide all details");
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      return setErrorHandler("Please enter a valid email");

    // Call Database
    // Redirect to Login
  }
  return (
    <div className={classes.form}>
      <h1>Log In</h1>
      <div className={classNames(classes.form__input)}>
        <input name="email" id="loginEmail" placeholder="Email" required />
      </div>
      <div className={classNames(classes.form__input)}>
        <input
          name="password"
          id="loginPassword"
          placeholder="Password"
          type="password"
          required
        />
      </div>
      <div className={classes.error}>{error}</div>
      <div className={classes.actions}>
        <button onClick={loginHandler}>Login</button>
        <p>
          Don't have an account?{" "}
          <NavLink to={`?mode=register`}>Register Now</NavLink>
        </p>
      </div>
    </div>
  );
}