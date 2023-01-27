import React from "react";
import LandingPage from "./components/LandingPage/LandingPage";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AuthPage from "./components/AuthPage/AuthPage";

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path={["/login", "/register"]} component={AuthPage} />
        <Route path={"/"} component={LandingPage} />
      </Switch>
    </Router>
  );
}
