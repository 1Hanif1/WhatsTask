import classes from "./Demo.module.css";
import video from "../../assets/demo.mp4";
import { Link } from "react-router-dom";
import classNames from "classnames";

function Demo() {
  return (
    <>
      <section className={classes.video}>
        <h2 className={classes.video__title}>Here's how it works</h2>
        <div className={classes.video__main}>
          <video width="320" height="240" controls>
            <source src={video} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        <div className={classes.video__link}>
          <Link to="/auth?mode=signup" className={classes["link--two"]}>
            Register Now
          </Link>
        </div>
      </section>
    </>
  );
}

export default Demo;
