import { useState } from "react";
import Navbar from "../components/Dashboard/Navbar";
import ActiveTask from "../components/Dashboard/ActiveTask";
import TodoList from "../components/Dashboard/TodoList";
import classes from "./Dashboard.module.css";
import Modal from "../components/Dashboard/Modal";

export default function Dashboard() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalForm, setModalForm] = useState();

  return (
    <main className={classes.main}>
      <Modal
        classes={classes}
        isOpen={modalIsOpen}
        setModalState={setModalIsOpen}
        modalForm={modalForm}
      />
      <Navbar
        classes={classes}
        setModalState={(state) => setModalIsOpen(state)}
        setModalForm={(form) => setModalForm(form)}
      />

      <section className={classes.dashboard}>
        <p className={classes.listname}>Active List Name Goes here</p>
        <div className={classes["member__container"]}>
          <p>
            Members: <span>A, B, C, D</span>
          </p>
          <button>Add Member+</button>
        </div>
        <TodoList
          classes={classes}
          setModalState={setModalIsOpen}
          setModalForm={setModalForm}
        />
        <ActiveTask classes={classes} />
      </section>
    </main>
  );
}
