import React, { useContext, useEffect } from "react";
import TableHeader from "../TableHeader/TableHeader";
import { AppContext } from "../../shared/AppContext";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import BasicTable from "../PatientTable/BasicTable";
import { ChargeServiceCoulmn } from "./ChargeServiceCoulmn";
import { useNavigate } from "react-router";
import BounceLoader from "react-spinners/BounceLoader";
import ErrorBlock from "../ErrorBlock/ErrorBlock";

const ChargeService = ({ uid }) => {
  const navigate = useNavigate();
  const { token } = useContext(AppContext);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`, // Set authorization header
    },
  };
  const getChargeService = () => {
    return axios.get(
      `https://clinic.telast.tech/api/v1/invoices/charge_services/?invoice=${uid}`,
      config
    );
  };
  const { data, isError, error, isLoading, refetch } = useQuery({
    queryKey: ["serviceCharge"],
    queryFn: getChargeService,
  });
  useEffect(() => {
    refetch();
  }, [uid]);
  if (isLoading) {
    return (
      <div className="center">
        <BounceLoader color="#4874dc" size={150} />
      </div>
    );
  }
  if (isError) {
    return (
      <div className="center">
        <ErrorBlock title="Error" message={error.response.data.message} />
      </div>
    );
  }
  if (data) {
    console.log(data, "comming from service charge table");
  }
  function navigationfn() {
    navigate(`/addchargeService/${uid}`);
  }
  return (
    <div className="tableContainer">
      <TableHeader
        navigationfn={navigationfn}
        name="Charge Service"
        btnName="Add Charge Service"
      />
      {data && (
        <BasicTable data={data?.data?.results} columns={ChargeServiceCoulmn} />
      )}
      {isError && <p>Error</p>}
    </div>
  );
};

export default ChargeService;
