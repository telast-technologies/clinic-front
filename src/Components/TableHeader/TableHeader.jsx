import React from "react";
import classes from "./TableHeader.module.css";
import AddLogo from "../Logos/AddLogo";
import { FiMinus } from "react-icons/fi";
import { FaCalendarAlt } from "react-icons/fa";
const TableHeader = ({
  name,
  btnName,
  navigationfn,
  navigationClaender,
  showBtn = true,
  showCalender = false,
  addMode = true,
}) => {
  return (
    <header>
      <h2>{name}</h2>
      <div className={classes.actionLayout}>
        {showBtn && (
          <button className={classes.btn} onClick={navigationfn}>
            {addMode ? <AddLogo /> : <FiMinus />}
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
