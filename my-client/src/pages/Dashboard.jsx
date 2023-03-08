import Navbar from "../components/Dashboard/Navbar";
import ActiveTask from "../components/Dashboard/ActiveTask";
import TodoList from "../components/Dashboard/TodoList";
import classes from "./Dashboard.module.css";
export default function Dashboard() {
  return (
    <main className={classes.main}>
      <Navbar classes={classes} />
      <section className={classes.dashboard}>
        <p className={classes.listname}>Active List Name Goes here</p>
        <div className={classes["member__container"]}>
          <p>
            Members: <span>A, B, C, D</span>
          </p>
          <button>Add Member+</button>
        </div>
        <TodoList classes={classes} />
        <ActiveTask classes={classes} />
      </section>
    </main>
  );
}
