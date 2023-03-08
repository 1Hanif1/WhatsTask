import "../index.css";
import { useNavigate } from "react-router-dom";
import classes from "./DashboardComponent.module.css";
import dummyProfile from "../assets/dummyProfilePic.png";
import settings from "../assets/settings.png";
import logoutImg from "../assets/logout.png";
import todaystask from "../assets/todaystask.png";
import caret from "../assets/caret.svg";

function UserBar(props) {
  const navigate = useNavigate();
  const logout = () => {
    const jwtCookie = document.cookie
      .split("; ")
      .find((cookie) => cookie.startsWith("jwt="));
    if (jwtCookie) {
      document.cookie = "jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      navigate("/");
    }
  };
  return (
    <>
      <nav className={classes.navbar}>
        <div className={classes.user}>
          <figure className={classes.user__image}>
            <img src={dummyProfile} alt="/" />
          </figure>
          <p className={classes.user__name}>{props.user.name}</p>
        </div>
        <div className={classes.navbar__buttons}>
          <div className={classes.buttons}>
            <a href="#">
              <img src={settings} alt="" /> Settings
            </a>
          </div>
          <div className={classes.buttons} onClick={logout}>
            <a href="#">
              <img src={logoutImg} alt="" /> Logout
            </a>
          </div>
          <div className={classes.todaytask}>
            <img src={todaystask} alt="" /> Today's Task
            <span className={classes.numtask}>{props.taskDetails.length}</span>
          </div>
        </div>
        <div className={classes.navbar__taskcontainer}>
          <div className={classes.mytask}>
            <p className={classes.mytask__title}>
              My Task List <img src={caret} alt="" />
            </p>
            <div className={classes.mytask__list}>
              <p className={classes.list}>List 1</p>
              <p className={classes.list}>List 2</p>
              <div className={classes.buttonwrapper}>
                <button className={classes.addList}>Add New List+</button>
              </div>
            </div>
          </div>
          <div className={classes.workspace}>
            <div className={classes.workspace__title}>
              Workspace 1 <img src={caret} alt="" />
            </div>
            <div className={classes.workspace__list}>
              <p className={classes.list}>List 1</p>
              <div className={classes.buttonwrapper}>
                <button className={classes.addList}>Add New List+</button>
              </div>
            </div>
          </div>
        </div>
        <div className={classes["navbar__button--createworkspace"]}>
          Create a workspace+
        </div>
      </nav>
    </>
  );
}

export default UserBar;
