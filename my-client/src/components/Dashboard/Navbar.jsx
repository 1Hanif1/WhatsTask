import profilePic from "./images/dummyProfilePic.png";
import settings from "./images/settings.png";
import logout from "./images/logout.png";
import todaysTask from "./images/todaystask.png";
import caret from "./images/caret.svg";
export default function Navbar(props) {
  const { classes } = props;
  return (
    <nav className={classes.navbar}>
      <div className={classes.user}>
        <figure className={classes["user__image"]}>
          <img src={profilePic} alt="/" />
        </figure>
        <p className={classes["user__name"]}>Thisis Myname</p>
      </div>
      <div className={classes["navbar__buttons"]}>
        <div className={classes.buttons}>
          <a href="#">
            <img src={settings} alt="" /> Settings
          </a>
        </div>
        <div className={classes.buttons}>
          <a href="#">
            <img src={logout} alt="" /> Logout
          </a>
        </div>
        <div className={classes.todaytask}>
          <img src={todaysTask} alt="" /> Today's Task
          <span className={classes["numtask"]}>5</span>
        </div>
      </div>
      <div className={classes["navbar__taskcontainer"]}>
        <div className={classes.mytask}>
          <p className={classes["mytask__title"]}>
            My Task List <img src={caret} alt="" />
          </p>
          <div className={classes["mytask__list"]}>
            <p className={classes.list}>List 1</p>
            <p className={classes.list}>List 2</p>
            <div className={classes.buttonwrapper}>
              <button className={classes.addList}>Add New List+</button>
            </div>
          </div>
        </div>
        <div className={classes.workspace}>
          <div className={classes["workspace__title"]}>
            Workspace 1 <img src={caret} alt="" />
          </div>
          <div className={classes["workspace__list"]}>
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
  );
}
