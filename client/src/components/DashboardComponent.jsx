import "../index.css";

import classes from "./DashboardComponent.module.css";
import classNames from "classnames";
import dummyProfile from "../assets/dummyProfilePic.png";
import settings from "../assets/settings.png";
import logout from "../assets/logout.png";
import todaystask from "../assets/todaystask.png";
import carvet from "../assets/caret.svg";
import checkmark from "../assets/checkmark.svg";
import downloadFile from "../assets/downloadFile.svg";
import deleteFile from "../assets/deleteFile.svg";

function DashboardComponent() {
  return (
    <>
      <main className={classes.main}>
        <nav className={classes.navbar}>
          <div className={classes.user}>
            <figure className={classes.user__image}>
              <img src={dummyProfile} alt="/" />
            </figure>
            <p className={classes.user__name}>Thisis Myname</p>
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
              <span className={classes.numtask}>5</span>
            </div>
          </div>
          <div className={classes.navbar__taskcontainer}>
            <div className={classes.mytask}>
              <p className={classes.mytask__title}>
                My Task List <img src={carvet} alt="" />
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
                Workspace 1 <img src={carvet} alt="" />
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
          <p className={classes.listname}>Active List Name Goes here</p>
          <div className={classes.member__container}>
            <p>
              Members: <span>A, B, C, D</span>
            </p>
            <button>Add Member+</button>
          </div>
          <div className={classes.todolist}>
            <div className={classes["todolist__active"]}>
              <div className={classes.task}>
                <div className={classes.checkmark}>
                  <img src={checkmark} alt="" />
                </div>
                This is a task
              </div>
            </div>
            <p className={classes.todolist__subtitle}>Completed Tasks</p>
            <div className={classes.todolist__completed}>
              <div className={classes.task}>
                <div className={classes.checkmark}>
                  <img src={checkmark} alt="" />
                </div>
                This is a task
              </div>
            </div>
            <div className={classes.todolist__input}>
              <input type="text" placeholder="Add a new task" />
            </div>
          </div>
          <div className={classes.activetask}>
            <p className={classes.activetask__title}>Current Active task</p>
            <div className={classes.activetask__deadline}>
              Deadline <input type="datetime-local" />
            </div>
            <div className={classes.subtask}>
              <p className={classes.subtask__title}>Subtasks</p>
              <div className={classes["subtask__container"]}>
                <div className={classes["subtask__main"]}>
                  <div className={classes.task}>
                    <div className={classes.checkmark}>
                      <img src={checkmark} alt="" />
                    </div>
                    This is some subtask
                  </div>
                  <div className={classNames(classes.task, classes.completed)}>
                    <div className={classes.checkmark}>
                      <img src={checkmark} alt="" />
                    </div>
                    This is some subtask
                  </div>
                </div>
                <div className={classes["subtask__button"]}>
                  <button className={classes.button}>Add new subtask+</button>
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
                  <label for="file" className={classes.button}>
                    {" "}
                    Add new attachment+{" "}
                  </label>
                  <input id="file" type="file" />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
export default DashboardComponent;
