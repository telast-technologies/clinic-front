import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { MdMedicalServices } from "react-icons/md";
import {
  AiFillFileText,
  AiFillDashboard,
  AiFillReconciliation,
  AiFillAppstore,
} from "react-icons/ai";
import { FaUserDoctor } from "react-icons/fa6";
import { MdAccessTimeFilled } from "react-icons/md";
import { IoIosSettings } from "react-icons/io";
import classes from "./NavMemu.module.css";

const NavMenu = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className={classes.sidebar}>
      {/* <div className={classes.logo}>Logo</div> */}
      <div>
        <ul className={classes.links}>
          <li
            onClick={() => navigate("/dashboard")}
            className={location.pathname === "/dashboard" ? classes.active : ""}
          >
            <AiFillDashboard />
            <p> Dashboard </p>
          </li>
          <li
            onClick={() => navigate("/viewpatient")}
            className={
              location.pathname === "/viewpatient" ? classes.active : ""
            }
          >
            <FaUserDoctor />
            <p> Patients </p>
          </li>
          <li
            onClick={() => navigate("/viewsup")}
            className={location.pathname === "/viewsup" ? classes.active : ""}
          >
            <AiFillAppstore />
            <p> Supplies </p>
          </li>
          <li
            onClick={() => navigate("/viewservices")}
            className={
              location.pathname === "/viewservices" ? classes.active : ""
            }
          >
            <MdMedicalServices />
            <p> Services </p>
          </li>
          <li
            onClick={() => navigate("/timeslot")}
            className={location.pathname === "/timeslot" ? classes.active : ""}
          >
            <MdAccessTimeFilled />
            <p> Doctor Sessions </p>
          </li>
          <li
            onClick={() => navigate("/viewvisit")}
            className={location.pathname === "/viewvisit" ? classes.active : ""}
          >
            <AiFillReconciliation size="20rem" />
            <p> Visits </p>
          </li>
          <li
            onClick={() => navigate("/invoice")}
            className={location.pathname === "/invoice" ? classes.active : ""}
          >
            <AiFillFileText />
            <p> Invoices </p>
          </li>
          <li
            onClick={() => navigate("/profile")}
            className={location.pathname === "/profile" ? classes.active : ""}
          >
            <IoIosSettings />
            <p> Setting </p>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default NavMenu;
