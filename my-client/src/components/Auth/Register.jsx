import classes from "./style.module.css";
import { Link } from "react-router-dom";
import classNames from "classnames";
export default function Register() {
  return (
    <>
      <div method="post" className={classes.form}>
        <h1>Register</h1>
        <div className={classNames(classes.form__input)}>
          <input name="name" id="registerName" placeholder="Name" required />
        </div>
        <div className={classNames(classes.form__input)}>
          <input
            name="phoneNumber"
            id="registerPhoneNumber"
            type="number"
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
            id="photo"
          />
        </div>
        <div className={classes.actions}>
          <button>Register</button>
          Already have an account? <Link to={`?mode=login`}>Login</Link>
        </div>
      </div>
    </>
  );
}
