import { useState, useEffect } from "react";
import Navbar from "../components/Dashboard/Navbar";
import ActiveTask from "../components/Dashboard/ActiveTask";
import TodoList from "../components/Dashboard/TodoList";
import classes from "./Dashboard.module.css";
import Modal from "../components/Dashboard/Modal";
import { AppContext } from "../AppContext";

export default function Dashboard() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalForm, setModalForm] = useState();
  const [data, setData] = useState({});

  // this will be set first using a useEffect hook
  useEffect(() => {
    fetch("http://127.0.0.1:3000/api/user", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setData(data.data);
        console.log(data.data);
      })
      .catch((err) => console.log(err));
  }, [localStorage.getItem("jwt")]);

  return (
    <AppContext.Provider value={{ data, setData }}>
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
    </AppContext.Provider>
  );
}
