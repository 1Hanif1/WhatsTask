import { NavLink } from "react-router-dom";
import classes from "./Header.module.css";
import header from "../../assets/header.png";
import "../../main.css";
import classNames from "classnames";

function Header() {
  return (
    <>
      <header className={classNames(classes.header, "flex-jcc-aic")}>
        <figure className={classes.header__left}>
          <img src={header} alt="/" className={classes.header__left_img} />
        </figure>
        <section
          className={classNames(classes.header__right, "flex-column-jcc-aifs")}
        >
          <h1 className={classes.header__title}>WhatsTask</h1>
          <p className={classes.header__summary}>
            Group Task Manager Integrated With WhatsApp
          </p>
          <p className={classes.header__desc}>
            Create, assign tasks, set due dates and receive reminders all on
            WhatsApp, never miss a deadline again with this simple and
            convenient solution for team task management. Try it now for a more
            productive team.
          </p>
          <div className={classNames(classes.header__links, "flex-jcc-ais")}>
            <NavLink
              to="/auth?mode=login"
              className={classNames(classes.header__link, "link--one")}
            >
              Login
            </NavLink>
            <NavLink
              to="/auth?mode=register"
              className={classNames(classes.header__link, "link--two")}
            >
              Register
            </NavLink>
          </div>
        </section>
      </header>
    </>
  );
}

export default Header;
