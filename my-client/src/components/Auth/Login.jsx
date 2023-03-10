import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import classes from "./style.module.css";
import classNames from "classnames";
import { API_LOGIN } from "./config";

export default function Login() {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  function setErrorHandler(input) {
    setError(input);
    setTimeout(() => setError(""), 3000);
  }

  async function loginHandler() {
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

    const userData = {
      email,
      password,
    };

    // Call Database
    const res = await fetch(API_LOGIN, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!res.ok) {
      const errorData = await res.json();
      return setErrorHandler(errorData.message);
    }
    // Redirect to Login
    const { token, data } = await res.json();
    if (!token) {
      return setErrorHandler(
        "There was some internal error. Please try again later"
      );
    }
    console.log(data);
    localStorage.setItem("jwt", token);
    localStorage.setItem("username", data.user.name);
    navigate("/dashboard");
    // console.log(navigate);
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
      <div className={classes.message}>
        <p style={{ color: "red" }}>{error}</p>
      </div>
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
