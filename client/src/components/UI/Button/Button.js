import React from "react";
import styles from "./Button.module.css";
export default function Button(props) {
  return (
    <a href={props.link} class={`${styles.button} ${props.type}`}>
      {props.children}
    </a>
  );
}
