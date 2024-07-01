import React, { useContext } from "react";
import NavMenu from "../../Components/NavMenu/NavMenu";
import Navbar from "../../Components/Navbar/Navbar";
import ChargeItemForm from "../../Components/ChargeItemForm/ChargeItemForm";
import { AppContext } from "../../shared/AppContext";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const AddChargeItem = () => {
  const { token } = useContext(AppContext);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`, // Set authorization header
    },
  };
  function getSupply() {
    return axios.get(
      "https://clinic.telast.tech/api/v1/inventory/supply_select/",
      config
    );
  }
  const { data, isLoading, error } = useQuery({
    queryKey: ["getSupply"],
    queryFn: getSupply,
  });
  if (data) {
    console.log(data);
  }
  return (
    <>
      <NavMenu />
      <div className="main">
        <Navbar />
        {data && <ChargeItemForm data={data?.data?.results} />}
      </div>
    </>
  );
};

export default AddChargeItem;
