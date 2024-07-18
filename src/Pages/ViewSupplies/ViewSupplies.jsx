import React, { useContext, useEffect, useState } from "react";
import classes from "./ViewSupplies.module.css";
import NavMenu from "../../Components/NavMenu/NavMenu";
import Navbar from "../../Components/Navbar/Navbar";
import { useNavigate } from "react-router";
import TableHeader from "../../Components/TableHeader/TableHeader";
import { AppContext } from "../../shared/AppContext";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Supcoulmns } from "./Supcoulmns";
import BasicTable from "../../Components/PatientTable/BasicTable";
import BounceLoader from "react-spinners/BounceLoader";
import ErrorBlock from "../../Components/ErrorBlock/ErrorBlock";
import AddSupForm from "../../Components/AddSupForm/AddSupForm";
const ViewSupplies = () => {
  const { token } = useContext(AppContext);
  const [add, setAdd] = useState(false);
  const getsupplies = () => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`, // Set authorization header
      },
    };
    return axios.get(
      "https://clinic.telast.tech/api/v1/inventory/supply/",
      config
    );
  };
  const { data, isError, error, isLoading, refetch } = useQuery({
    queryKey: ["getSupplie"],
    queryFn: getsupplies,
    staleTime: 500,
    gcTime: 100,
  });
  const navigate = useNavigate();
  const navigationfn = () => {
    setAdd(!add);
  };

  return (
    <div>
      <NavMenu />
      <div className="main">
        <Navbar />
        <div className="tableContainer">
          {data && (
            <TableHeader
              name="Supplies List"
              navigationfn={navigationfn}
              btnName="Add Supplie"
              addMode={!add}
            />
          )}
          {add && <AddSupForm setAdd={setAdd} refetch={refetch} />}

          {data && (
            <BasicTable data={data?.data?.results} columns={Supcoulmns} />
          )}
          {isLoading && (
            <div className="center">
              <BounceLoader color="#4874dc" size={150} />
            </div>
          )}
          {isError && (
            <div className="center">
              <ErrorBlock title="Error" message={error.response.data.message} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewSupplies;
