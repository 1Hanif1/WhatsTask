import { Link } from "react-router-dom";
import classes from "./style.module.css";
import classNames from "classnames";
export default function Login() {
  return (
    <div className={classes.form}>
      <h1>Log In</h1>
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
      <div className={classes.actions}>
        <button>Login</button>
        Don't have an account? <Link to={`?mode=register`}>Register Now</Link>
      </div>
    </div>
  );
}
