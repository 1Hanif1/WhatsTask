import checkmark from "./images/checkmark.svg";
import downloadFile from "./images/downloadFile.svg";
import deleteFile from "./images/deleteFile.svg";
export default function ActiveTask(props) {
  const { classes } = props;
  return (
    <div className={classes.activetask}>
      <p className={classes.activetask__title}>Current Active task</p>
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
        <div className={classes.subtask__container}>
          <div className={classes.subtask__main}>
            <div className={classes.task}>
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
            </div>
          </div>
          <div className={classes.subtask__button}>
            <button className={classes.button}>Add new subtask+</button>
          </div>
        </div>
      </div>
      <div className={classes.attachment}>
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
      </div>
      <div className={classes.activetask__update}>
        <button>Update</button>
      </div>
    </div>
  );
}
