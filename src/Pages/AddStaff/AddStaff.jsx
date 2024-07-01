import React from "react";
import NavMenu from "../../Components/NavMenu/NavMenu";
import Navbar from "../../Components/Navbar/Navbar";
import AddStaffForm from "../../Components/AddStaffForm/AddStaffForm";

const AddStaff = () => {
  return (
    <>
      <NavMenu />
      <div className="main">
        <Navbar />
        <AddStaffForm />
      </div>
    </>
  );
};

export default AddStaff;
