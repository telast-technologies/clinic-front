import React, { useContext } from "react";
import NavMenu from "../../Components/NavMenu/NavMenu";
import Navbar from "../../Components/Navbar/Navbar";
import TableHeader from "../../Components/TableHeader/TableHeader";
import { AppContext } from "../../shared/AppContext";
import axios from "axios";
import { useQueries, useQuery } from "@tanstack/react-query";
import BasicTable from "../../Components/PaientTable/BasicTable";
import { TimeCoulmn } from "./Timecoulmns";
import { useNavigate } from "react-router";
import BounceLoader from "react-spinners/BounceLoader";
import ErrorBlock from "../../Components/ErrorBlock/ErrorBlock";

const Timeslot = () => {
  const { token } = useContext(AppContext);
  const getTime = () => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`, // Set authorization header
      },
    };
    return axios.get("https://clinic.telast.tech/api/v1/visits/slot/", config);
  };
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["getTimeSlot"],
    queryFn: getTime,
    staleTime: 500,
    gcTime: 100,
  });
  const navigate = useNavigate();
  const navigationfn = () => {
    navigate("/addtimeslot");
  };
  return (
    <>
      <NavMenu />
      <div className="main">
        <Navbar />
        <div className="tableContainer">
          {data && (
            <TableHeader
              name="Doctor Session"
              navigationfn={navigationfn}
              btnName="Add Doctor Session"
            />
          )}
          {data && (
            <BasicTable data={data?.data?.results} columns={TimeCoulmn} />
          )}
          {isLoading && (
            <div className="center">
              <BounceLoader color="#4874dc" size={150} />
            </div>
          )}
          {isError && (
            <div className="center">
              <ErrorBlock title="Error" message={error.message} />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Timeslot;
