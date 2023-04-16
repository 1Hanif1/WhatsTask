import profilePic from "./images/dummyProfilePic.png";
import settings from "./images/settings.png";
import logout from "./images/logout.png";
import todaysTask from "./images/todaystask.png";
import caret from "./images/caret.svg";
import DeleteFile from "./images/deleteFile.svg";
import MyTaskListForm from "./Forms/MyTaskListForm";
import CreateWorkspaceForm from "./Forms/CreateWorkspaceForm";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { AppContext } from "../../AppContext";
export default function Navbar(props) {
  const {
    classes,
    setModalState,
    setModalForm,
    renderTodoList,
    setType,
    setTodoListData,
    setListType,
  } = props;
  const navigate = useNavigate();
  const { data, setData } = useContext(AppContext);
  const [numTask, setNumTask] = useState(0);
  const [userData, setUserData] = useState(data);
  useEffect(() => {
    setUserData(data);
    let count = 0;
    data.personalTaskList?.forEach((list) => {
      count += list.tasks.length;
    });
    data.workspace?.forEach((wk) => {
      count += wk.tasks.length;
    });
    setNumTask(count);
  }, [data]);

  const toggleDropDown = function (e) {
    if (e.target.nodeName == "IMG") return;
    const dropDown = e.target.nextElementSibling;
    const caret = e.target.querySelector("img");
    caret.classList.toggle(classes.rotate);
    dropDown.classList.toggle(classes.hide);
  };

  const openModal = function () {
    setModalForm(<MyTaskListForm classes={classes} />);
    setModalState(true);
  };

  const openWorkspaceModal = function () {
    setModalForm(<CreateWorkspaceForm classes={classes} />);
    setModalState(true);
  };

  const logoutHandler = function () {
    localStorage.removeItem("jwt");
    localStorage.removeItem("username");
    navigate("/");
  };

  const loadListData = function (e) {
    setType("personal");
    const id = e.target.dataset.id;
    userData.personalTaskList.forEach((list) => {
      if (list._id == id) {
        renderTodoList(list);
      }
    });
  };

  const loadWorkspaceData = function (e) {
    setType("workspace");
    const id = e.target.dataset.id;
    userData.workspace.forEach((list) => {
      if (list._id == id) {
        renderTodoList(list);
      }
    });
  };

  const deleteList = async function (e) {
    const list = e.target.closest("p");
    const listId = list.dataset.id;

    // Call API to delete the List
    try {
      let res = await fetch(`http://127.0.0.1:3000/api/user/task/list`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ listId }),
      });

      if (!res.ok) return;

      // res = await fetch("http://127.0.0.1:3000/api/user", {
      //   method: "GET",
      //   headers: {
      //     Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      //   },
      // });

      // const resData = await res.json();
      // setData(resData);
      list.style.display = "none";
      setTodoListData({
        id: "",
        name: "No List Selected",
        tasks: [],
      });
      setListType(null);
    } catch (err) {
      console.log(err);
    }
    // Update context
  };

  const deleteWorkspace = async function (e) {
    const list = e.target.closest("div");
    const listId = list.dataset.id;

    // Call API to delete the List
    try {
      let res = await fetch(`http://127.0.0.1:3000/api/user/workspace`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: listId }),
      });

      if (!res.ok) return;

      // res = await fetch("http://127.0.0.1:3000/api/user", {
      //   method: "GET",
      //   headers: {
      //     Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      //   },
      // });

      // const resData = await res.json();
      // setData(resData);
      list.style.display = "none";
      setTodoListData({
        id: "",
        name: "No List Selected",
        tasks: [],
      });
      setListType(null);
    } catch (err) {
      console.log(err);
    }
    // Update context
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
          <div onClick={logoutHandler}>
            <img src={logout} alt="" /> Logout
          </div>
        </div>
        <div className={classes.todaytask}>
          <img src={todaysTask} alt="" /> All Task
          <span className={classes["numtask"]}>{numTask}</span>
        </div>
      </div>
      <div className={classes["navbar__taskcontainer"]}>
        <div className={classes.mytask}>
          <p className={classes["mytask__title"]} onClick={toggleDropDown}>
            My Task List <img src={caret} alt="" />
          </p>
          <div className={classes["mytask__list"]}>
            {/* <p className={classes.list}>List 1</p> */}
            {userData.personalTaskList?.map((list) => {
              return (
                <p
                  className={classes.list}
                  key={list._id}
                  data-id={list._id}
                  onClick={loadListData}
                >
                  {list.name}
                  <img
                    src={DeleteFile}
                    style={{ width: "1.25em" }}
                    onClick={deleteList}
                  />
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
          {/* <div className={classes["workspace__title"]}>Workspace 1</div> */}
          {userData.workspace?.map((ws) => {
            return (
              <div
                className={classes["workspace__title"]}
                key={ws._id}
                data-id={ws._id}
                onClick={loadWorkspaceData}
              >
                {ws.name}
                <img
                  src={DeleteFile}
                  style={{ width: "1.25em" }}
                  onClick={deleteWorkspace}
                />
              </div>
            );
          })}
        </div>
      </div>
      <div
        className={classes["navbar__button--createworkspace"]}
        onClick={openWorkspaceModal}
      >
        Create a workspace+
      </div>
    </nav>
  );
}
