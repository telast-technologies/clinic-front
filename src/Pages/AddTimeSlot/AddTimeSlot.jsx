import React from "react";
import classes from "./AddTimeSlot.module.css";
import NavMenu from "../../Components/NavMenu/NavMenu";
import Navbar from "../../Components/Navbar/Navbar";
import AddTimeForm from "../../Components/AddTimeForm/AddTimeForm";
const AddTimeSlot = () => {
  return (
    <>
      <NavMenu />
      <div className="main">
        <Navbar />
        <AddTimeForm />
      </div>
    </>
  );
};

export default AddTimeSlot;
