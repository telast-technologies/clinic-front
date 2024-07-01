import React from "react";
import classes from "./AdminCard.module.css";
import Avatar from "../../assets/avatar.jpg";
const AdminCard = () => {
  return (
    <div className={classes.adminCard}>
      <aside>
        <h2>Welcome Back!</h2>
        <h5>Dashboard</h5>
      </aside>
      <div className={classes.adminBody}>
        <div className={classes.adminInfo}>
          <img src={Avatar} alt="imge" />
          <h2>Super Admin</h2>
          <p>admin@infcare.com</p>
        </div>
        <div>
          <div className={classes.mainComp}>
            <p> 49</p>
            <span>Total Active Doctors</span>
          </div>
          <div className={classes.mainComp}>
            <p> 2482</p>
            <span>Total Active patients</span>
          </div>
        </div>
        <div>
          <div className={classes.mainComp}>
            <p> 1</p>
            <span>Today Appoinetement</span>
          </div>
          <div className={classes.mainComp}>
            <p> 3</p>
            <span> Today Registed patients</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminCard;
