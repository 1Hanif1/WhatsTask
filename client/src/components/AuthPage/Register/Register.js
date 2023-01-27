import React, { useState } from "react";
import styles from "../AuthPage.module.css";

export default function Register() {
  const [error, setError] = useState("");

  const name = document.getElementById("registerName");
  const phoneNumber = document.getElementById("registerPhoneNumber");
  const email = document.getElementById("registerEmail");
  const password = document.getElementById("registerPassword");
  const confirmPassword = document.getElementById("registerConfirmPassword");

  const formHandler = function (e) {
    e.preventDefault();
    const dataArray = [name, phoneNumber, email, password, confirmPassword];

    // Check if all inputs are filled or not
    if (dataArray.some((el) => !el.value.trim())) {
      setError("Please fill all inputs");
      return;
    }
    // Check if password is strong or not (use RegEx)

    // Check if password and confirm password match

    // Call API and check if Email and Phone number already exists or not

    // Check if uploaded image is below 10mb

    // Store data in database
  };

  return (
    <form onSubmit={formHandler} className={styles.form}>
      <div className={styles.form__input}>
        <input id="registerName" placeholder="Name" />
      </div>
      <div className={styles.form__input}>
        <input id="registerPhoneNumber" placeholder="Phone number" />
      </div>
      <div className={styles.form__input}>
        <input id="registerEmail" placeholder="Email" />
      </div>
      <div className={styles.form__input}>
        <input id="registerPassword" placeholder="Password" type="password" />
      </div>
      <div className={styles.form__input}>
        <input
          id="registerConfirmPassword"
          placeholder="Confirm Password"
          type="password"
        />
      </div>
      <div className={styles.form__input}>
        <button>Upload Profile Picture</button>
      </div>
      <div className={styles.form__error}> {error}</div>
      <div className={styles.form__button}>
        <button>Register</button>
      </div>
    </form>
  );
}
