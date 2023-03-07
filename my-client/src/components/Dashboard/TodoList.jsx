import checkmark from "./images/checkmark.svg";
export default function TodoList(props) {
  const { classes } = props;
  return (
    <div className={classes.todolist}>
      <div className={classes.todolist__active}>
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
  );
}
