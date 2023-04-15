import { useState, useEffect } from "react";
import Navbar from "../components/Dashboard/Navbar";
import ActiveTask from "../components/Dashboard/ActiveTask";
import TodoList from "../components/Dashboard/TodoList";
import WorkspaceList from "../components/Dashboard/WorkspaceList";
import AddMemberForm from "../components/Dashboard/Forms/AddMemberForm";
import classes from "./Dashboard.module.css";
import Modal from "../components/Dashboard/Modal";
import { AppContext } from "../AppContext";

export default function Dashboard() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalForm, setModalForm] = useState();
  const [listType, setListType] = useState();
  const [data, setData] = useState({});
  const [todoListData, setTodoListData] = useState({
    id: "",
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
      id: list._id,
      name: list.name,
      tasks: list.tasks,
      members: list.members ? list.members : null,
    });
  };

  // const updateData = function (newData) {
  //   // setData(data);
  //   if (newData.type == "personalTaskList") {
  //     data.personalTaskList.forEach((list, index) => {
  //       if (list._id == newData.id) {
  //         data.personalTaskList[index].tasks = list.tasks;
  //         setData(data);
  //       }
  //     });
  //   }
  // };

  const renderMemberList = (listType) => {
    if (listType == "workspace") {
      return (
        <>
          <p>
            {!todoListData.members
              ? "No members added"
              : todoListData.members.reduce(
                  (acc, el) => (acc = acc + el.name + ", "),
                  ""
                )}
          </p>
          <button onClick={openMemberModal}>Add Member+</button>
        </>
      );
    } else return "";
  };

  const updateData = function (newData) {
    setData((prevData) => {
      let newDataCopy = { ...prevData }; // create a copy of the data object
      if (newData.type == "personalTaskList") {
        newDataCopy.personalTaskList.forEach((list, index) => {
          if (list._id == newData.id) {
            newDataCopy.personalTaskList[index].tasks = list.tasks;
          }
        });
      } else if (newData.type == "newTask") {
        newDataCopy.personalTaskList = newData.data.data;
        newDataCopy.personalTaskList.forEach((list, index) => {
          if (list._id == newData.id) {
            setTodoListData((_) => {
              return {
                id: list._id,
                name: list.name,
                tasks: list.tasks,
              };
            });
          }
        });
      } else if (newData.type == "deleteTask") {
        newDataCopy = newData.data;
      }
      return newDataCopy; // return the updated copy as the new state
    });
  };

  const updateWorkspaceData = function (newData) {
    console.log(newData);
    setData((prevData) => {
      let newDataCopy = { ...prevData }; // create a copy of the data object
      if (newData.type == "personalTaskList") {
        newDataCopy.workspace.forEach((list, index) => {
          if (list._id == newData.id) {
            newDataCopy.workspace[index].tasks = list.tasks;
          }
        });
      } else if (newData.type == "newTask") {
        newDataCopy.workspace = newData.data.data;
        newDataCopy.workspace.forEach((list, index) => {
          if (list._id == newData.id) {
            setTodoListData((_) => {
              return {
                id: list._id,
                name: list.name,
                tasks: list.tasks,
              };
            });
          }
        });
      } else if (newData.type == "deleteTask") {
        newDataCopy = newData.data;
      }
      return newDataCopy; // return the updated copy as the new state

      return prevData;
    });
  };

  const renderListByType = (listType) => {
    if (listType == "workspace")
      return (
        <WorkspaceList
          classes={classes}
          setModalState={setModalIsOpen}
          setModalForm={setModalForm}
          listData={todoListData.tasks}
          updateData={updateWorkspaceData}
          listId={todoListData.id}
          data={data}
        />
      );
    else
      return (
        <TodoList
          classes={classes}
          setModalState={setModalIsOpen}
          setModalForm={setModalForm}
          listData={todoListData.tasks}
          updateData={updateData}
          listId={todoListData.id}
          data={data}
        />
      );
  };

  const openMemberModal = function () {
    setModalForm(
      <AddMemberForm
        classes={classes}
        workspaceId={todoListData.id}
        updateData={setData}
      />
    );
    setModalIsOpen(true);
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
          setType={setListType}
          setTodoListData={setTodoListData}
          setListType={setListType}
        />

        <section className={classes.dashboard}>
          <p className={classes.listname}>{todoListData.name}</p>
          <div className={classes["member__container"]}>
            {renderMemberList(listType)}
          </div>
          {renderListByType(listType)}
        </section>
      </main>
    </AppContext.Provider>
  );
}
