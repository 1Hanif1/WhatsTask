import { useState, useContext, useEffect } from "react";
import { AppContext } from "../../AppContext";
import checkmark from "./images/checkmark.svg";
import downloadFile from "./images/downloadFile.svg";
import deleteFile from "./images/deleteFile.svg";

export default function ActiveTask(props) {
  const { classes, task, listId, updateList, taskId, memberData } = props;
  const [status, setStatus] = useState("");
  const [deadline, setDeadline] = useState("");
  const [subtasks, setSubtasks] = useState([]);
  const [assigned, setAssigned] = useState("");
  const [error, setError] = useState("");
  const [isChanged, setIsChanged] = useState(false);
  // useEffect(() => {
  //   setIsChanged(true);
  // }, [status, deadline, subtasks, assigned]);

  const subtaskHandler = function (e) {
    const subtaskElement = e.target;
    const id = subtaskElement.dataset.id;
    const subtask = task.subtasks.find((sub) => sub._id == id);

    if (subtaskElement.classList.contains(classes.completed)) {
      subtaskElement.classList.remove(classes.completed);
      subtask.status = "incomplete";
    } else {
      subtaskElement.classList.add(classes.completed);
      subtask.status = "complete";
    }
  };

  const assignHandler = function (e) {
    const member = e.target.value;
    setAssigned(member);
    task.member = member;
    setIsChanged(true);
  };

  const statusHandler = function (e) {
    const status = e.target.value;
    setStatus(status);
    task.status = status;
    setIsChanged(true);
  };

  const deadlineHandler = function (e) {
    const deadline = e.target.value;
    // console.log(deadline);
    setDeadline(deadline);
    task.deadline = deadline;
    setIsChanged(true);
  };

  const submitChanges = async function () {
    try {
      const updatedTask = {
        taskId,
        data: task,
      };

      // Call API to update data at backend
      const jwt = localStorage.getItem("jwt");
      let res = await fetch(
        `http://127.0.0.1:3000/api/user/workspace/${listId}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${jwt}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedTask),
        }
      );

      res = await res.json();
      updateList(updatedTask);
      setIsChanged(false);
    } catch (err) {
      console.log(err);
      setError("There was an error");
      setTimeout(setError(""), 3000);
      return;
    }
    setError("Task Updated Succesfully");
    setTimeout(setError(""), 3000);
  };

  const addSubtask = function (e) {
    if (e.key !== "Enter") return;
    if (!listId) return;
    const value = e.target.value.trim();
    if (!value) return;
    // const html = `
    // <div className={classes.task}>
    //   <div className={classes.checkmark}>
    //     <img src={checkmark} alt="" />
    //   </div>
    //   ${value}
    // </div>`;

    // const container = e.target.previousElementSibling;
    // container.insertAdjacentHTML("beforeend", html);

    const newSubtask = {
      name: value,
      status: "Incomplete",
    };
    task.subtasks.push(newSubtask);
    setSubtasks((prev) => [...prev, newSubtask]);
    setIsChanged(true);
  };

  const renderDeadline = (deadline) => {
    if (deadline.includes("T")) {
      deadline = deadline.slice(0, deadline.length - 5);
      const deadlineArray = deadline.split("T");
      return `${deadlineArray[0].split("-").reverse().join("-")}`;
    }
    return deadline.split("-").reverse().join("-");
  };

  return (
    <div className={classes.activetask}>
      {!task ? (
        <p className={classes.activetask__title}>No Task Selected</p>
      ) : (
        <>
          <p className={classes.activetask__title}>{task.name}</p>
          <div className={classes.activetask__status}>
            Status
            <select value={task.status} onChange={statusHandler}>
              <option value="complete">Complete</option>
              <option value="incomplete">Incomplete</option>
            </select>
          </div>
          <div className={classes.activetask__deadline}>
            <p>
              <span>Deadline: </span>
              <span>{`${
                task.deadline
                  ? renderDeadline(task.deadline)
                  : "No deadline set"
              }`}</span>
            </p>
            <input
              type="date"
              value={task.deadline?.toString().slice(0, task.length - 1)}
              onChange={deadlineHandler}
              min={new Date().toISOString().slice(0, 10)}
            />
          </div>
          <div className={classes.activetask__assign}>
            Assigned to
            <select onChange={assignHandler}>
              <option value={task.member}>
                {task.member ? task.member : "No member selected"}
              </option>
              {memberData.map((member) => (
                <option key={member._id} value={member.name}>
                  {member.name}
                </option>
              ))}
            </select>
          </div>
          <div className={classes.subtask}>
            <p className={classes.subtask__title}>Subtasks</p>
            <div className={classes.subtask__container}>
              <div className={classes.subtask__main}>
                {task.subtasks.map((sub) => {
                  return (
                    <div
                      className={`${classes.task} ${
                        sub.status == "complete" ? classes.completed : ""
                      }`}
                      key={sub._id}
                      data-id={sub._id}
                      onClick={subtaskHandler}
                    >
                      <div className={classes.checkmark}>
                        <img src={checkmark} alt="" />
                      </div>
                      {sub.name}
                    </div>
                  );
                })}
                {/* <div className={classes.task}>
                  <div className={classes.checkmark}>
                    <img src={checkmark} alt="" />
                  </div>
                  This is some subtask
                </div>
                <div className={`${classes.task} ${classes.completed}`}>
                  <div className={classes.checkmark}>
                    <img src={checkmark} alt="" />
                  </div>
                  This is some subtask
                </div> */}
              </div>

              {/* <button className={classes.button} onClick={addSubtask}>Add new subtask+</button> */}
              <input
                className={classes.subtask__input}
                type="text"
                placeholder="add new subtask"
                onKeyDown={addSubtask}
              />
            </div>
          </div>
          {/* <div className={classes.attachment}>
            <p className={classes.attachment__title}>Attachments</p>
            <div className={classes.attachment__container}>
              <div className={classes.attachment__main}>
                <div className={classes.file}>
                  File One
                  <div className={classes.file__buttons}>
                    <img src={downloadFile} alt="/" />
                    <img src={deleteFile} alt="/" />
                  </div>
                </div>
              </div>
              <div className={classes.attachment__button}>
                <label htmlFor="file" className={classes.button}>
                  Add new attachment+
                </label>
                <input id="file" type="file" />
              </div>
            </div>
          </div> */}
          <div className={classes.activetask__update}>
            <p className={classes.error}>{error}</p>
            {isChanged ? (
              <button onClick={submitChanges}>Update</button>
            ) : (
              <></>
            )}
          </div>
        </>
      )}
    </div>
  );
}
