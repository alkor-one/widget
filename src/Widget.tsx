import { h } from "preact";
import styles from "./Widget.module.css";

function Widget() {

  return (
    <div className={styles.widget}>
      <h1>My Preact Widget</h1>
    </div>
  );
}

export default Widget;
