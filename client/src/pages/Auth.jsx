import classes from "./Auth.module.css";
import Login from "../components/Auth/Login";
import Register from "../components/Auth/Register";
import { useSearchParams } from "react-router-dom";

function RenderForm() {
  const [searchParams] = useSearchParams();
  if (searchParams.get("mode") === "register") return <Register />;
  else if (searchParams.get("mode") === "login") return <Login />;
  else {
    return null;
  }
}

export default function Auth() {
  return (
    <>
      <main className={classes.main}>
        <section className={classes.left}></section>
        <section className={classes.right}>
          <RenderForm />
        </section>
      </main>
    </>
  );
}
