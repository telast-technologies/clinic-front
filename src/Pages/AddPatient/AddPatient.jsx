import React from "react";
import { classes } from "./AddPatient.module.css";
import NavMenu from "../../Components/NavMenu/NavMenu";
import Navbar from "../../Components/Navbar/Navbar";
import AddPatientForm from "../../Components/AddPatientForm/AddPatientForm";
const AddPatient = () => {
  return (
    <>
      <NavMenu />
      <div className="main">
        <Navbar />

        <AddPatientForm />
      </div>
    </>
  );
};

export default AddPatient;
