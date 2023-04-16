import classes from "./Features.module.css";
import feature from "../../assets/feature.png";
import task from "../../assets/taskIcon.svg";
import "../../main.css";
// import classNames from "classnames";

function Features() {
  return (
    <main className={classes.main}>
      <h2 className={classes.main__title}>Features of WhatsTask</h2>
      <section className={classes.main__features}>
        <div className={classes["main__card"]}>
          <figure className={classes.main__card_img}>
            <img src={task} alt="/" />
          </figure>
          <p>Create and assign tasks to team members</p>
        </div>
        <div className={classes.main__card}>
          <figure className={classes.main__card_img}>
            <img src={task} alt="/" />
          </figure>
          <p>Create and assign tasks to team members</p>
        </div>
        <div className={classes.main__card}>
          <figure className={classes.main__card_img}>
            <img src={task} alt="/" />
          </figure>
          <p>Create and assign tasks to team members</p>
        </div>
      </section>
      <figure className={classes.main__image}>
        <img src={feature} alt="/" />
      </figure>
    </main>
  );
}

export default Features;
