import profilePic from "./images/dummyProfilePic.png";
import settings from "./images/settings.png";
import logout from "./images/logout.png";
import todaysTask from "./images/todaystask.png";
import caret from "./images/caret.svg";
import MyTaskListForm from "./Forms/MyTaskListForm";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { AppContext } from "../../AppContext";
export default function Navbar(props) {
  const { classes, setModalState, setModalForm, renderTodoList } = props;
  const navigate = useNavigate();
  const { data, setData } = useContext(AppContext);

  const toggleDropDown = function (e) {
    if (e.target.nodeName == "IMG") return;
    const dropDown = e.target.nextElementSibling;
    const caret = e.target.querySelector("img");
    caret.classList.toggle(classes.rotate);
    dropDown.classList.toggle(classes.hide);
  };

  const openModal = function () {
    // console.log("Hello");
    setModalForm(<MyTaskListForm classes={classes} />);
    setModalState(true);
  };

  const logoutHandler = function () {
    localStorage.removeItem("jwt");
    localStorage.removeItem("username");
    navigate("/");
  };

  const loadListData = function (e) {
    const id = e.target.dataset.id;
    data.personalTaskList.forEach((list) => {
      if (list._id == id) {
        renderTodoList(list);
      }
    });
  };

  return (
    <nav className={classes.navbar}>
      <div className={classes.user}>
        <figure className={classes["user__image"]}>
          <img src={profilePic} alt="/" />
        </figure>
        <p className={classes["user__name"]}>
          {localStorage.getItem("username")}
        </p>
      </div>
      <div className={classes["navbar__buttons"]}>
        <div className={classes.buttons}>
          <div>
            <img src={settings} alt="" /> Settings
          </div>
        </div>
        <div className={classes.buttons}>
          <div onClick={logoutHandler}>
            <img src={logout} alt="" /> Logout
          </div>
        </div>
        <div className={classes.todaytask}>
          <img src={todaysTask} alt="" /> Today's Task
          <span className={classes["numtask"]}>5</span>
        </div>
      </div>
      <div className={classes["navbar__taskcontainer"]}>
        <div className={classes.mytask}>
          <p className={classes["mytask__title"]} onClick={toggleDropDown}>
            My Task List <img src={caret} alt="" />
          </p>
          <div className={classes["mytask__list"]}>
            {/* <p className={classes.list}>List 1</p> */}
            {data.personalTaskList?.map((list) => {
              return (
                <p
                  className={classes.list}
                  key={list._id}
                  data-id={list._id}
                  onClick={loadListData}
                >
                  {list.name}
                </p>
              );
            })}
            <div className={classes.buttonwrapper}>
              <button className={classes.addList} onClick={openModal}>
                Add New List+
              </button>
            </div>
          </div>
        </div>
        <div className={classes.workspace}>
          <div className={classes["workspace__title"]} onClick={toggleDropDown}>
            Workspace 1 <img src={caret} alt="" />
          </div>
          <div className={classes["workspace__list"]}>
            {/* <p className={classes.list}>List 1</p> */}

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
