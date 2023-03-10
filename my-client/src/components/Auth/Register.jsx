import classes from "./style.module.css";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { API_SIGNUP } from "./config";
import classNames from "classnames";

export default function Register() {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();
  function setErrorHandler(input) {
    setError(input);
    setTimeout(() => setError(""), 3000);
  }
  function setSuccessHandler(input) {
    setSuccess(input);
    setTimeout(() => setSuccess(""), 3000);
  }

  async function registerHandler() {
    // Get Data
    const username = document.querySelector("#registerName").value;
    const phoneNumber = document.querySelector("#registerPhoneNumber").value;
    const email = document.querySelector("#registerEmail").value;
    const password = document.querySelector("#registerPassword").value;
    const confirmPassword = document.querySelector(
      "#registerConfirmPassword"
    ).value;
    const photo = document.querySelector("#registerPhoto");
    const inputData = [username, phoneNumber, email, password, confirmPassword];
    // Validate Data
    if (inputData.some((input) => input === "")) {
      return setErrorHandler("Please provide all details");
    }

    if (!/^\d{10}$/.test(phoneNumber)) {
      return setErrorHandler("Please enter a valid phone number");
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      return setErrorHandler("Please enter a valid email");

    if (password !== confirmPassword)
      return setErrorHandler("Passwords do not match");

    // Call Database
    const data = {
      name: username,
      phoneNumber: phoneNumber,
      email: email,
      password: password,
      passwordConfirm: confirmPassword,
    };

    const res = await fetch(API_SIGNUP, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    // console.log(res);
    if (!res.ok) {
      const errorData = await res.json();
      return setErrorHandler(errorData.message);
    }
    setSuccessHandler("Account created successfully");
  }

  return (
    <>
      <div className={classes.form}>
        <h1>Register</h1>
        <div className={classNames(classes.form__input)}>
          <input name="name" id="registerName" placeholder="Name" required />
        </div>
        <div className={classNames(classes.form__input)}>
          <input
            name="phoneNumber"
            id="registerPhoneNumber"
            type="text"
            placeholder="+91"
            required
          />
        </div>
        <div className={classNames(classes.form__input)}>
          <input name="email" id="registerEmail" placeholder="Email" required />
        </div>
        <div className={classNames(classes.form__input)}>
          <input
            name="password"
            id="registerPassword"
            placeholder="Password"
            type="password"
            required
          />
        </div>
        <div className={classNames(classes.form__input)}>
          <input
            name="passwordConfirm"
            id="registerConfirmPassword"
            placeholder="Confirm Password"
            type="password"
            required
          />
        </div>
        <div className={classNames(classes.form__input)}>
          <input
            // className={classes.upload__btn}
            name="userPhoto"
            type="file"
            id="registerPhoto"
          />
        </div>
        <div className={classes.message}>
          <p style={{ color: "red" }}>{error}</p>
          <p style={{ color: "green" }}>{success}</p>
        </div>
        <div className={classes.actions}>
          <button onClick={registerHandler}>Register</button>
          <p>
            Already have an account? <NavLink to={`?mode=login`}>Login</NavLink>
          </p>
        </div>
      </div>
    </>
  );
}
