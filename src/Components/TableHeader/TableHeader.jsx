import React from "react";
import classes from "./TableHeader.module.css";
import AddLogo from "../Logos/AddLogo";
import { FaCalendarAlt } from "react-icons/fa";
const TableHeader = ({
  name,
  btnName,
  navigationfn,
  navigationClaender,
  showBtn = true,
  showCalender = false,
}) => {
  return (
    <header>
      <h2>{name}</h2>
      <div className={classes.actionLayout}>
        {showBtn && (
          <button className={classes.btn} onClick={navigationfn}>
            <AddLogo />
            <p>{btnName}</p>
          </button>
        )}
        {showCalender && (
          <button className={classes.btn} onClick={navigationClaender}>
            <FaCalendarAlt />
            <p>View Calender</p>
          </button>
        )}
      </div>
    </header>
  );
};

export default TableHeader;
