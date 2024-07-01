import React, { useContext, useEffect } from "react";
import TableHeader from "../TableHeader/TableHeader";
import { AppContext } from "../../shared/AppContext";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import BasicTable from "../PaientTable/BasicTable";
import { ChargeCoulmn } from "./ChargeCoulmn";
import { useNavigate } from "react-router";
import BounceLoader from "react-spinners/BounceLoader";
import ErrorBlock from "../ErrorBlock/ErrorBlock";
const CahrgeTable = ({ uid }) => {
  const navigate = useNavigate();
  const { token } = useContext(AppContext);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`, // Set authorization header
    },
  };

  const getChargeItem = () => {
    return axios.get(
      `https://clinic.telast.tech/api/v1/invoices/charge_items/?invoice=${uid}`,
      config
    );
  };
  const { data, isError, error, isLoading, refetch } = useQuery({
    queryKey: ["chargeItem"],
    queryFn: getChargeItem,
  });
  useEffect(() => {
    refetch();
  }, [uid]);

  if (data) {
    console.log("comming from tables", data);
  }
  const navigationFn = () => {
    navigate(`/addchargeitem/${uid}`);
  };
  if (isLoading) {
    return (
      <div className="center">
        <BounceLoader color="4874dc" size={150} />
      </div>
    );
  }
  if (isError) {
    return (
      <div className="center">
        <ErrorBlock title="Error" message={error.message} />
      </div>
    );
  }
  return (
    <div className="tableContainer">
      <TableHeader
        name="Charge Item"
        btnName="Add Charge Item"
        navigationfn={navigationFn}
      />
      {data && <BasicTable data={data?.data?.results} columns={ChargeCoulmn} />}
      {isError && <p>Error</p>}
    </div>
  );
};

export default CahrgeTable;
