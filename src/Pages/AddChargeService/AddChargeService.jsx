import React, { useContext } from "react";
import classes from "./AddChargeService.module.css";
import NavMenu from "../../Components/NavMenu/NavMenu";
import Navbar from "../../Components/Navbar/Navbar";
import { AppContext } from "../../shared/AppContext";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import ChargeServiceForm from "../../Components/ChargeServiceForm/ChargeServiceForm";
const AddChargeService = () => {
  const { token } = useContext(AppContext);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`, // Set authorization header
    },
  };
  function getService() {
    return axios.get(
      "https://clinic.telast.tech/api/v1/healthcare/service_select/",
      config
    );
  }
  const { data, isLoading, error } = useQuery({
    queryKey: ["getService"],
    queryFn: getService,
  });
  if (data) {
    console.log(data);
  }
  return (
    <>
      <NavMenu />
      <div className="main">
        <Navbar />
        {data && <ChargeServiceForm commingData={data?.data?.results} />}
      </div>
    </>
  );
};

export default AddChargeService;
