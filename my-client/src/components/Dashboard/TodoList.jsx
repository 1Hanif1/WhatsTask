import checkmark from "./images/checkmark.svg";
import ActiveTask from "./ActiveTask";
import { useState } from "react";
export default function TodoList(props) {
  const { classes, setModalState, setModalForm, data, updateData } = props;
  const [selectedTask, setSelectedTask] = useState(null);
  const [currentListId, setCurrentListId] = useState(null);

  const setActiveTaskHandler = function (e) {
    const id = e.target.dataset.id;
    setCurrentListId(id);
    data.forEach((task) => {
      if (task._id == id) {
        setSelectedTask(task);
        // console.log(selectedTask);
      }
    });
  };

  const updateList = function (updateTask) {
    data.forEach(task, (index) => {
      if (task._id == currentListId) {
        data[index] = task;
        updateData(data);
      }
    });
  };
  return (
    <>
      <div className={classes.todolist}>
        <div className={classes.todolist__active}>
          {data
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
                  {task.name}
                </div>
              );
            })}
        </div>
        <p className={classes.todolist__subtitle}>Completed Tasks</p>
        <div className={classes.todolist__completed}>
          {data
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
                  {task.name}
                </div>
              );
            })}
        </div>
        <div className={classes.todolist__input}>
          <input type="text" placeholder="Add a new task" />
        </div>
      </div>
      <ActiveTask
        classes={classes}
        task={selectedTask}
        listId={currentListId}
        updateList={updateList}
      />
    </>
  );
}
