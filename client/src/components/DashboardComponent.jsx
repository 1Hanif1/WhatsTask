import "../index.css";
import SideBar from "./SideBar";
import UserBar from "./UserBar";
import { useState, useEffect } from "react";
import { Form, useActionData, useLoaderData } from "react-router-dom";
import classes from "./DashboardComponent.module.css";
import checkmark from "../assets/checkmark.svg";

function DashboardComponent() {
  const userData = useLoaderData();
  const user = userData.data.user;
  const taskDetails =
    userData.data.personalTaskList.length == 0
      ? []
      : userData.data.personalTaskList[0].tasks;

  const [selectedTask, setSelectedTask] = useState();
  const [selectedTaskId, setSelectedTaskId] = useState();

  const handleTaskClick = (task, id) => {
    setSelectedTask(task);
    setSelectedTaskId(id);
  };
  const handleComponentClick = () => {
    setShowComponent(!showComponent);
  };

  return (
    <>
      <main className={classes.main}>
        <UserBar
          userData={userData}
          user={user}
          taskDetails={taskDetails}
          selectedTask={selectedTask}
          selectedTaskId={selectedTaskId}
        ></UserBar>
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
              {taskDetails.map((task) => {
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
              {taskDetails.map((task) => {
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
            taskDetails={taskDetails}
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

  const res = await fetch("http://127.0.0.1:3000/api/user/task/list/" + id, {
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
  });

  if (res.status === 200 || res.status === 204) {
    return res;
  }
}
