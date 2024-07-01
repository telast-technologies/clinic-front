import React from "react";
import classes from "./Monthly.module.css";
const Monthly = () => {
  return (
    <div className={classes.monthlyCard}>
      <aside className={classes.left}>
        <div>
          <h2>Montly Earning !</h2>
          <h5>This Month</h5>
        </div>
        <p>$10000</p>
      </aside>
      <aside className={classes.right}>
        <span>70.01%</span>
        <p>From Previous Month</p>
      </aside>
    </div>
  );
};

export default Monthly;
