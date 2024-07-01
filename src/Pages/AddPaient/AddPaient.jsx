import React from "react";
import { classes } from "./AddPaient.module.css";
import NavMenu from "../../Components/NavMenu/NavMenu";
import Navbar from "../../Components/Navbar/Navbar";
import AddPaientForm from "../../Components/AddPaientForm/AddPaientForm";
const AddPaient = () => {
  return (
    <>
      <NavMenu />
      <div className="main">
        <Navbar />

        <AddPaientForm />
      </div>
    </>
  );
};

export default AddPaient;
