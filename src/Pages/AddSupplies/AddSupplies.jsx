import React from "react";
import classes from "./AddSupplies.module.css";
import NavMenu from "../../Components/NavMenu/NavMenu";
import Navbar from "../../Components/Navbar/Navbar";
import AddSupForm from "../../Components/AddSupForm/AddSupForm";
import TableHeader from "../../Components/TableHeader/TableHeader";
const AddSupplies = () => {
  return (
    <>
      <NavMenu />
      <div className="main">
        <Navbar />

        <AddSupForm />
      </div>
    </>
  );
};

export default AddSupplies;
