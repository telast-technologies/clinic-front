import React, { useContext } from "react";
import NavMenu from "../../Components/NavMenu/NavMenu";
import Navbar from "../../Components/Navbar/Navbar";
import AddVisitForm from "../../Components/AddVisitForm/AddVisitForm";
import { useQuery } from "@tanstack/react-query";
import { AppContext } from "../../shared/AppContext";
import axios from "axios";
import { useForm } from "react-hook-form";

const AddVisit = () => {
  const { token } = useContext(AppContext);

  return (
    <>
      <NavMenu />
      <div className="main">
        <Navbar />
      </div>
    </>
  );
};

export default AddVisit;
