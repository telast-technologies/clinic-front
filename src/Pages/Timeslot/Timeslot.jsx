import React, { useContext, useState } from "react";
import NavMenu from "../../Components/NavMenu/NavMenu";
import Navbar from "../../Components/Navbar/Navbar";
import TableHeader from "../../Components/TableHeader/TableHeader";
import { AppContext } from "../../shared/AppContext";
import axios from "axios";
import { useQueries, useQuery } from "@tanstack/react-query";
import BasicTable from "../../Components/PatientTable/BasicTable";
import { TimeCoulmn } from "./Timecoulmns";
import { useNavigate } from "react-router";
import BounceLoader from "react-spinners/BounceLoader";
import ErrorBlock from "../../Components/ErrorBlock/ErrorBlock";
import AddTimeForm from "../../Components/AddTimeForm/AddTimeForm";

const Timeslot = () => {
  const { token } = useContext(AppContext);
  const [add, setAdd] = useState(false);
  const getTime = () => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`, // Set authorization header
      },
    };
    return axios.get("https://clinic.telast.tech/api/v1/visits/slot/", config);
  };
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["getTimeSlot"],
    queryFn: getTime,
    staleTime: 500,
    gcTime: 100,
  });
  const navigate = useNavigate();
  const navigationfn = () => {
    // navigate("/addtimeslot");
    setAdd(!add);
  };
  const navigationClaender = () => {
    navigate("/schedulerslots");
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
              addMode={!add}
              showCalender={true}
              navigationClaender={navigationClaender}
            />
          )}
          {add && <AddTimeForm setAdd={setAdd} refetch={refetch} />}
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
              <ErrorBlock title="Error" message={error.response.data.message} />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Timeslot;
