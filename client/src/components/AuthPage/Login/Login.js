import React from "react";
import styles from "../AuthPage.module.css";

export default function Login() {
  const formHandler = function (e) {
    e.preventDefault();
  };

  return (
    <form onSubmit={formHandler} className={styles.form}>
      <div className={styles.form__input}>
        <input placeholder="Email" />
      </div>
      <div className={styles.form__input}>
        <input placeholder="Password" />
      </div>
      <div className={styles.form__error}>Error Goes Here</div>
      <div className={styles.form__button}>
        <button>Login</button>
      </div>
    </form>
  );
}
