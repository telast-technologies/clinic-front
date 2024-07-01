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
  const getPaient = () => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`, // Set authorization header
      },
    };
    return axios.get(
      "https://clinic.telast.tech/api/v1/patients/patient/",
      config
    );
  };
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["getPaient"],
    queryFn: getPaient,
  });

  return (
    <>
      <NavMenu />
      <div className="main">
        <Navbar />
        {data && <AddVisitForm paient={data?.data?.results} />}
      </div>
    </>
  );
};

export default AddVisit;
