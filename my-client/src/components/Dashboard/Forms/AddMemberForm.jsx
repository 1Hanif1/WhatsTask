import { useContext, useState } from "react";
import { AppContext } from "../../../AppContext";
export default function AddMemberForm(props) {
  const { classes, workspaceId, updateData } = props;
  const [error, setError] = useState("");
  const { data, setData } = useContext(AppContext);

  const addMemberHandler = async function () {
    const email = document.querySelector("input").value;
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      return setError("Please enter a valid email");

    fetch("http://127.0.0.1:3000/api/user/workspace/" + workspaceId, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    })
      .then((res) => res.json())
      .then((data) => {
        setData(data.data);
      })
      .catch((err) => setError(err));
  };
  return (
    <div>
      <h1>Add New Member</h1>
      <div className={classes.formInput}>
        <input type="text" placeholder="Add their Email" />
      </div>
      <div>{error}</div>
      <div className={classes.formButton}>
        <button onClick={addMemberHandler}>Add Member</button>
      </div>
    </div>
  );
}
