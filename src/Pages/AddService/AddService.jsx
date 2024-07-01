import React from "react";
import NavMenu from "../../Components/NavMenu/NavMenu";
import Navbar from "../../Components/Navbar/Navbar";
import AddServiceForm from "../../Components/AddServiceForm/AddServiceForm";

const AddService = () => {
  return (
    <div>
      <NavMenu />
      <div className="main">
        <Navbar />
        <AddServiceForm />
      </div>
    </div>
  );
};

export default AddService;
