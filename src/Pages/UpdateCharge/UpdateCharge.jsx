import React, { useContext } from "react";
import NavMenu from "../../Components/NavMenu/NavMenu";
import Navbar from "../../Components/Navbar/Navbar";
import UpdateChargeForm from "../../Components/UpdateChargeForm/UpdateChargeForm";
import { useParams } from "react-router";
import { AppContext } from "../../shared/AppContext";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";

const UpdateCharge = () => {
  return (
    <>
      <NavMenu />
      <div className="main">
        <Navbar />
        <UpdateChargeForm />
      </div>
    </>
  );
};

export default UpdateCharge;
