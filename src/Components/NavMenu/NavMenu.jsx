import React from "react";
import classes from "./NavMemu.module.css";
import { useNavigate } from "react-router";
import { MdMedicalServices } from "react-icons/md";
import { AiFillFileText } from "react-icons/ai";
import TimeLogo from "../Logos/TimeLogo";
import { AiFillDashboard } from "react-icons/ai";
import { AiFillReconciliation } from "react-icons/ai";
import { AiFillAppstore } from "react-icons/ai";
import { FaUserDoctor } from "react-icons/fa6";
import { MdAccessTimeFilled } from "react-icons/md";
import { IoIosSettings } from "react-icons/io";
const NavMenu = () => {
  const navigate = useNavigate();
  return (
    <div className={classes.sidebar}>
      {/* <div className={classes.logo}>Logo</div> */}
      <div>
        <ul className={classes.links}>
          <li onClick={() => navigate("/dashboard")}>
            <AiFillDashboard />
            <p> Dashboard </p>
          </li>
          <li onClick={() => navigate("/viewpaient")}>
            <FaUserDoctor />
            <p> Patients </p>
          </li>
          <li onClick={() => navigate("/viewsup")}>
            <AiFillAppstore />
            <p> Supplies </p>
          </li>
          <li onClick={() => navigate("/viewservices")}>
            <MdMedicalServices />
            <p>Services</p>
          </li>
          <li onClick={() => navigate("/timeslot")}>
            <MdAccessTimeFilled />
            <p> Doctor Sessions </p>
          </li>
          <li onClick={() => navigate("/viewvisit")}>
            <AiFillReconciliation size="20rem" />
            <p> Visits </p>
          </li>
          <li onClick={() => navigate("/invoice")}>
            <AiFillFileText />
            <p> Invoices </p>
          </li>
          <li onClick={() => navigate("/profile")}>
            <IoIosSettings />
            <p>Setting</p>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default NavMenu;
