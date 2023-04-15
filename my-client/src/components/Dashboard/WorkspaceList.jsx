import checkmark from "./images/checkmark.svg";
import DeleteFile from "./images/deleteFile.svg";
import WorkspaceActiveTask from "./WorkspaceActiveTask";
import { useContext, useState } from "react";
import { AppContext } from "../../AppContext";
export default function WorkspaceList(props) {
  const { classes, setModalState, setModalForm, listData, updateData, listId } =
    props;
  const [selectedTask, setSelectedTask] = useState(null);
  const [currentTaskId, setCurrentTaskId] = useState(null);
  const { data, setData } = useContext(AppContext);

  const setActiveTaskHandler = function (e) {
    const id = e.target.dataset.id;
    listData.forEach((task) => {
      if (task._id == id) {
        setSelectedTask(task);
        setCurrentTaskId(task._id);
      }
    });
  };

  // const updateList = function (updateTask) {
  //   const updatedListData = listData.map((task) => {
  //     if (task._id === currentTaskId) {
  //       return updateTask.data;
  //     } else {
  //       return task;
  //     }
  //   });
  //   updateData(updatedListData);
  // };
  const updateList = function (updateTask) {
    listData.forEach((task, index) => {
      if (task._id == currentTaskId) {
        listData[index] = updateTask.data;
      }
    });
    updateData({ data: listData, id: listId, type: "personalTaskList" });
  };

  const handleNewTask = function (e) {
    if (e.key !== "Enter") return;
    if (!listId) return;
    const value = e.target.value.trim();
    if (!value) return;
    const newTask = { name: value };
    fetch(`http://127.0.0.1:3000/api/user/workspace/${listId}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTask),
    })
      .then((res) => res.json())
      .then((data) => {
        updateData({ data, type: "newTask", id: listId });
      })
      .catch((err) => console.log(err));
  };

  const deleteTask = async function (e) {
    const task = e.target.closest(`div`);
    console.log(task);
    const taskId = task.dataset.id;
    console.log(taskId);
    const res = await fetch(
      `http://127.0.0.1:3000/api/user/workspace/${listId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ taskId }),
      }
    );

    if (!res.ok) return;

    task.style.display = "none";

    const resData = await res.json();

    updateData({ data: resData.data, type: "deleteTask" });

    setSelectedTask(null);
  };

  return (
    <>
      <div className={classes.todolist}>
        <div className={classes.todolist__active}>
          {listData
            .filter((task) => task.status == "incomplete")
            .map((task) => {
              return (
                <div
                  className={classes.task}
                  key={task._id}
                  data-id={task._id}
                  onClick={setActiveTaskHandler}
                >
                  <div className={classes.checkmark}>
                    <img src={checkmark} alt="" />
                  </div>
                  {task.name}{" "}
                  <img
                    src={DeleteFile}
                    style={{
                      width: "1.25em",
                      marginLeft: "auto",
                      cursor: "pointer",
                    }}
                    onClick={deleteTask}
                  />
                </div>
              );
            })}
        </div>
        <p className={classes.todolist__subtitle}>Completed Tasks</p>
        <div className={classes.todolist__completed}>
          {listData
            .filter((task) => task.status == "complete")
            .map((task) => {
              return (
                <div
                  className={classes.task}
                  key={task._id}
                  data-id={task._id}
                  onClick={setActiveTaskHandler}
                >
                  <div className={classes.checkmark}>
                    <img src={checkmark} alt="" />
                  </div>
                  {task.name}{" "}
                  <img
                    src={DeleteFile}
                    style={{
                      width: "1.25em",
                      marginLeft: "auto",
                      cursor: "pointer",
                    }}
                    onClick={deleteTask}
                  />
                </div>
              );
            })}
        </div>
        <div className={classes.todolist__input}>
          <input
            type="text"
            placeholder="Add a new task"
            onKeyDown={handleNewTask}
          />
        </div>
      </div>
      <WorkspaceActiveTask
        classes={classes}
        task={selectedTask}
        listId={listId}
        taskId={currentTaskId}
        updateList={updateList}
      />
    </>
  );
}
