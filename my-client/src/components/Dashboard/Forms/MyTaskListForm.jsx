import { useState } from "react";

export default function MyTaskListForm(props) {
  const { classes } = props;
  const [error, setError] = useState("");
  const newListHandler = async function () {
    const listName = document.querySelector("#newListName");
    if (!listName) return;

    // Call Api and add the list
    const res = await fetch("http://127.0.0.1:3000/api/user/task/list", {
      method: "POST",
      body: JSON.stringify({ name: listName }),
    });

    if (!res.ok) {
      setError("There was an  error");
      return setTimeout(() => setError(""), 3000);
    }
  };
  return (
    <div>
      <div className={classes.formInput}>
        <input id="newListName" type="text" placeholder="Enter List Name" />
      </div>
      <div>{error}</div>
      <div className={classes.formButton}>
        <button onClick={newListHandler}>Add List</button>
      </div>
    </div>
  );
}
