import { useState, useContext } from "react";
import { AppContext } from "../../AppContext";
import checkmark from "./images/checkmark.svg";
import downloadFile from "./images/downloadFile.svg";
import deleteFile from "./images/deleteFile.svg";

export default function ActiveTask(props) {
  const { classes, task, listId, updateList, taskId } = props;
  const [status, setStatus] = useState("");
  const [deadline, setDeadline] = useState("");
  const [error, setError] = useState("");

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

  const statusHandler = function (e) {
    const status = e.target.value;
    setStatus(status);
    task.status = status;
  };

  const deadlineHandler = function (e) {
    const deadline = e.target.value;
    setDeadline(deadline);
    task.deadline = deadline;
  };

  const submitChanges = async function () {
    try {
      const updatedTask = {
        taskId,
        data: task,
      };
      // console.log(updatedTask);

      // Call API to update data at backend
      const jwt = localStorage.getItem("jwt");
      let res = await fetch(
        `http://127.0.0.1:3000/api/user/task/list/${listId}`,
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
    } catch (err) {
      console.log(err);
      setError("There was an error");
      setTimeout(setError(""), 3000);
    }
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
            Deadline{" "}
            <input
              type="datetime-local"
              value={deadline}
              onChange={deadlineHandler}
            />
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
              <div className={classes.subtask__button}>
                <button className={classes.button}>Add new subtask+</button>
              </div>
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
            <button onClick={submitChanges}>Update</button>
          </div>
        </>
      )}
    </div>
  );
}
