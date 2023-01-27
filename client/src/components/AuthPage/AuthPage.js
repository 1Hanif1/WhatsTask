import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Login from "./Login/Login";
import Register from "./Register/Register";
import styles from "./AuthPage.module.css";

export default function AuthPage() {
  const location = useLocation();
  const path = location.pathname;

  const [data, setData] = useState({
    text: "",
    redirectText: "",
    redirectLink: "",
  });

  useEffect(() => {
    if (path === "/login") {
      setData({
        text: "Login",
        redirectText: "Don't have an account?",
        redirectLink: "/register",
      });
    } else if (path === "/register") {
      setData({
        text: "Register",
        redirectText: "Already have an account?",
        redirectLink: "/login",
      });
    }
  }, [location]);

  return (
    <>
      <main className={styles.main}>
        <section className={styles.left}></section>
        <section className={styles.right}>
          <h1>{data.text}</h1>
          <Router>
            <Switch>
              <Route path={"/login"} component={Login} />
              <Route path={"/register"} component={Register} />
            </Switch>
          </Router>
          <p>
            {data.redirectText + " "}
            <a href={data.redirectLink}>{data.redirectLink.slice(1)}</a>
          </p>
        </section>
      </main>
    </>
  );
}
