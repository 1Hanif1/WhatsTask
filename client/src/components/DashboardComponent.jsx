import "../index.css";
import SideBar from "./SideBar";
import { useState, useEffect } from "react";
import {
  Form,
  useActionData,
  useLoaderData,
  useNavigate,
  useSubmit,
  useNavigation,
  json,
  redirect,
} from "react-router-dom";
import classes from "./DashboardComponent.module.css";
import dummyProfile from "../assets/dummyProfilePic.png";
import settings from "../assets/settings.png";
import logout from "../assets/logout.png";
import todaystask from "../assets/todaystask.png";
import caret from "../assets/caret.svg";
import checkmark from "../assets/checkmark.svg";
import downloadFile from "../assets/downloadFile.svg";
import deleteFile from "../assets/deleteFile.svg";

function DashboardComponent() {
  const userData = useLoaderData();
  const user = userData.data.user;
  // const [tasks, setTasks] = useState([]);
  // const [newTask, setNewTask] = useState({
  //   name: "",
  //   deadline: "",
  //   subtasks: [],
  //   status: "incomplete",
  // });
  // const [newSubtask, setNewSubtask] = useState({
  //   name: "",
  //   deadline: "",
  //   status: "incomplete",
  // });
  const [selectedTask, setSelectedTask] = useState();
  const [selectedTaskId, setSelectedTaskId] = useState();

  // const handleSubmit = async (event) => {
  //   event.preventDefault();
  // };

  // const handleTaskNameChange = (event) => {
  //   setNewTask({ ...newTask, name: event.target.value });
  // };

  // const handleTaskDeadlineChange = (event) => {
  //   setNewTask({ ...newTask, deadline: event.target.value });
  // };

  // const handleSubtaskNameChange = (event) => {
  //   setNewSubtask({ ...newSubtask, name: event.target.value });
  // };

  const handleTaskClick = (task, id) => {
    setSelectedTask(task);
    setSelectedTaskId(id);
  };

  // const handleAddTask = (event) => {
  //   event.preventDefault();
  //   if (!newTask) return;
  //   const task = {
  //     name: newTask.name,
  //     subtasks: [],
  //     deadline: newTask.deadline,
  //     completed: newTask.completed,
  //   };
  //   setTasks([...tasks, task]);
  //   setNewTask("");
  //   console.log(task);
  // };

  // const handleAddSubtask = (event) => {
  //   event.preventDefault();
  //   setNewTask({ ...tasks, subtasks: [...tasks.subtasks, newSubtask] });
  //   setNewSubtask({ name: "", deadline: "", completed: false });
  // };

  const data = useActionData();
  const navigate = useNavigate();
  const navigation = useNavigation();

  const isSubmitting = navigation.state === "submitting";

  function cancelHandler() {
    navigate("..");
  }

  return (
    <>
      <main className={classes.main}>
        <nav className={classes.navbar}>
          <div className={classes.user}>
            <figure className={classes.user__image}>
              <img src={dummyProfile} alt="/" />
            </figure>
            <p className={classes.user__name}>{user.name}</p>
          </div>
          <div className={classes.navbar__buttons}>
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
              <img src={todaystask} alt="" /> Today's Task
              <span className={classes.numtask}>
                {userData.data.personalTaskList[0].tasks.length}
              </span>
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
        <section className={classes.dashboard}>
          <p className={classes.listname}>
            {userData.data.personalTaskList[0].name}
          </p>
          <div className={classes.member__container}>
            <p>
              Members: <span>A, B, C, D</span>
            </p>
            <button>Add Member+</button>
          </div>
          <div className={classes.todolist}>
            <div className={classes["todolist__active"]}>
              {userData.data.personalTaskList[0].tasks.map((task) => {
                if (task.status == "incomplete") {
                  return (
                    <>
                      <div key={task._id} className={classes.task}>
                        <div className={classes.checkmark}>
                          <img src={checkmark} alt="" />
                        </div>
                        <div
                          onClick={() => handleTaskClick(task.name, task._id)}
                        >
                          {" "}
                          {task.name}
                        </div>
                      </div>
                    </>
                  );
                }
              })}
            </div>
            <p className={classes.todolist__subtitle}>Completed Tasks</p>
            <div className={classes.todolist__completed}>
              {userData.data.personalTaskList[0].tasks.map((task) => {
                if (task.status == "complete") {
                  return (
                    <>
                      <div
                        key={task._id}
                        className={classes.task}
                        onClick={() => handleTaskClick(task.name, task._id)}
                      >
                        <div className={classes.checkmark}>
                          <img src={checkmark} alt="" />
                        </div>
                        <div> {task.name}</div>
                      </div>
                    </>
                  );
                }
              })}
            </div>
            <Form method="POST">
              <div className={classes.todolist__input}>
                <input type="text" placeholder="Add a new task" name="name" />
                <div className={classes["subtask__button"]}>
                  <button className={classes.button}>Add Task</button>
                </div>
              </div>
            </Form>
          </div>
          <SideBar
            userData={userData}
            selectedTask={selectedTask}
            selectedTaskId={selectedTaskId}
          ></SideBar>
        </section>
      </main>
    </>
  );
}
export default DashboardComponent;

export async function loader() {
  const jwtCookie = document.cookie
    .split("; ")
    .find((cookie) => cookie.startsWith("jwt="));
  const jwtToken = jwtCookie.split("=")[1];
  const res = await fetch("http://127.0.0.1:3000/api/user", {
    headers: { Authorization: `Bearer ${jwtToken}` },
    "Access-Control-Allow-Origin": "http://127.0.0.1:5173",
    "Access-Control-Allow-Methods": "DELETE, POST, GET, OPTIONS, PATCH",
    "Access-Control-Allow-Credentials": true,
    "Access-Control-Allow-Headers":
      "Content-Type, Authorization, X-Requested-With",
  });
  const resData = await res.json();
  return resData;
}

export async function action({ request }) {
  const method = request.method;
  const data = await request.formData();
  const jwtCookie = document.cookie
    .split("; ")
    .find((cookie) => cookie.startsWith("jwt="));
  const jwtToken = jwtCookie.split("=")[1];
  // const id = data.get("id");
  // console.log(data.get("name"));
  const taskData = {
    name: data.get("name"),
    deadline: data.get("deadline") === null ? "" : data.get("deadline"),
    subtasks: data.get("subtasks") === null ? [] : data.get("subtasks"),
    attachments:
      data.get("attachments") === null ? [] : data.get("attachments"),
    status: data.get("status") === null ? "incomplete" : data.get("status"),
  };

  const res = await fetch(
    "http://127.0.0.1:3000/api/user/task/list/63f4d1f360925418803d19ee",
    {
      method: method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtToken}`,
        "Access-Control-Allow-Origin": "http://127.0.0.1:5173",
        "Access-Control-Allow-Methods": "DELETE, POST, GET, OPTIONS",
        "Access-Control-Allow-Credentials": true,
        "Access-Control-Allow-Headers":
          "Content-Type, Authorization, X-Requested-With",
      },
      credentials: "include",
      body: JSON.stringify(taskData),
    }
  );

  if (res.status === 200 || res.status === 204) {
    return res;
  }
}
