import { useContext, useState } from "react";
import { AppContext } from "../../../AppContext";
export default function MyTaskListForm(props) {
  const { classes } = props;
  const [error, setError] = useState("");
  const { data, setData } = useContext(AppContext);

  const newListHandler = async function () {
    const listName = document.querySelector("#newListName").value.trim();
    if (!listName) return;
    // Call Api and add the list
    const res = await fetch("http://127.0.0.1:3000/api/user/workspace", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: listName }),
    });

    if (!res.ok) {
      const errData = await res.json();
      setError(errData.message);

      return setTimeout(() => setError(""), 3000);
    }

    const resData = await res.json();

    setData(resData.data);
  };
  return (
    <div>
      <h1>Add New Workspace</h1>
      <div className={classes.formInput}>
        <input
          id="newListName"
          type="text"
          placeholder="Enter Workspace Name"
        />
      </div>
      <div>{error}</div>
      <div className={classes.formButton}>
        <button onClick={newListHandler}>Add Workspace</button>
      </div>
    </div>
  );
}
