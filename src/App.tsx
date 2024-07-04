import type { Component } from "solid-js";

import styles from "./App.module.css";
import Gravity from "./app/components/Gravity";

const App: Component = () => {
  return (
    <div class={styles.App}>
      <Gravity />
    </div>
  );
};

export default App;
