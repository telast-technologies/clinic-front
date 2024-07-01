import React, { useContext } from "react";
import classes from "./Navbar.module.css";
import Avatar from "../../assets/avatar.jpg";
import { MdOutlineLogout } from "react-icons/md";
import { useNavigate } from "react-router";
import { AppContext } from "../../shared/AppContext";
const Navbar = () => {
  const { setToken } = useContext(AppContext);
  const navigate = useNavigate();
  const logoutHandler = () => {
    setToken(null);
    navigate("/");
  };
  return (
    <div className={classes.navbar}>
      <div className={classes.admin}>
        <img src={Avatar} alt="avatar" />
        <p>Super Admin</p>
      </div>
      <MdOutlineLogout size={20} cursor="pointer" onClick={logoutHandler} />
    </div>
  );
};

export default Navbar;
