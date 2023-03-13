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
  const [todoListData, setTodoListData] = useState({
    name: "No List Selected",
    tasks: [],
  });

  // this will be set first using a useEffect hook
  const jwt = localStorage.getItem("jwt");

  useEffect(() => {
    fetch("http://127.0.0.1:3000/api/user", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setData(data.data);
      })
      .catch((err) => console.log(err));
  }, [jwt]);

  const renderTodoList = function (list) {
    setTodoListData({
      name: list.name,
      tasks: list.tasks,
    });
  };

  const updateData = function (data) {
    setData(data);
  };

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
          renderTodoList={renderTodoList}
        />

        <section className={classes.dashboard}>
          <p className={classes.listname}>{todoListData.name}</p>
          <div className={classes["member__container"]}>
            {/* <p>
              Members: <span>A, B, C, D</span>
            </p>
            <button>Add Member+</button> */}
          </div>
          {/* Will need data from Navbar: Create a global handler */}
          <TodoList
            classes={classes}
            setModalState={setModalIsOpen}
            setModalForm={setModalForm}
            data={todoListData.tasks}
            updateData={updateData}
          />
          {/* Will need data from TodoList: Create a global handler */}
        </section>
      </main>
    </AppContext.Provider>
  );
}
