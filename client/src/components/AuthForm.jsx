import {
  Form,
  Link,
  useSearchParams,
  useActionData,
  useNavigation,
} from "react-router-dom";
import { useEffect } from "react";
import classNames from "classnames";
import classes from "./AuthForm.module.css";

function AuthForm() {
  const data = useActionData();
  const navigation = useNavigation();

  const [searchParams] = useSearchParams();
  const isLogin = searchParams.get("mode") === "login";
  const isSignup = searchParams.get("mode") === "signup";
  const isSubmitting = navigation.state === "submitting";

  if (isLogin) {
    return (
      <>
        <main className={classes.main}>
          <section className={classes.left}></section>
          <section className={classes.right}>
            <Form method="post" className={classes.form}>
              <h1>{isLogin ? "Log in" : "Create a new user"}</h1>
              {data && data.errors && (
                <ul>
                  {Object.values(data.errors).map((err) => (
                    <li key={err}>{err}</li>
                  ))}
                </ul>
              )}
              {data && data.message && <p>{data.message}</p>}
              <div className={classNames(classes.form__input)}>
                <input
                  name="email"
                  id="registerEmail"
                  placeholder="Email"
                  required
                />
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
                <Link to={`?mode=${isLogin ? "signup" : "login"}`}>
                  {isLogin ? "Create new user" : "Login"}
                </Link>
                OR
                <button disabled={isSubmitting}>
                  {isSubmitting ? "Submitting..." : "Submit"}
                </button>
              </div>
            </Form>
          </section>
        </main>
      </>
    );
  }

  if (isSignup) {
    return (
      <>
        <main className={classes.main}>
          <section className={classes.left}></section>
          <section className={classes.right}>
            <Form method="post" className={classes.form}>
              <h1>{isLogin ? "Log in" : "Create a new user"}</h1>
              {data && data.errors && (
                <ul>
                  {Object.values(data.errors).map((err) => (
                    <li key={err}>{err}</li>
                  ))}
                </ul>
              )}
              {data && data.message && <p>{data.message}</p>}
              <div className={classNames(classes.form__input)}>
                <input
                  name="name"
                  id="registerName"
                  placeholder="Name"
                  required
                />
              </div>
              <div className={classNames(classes.form__input)}>
                <input
                  name="phoneNumber"
                  id="registerPhoneNumber"
                  placeholder="+91"
                  required
                />
              </div>
              <div className={classNames(classes.form__input)}>
                <input
                  name="email"
                  id="registerEmail"
                  placeholder="Email"
                  required
                />
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
                <input name="userPhoto" type="file" id="photo" />
              </div>
              <div className={classes.actions}>
                <Link to={`?mode=${isLogin ? "signup" : "login"}`}>
                  {isLogin ? "Create new user" : "Login"}
                </Link>
                OR
                <button disabled={isSubmitting}>
                  {isSubmitting ? "Submitting..." : "Submit"}
                </button>
              </div>
            </Form>
          </section>
        </main>
      </>
    );
  }
}

export default AuthForm;
