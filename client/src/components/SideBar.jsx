import "../index.css";
import { Form } from "react-router-dom";
import classes from "./DashboardComponent.module.css";
import checkmark from "../assets/checkmark.svg";
import downloadFile from "../assets/downloadFile.svg";
import deleteFile from "../assets/deleteFile.svg";
import classNames from "classnames";

function SideBar(props) {
  const addSubtask = async () => {};
  return (
    <>
      <div className={classes.activetask}>
        <Form method="PATCH" className={classes.form}>
          <p className={classes.activetask__title}>{props.selectedTask}</p>
          {props.userData.data.personalTaskList[0].tasks.map((task) => {
            if (task._id === props.selectedTaskId) {
              return (
                <>
                  <div className={classes.activetask__status}>
                    Status
                    <select type="">
                      <option value="complete">Complete</option>
                      <option value="incomplete">Incomplete</option>
                    </select>
                  </div>
                  <div className={classes.activetask__deadline}>
                    Deadline <input type="datetime-local" />
                  </div>
                  <div className={classes.subtask}>
                    <p className={classes.subtask__title}>Subtasks</p>
                    <div className={classes["subtask__container"]}>
                      <div className={classes["subtask__main"]}>
                        {task.subtasks.map((subtask) => {
                          if (subtask.status == "incomplete") {
                            return (
                              <>
                                <div className={classes.task}>
                                  <div className={classes.checkmark}>
                                    <img src={checkmark} alt="" />
                                  </div>
                                  {subtask.name}
                                </div>
                              </>
                            );
                          }
                        })}
                        {task.subtasks.map((subtask) => {
                          if (subtask.status == "complete") {
                            return (
                              <>
                                <div
                                  className={classNames(
                                    classes.task,
                                    classes.completed
                                  )}
                                >
                                  <div className={classes.checkmark}>
                                    <img src={checkmark} alt="" />
                                  </div>
                                  {subtask.name}
                                </div>
                              </>
                            );
                          }
                        })}
                      </div>
                      <div className={classes["subtask__button"]}>
                        <button className={classes.button}>
                          Add new subtask+
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className={classes.attachment}>
                    <p className={classes["attachment__title"]}>Attachments</p>
                    <div className={classes["attachment__container"]}>
                      <div className={classes["attachment__main"]}>
                        <div className={classes.file}>
                          File One
                          <div className={classes["file__buttons"]}>
                            <img src={downloadFile} alt="/" />
                            <img src={deleteFile} alt="/" />
                          </div>
                        </div>
                      </div>
                      <div className={classes["attachment__button"]}>
                        <label htmlFor="file" className={classes.button}>
                          {" "}
                          Add new attachment+{" "}
                        </label>
                        <input id="file" type="file" />
                      </div>
                    </div>
                  </div>
                  <div className={classes.activetask__update}>
                    <button>Update</button>
                  </div>
                </>
              );
            }
          })}
        </Form>
      </div>
    </>
  );
}

export default SideBar;
