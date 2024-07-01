import React from "react";
import classes from "./StatComponent.module.css";

const StatComponent = ({ title, count, img }) => {
  return (
    <div className={classes.stat}>
      <div className={classes.statLayout}>
        <aside>
          <h4>{title}</h4>
          <h2>{count}</h2>
        </aside>
        <img src={img} alt="img" />
      </div>
    </div>
  );
};

export default StatComponent;
