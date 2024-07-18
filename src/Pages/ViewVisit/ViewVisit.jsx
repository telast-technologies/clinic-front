import React, { useContext, useEffect, useState } from "react";
import NavMenu from "../../Components/NavMenu/NavMenu";
import Navbar from "../../Components/Navbar/Navbar";
import TableHeader from "../../Components/TableHeader/TableHeader";
import { useNavigate } from "react-router";
import { AppContext } from "../../shared/AppContext";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import BasicTable from "../../Components/PatientTable/BasicTable";
import { ServiceCoulmn } from "./Visitcoulmns";
import BounceLoader from "react-spinners/BounceLoader";
import ErrorBlock from "../../Components/ErrorBlock/ErrorBlock";
import AddVisitForm from "../../Components/AddVisitForm/AddVisitForm";
import styles from "./Visitcoulmns.module.css";
const visitTypes = [
  { type: "all", label: "All" },
  { type: "upcoming", label: "Coming" },
  { type: "past", label: "Past" },
];
const ViewVisit = () => {
  const navigate = useNavigate();
  const navigationfn = () => {
    // navigate("/addvisit");
    setAdd(!add);
  };
  const { token } = useContext(AppContext);
  const [visitType, setVisitType] = useState("upcoming");
  const [add, setAdd] = useState(false);
  const getApoientMentData = () => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`, // Set authorization header
      },
    };
    return axios.get(
      `https://clinic.telast.tech/api/v1/visits/visit/?time=${visitType}`,
      config
    );
  };
  const getPatient = () => {
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
  const { data: patients } = useQuery({
    queryKey: ["getPatient"],
    queryFn: getPatient,
  });
  const { data, isError, error, isLoading, refetch, isSuccess } = useQuery({
    queryKey: ["getAppo"],
    queryFn: getApoientMentData,
    // refetchInterval: 5000,
  });
  if (data) {
  }
  useEffect(() => {
    refetch();
    console.log(data);
  }, [visitType]);
  const navigationClaender = () => {
    navigate("/scheduler");
  };
  return (
    <>
      <NavMenu />
      <div className="main">
        <Navbar />
        <div className="tableContainer">
          {data && (
            <TableHeader
              name="Apoinetment"
              navigationfn={navigationfn}
              btnName="Add Apoinetment"
              showCalender={true}
              navigationClaender={navigationClaender}
              addMode={!add}
            />
          )}
          {add && patients && (
            <AddVisitForm
              setAdd={setAdd}
              refetch={refetch}
              patient={patients?.data?.results}
            />
          )}
          {data && (
            <div className="visitBtn ">
              {visitTypes.map((item) => (
                <button
                  key={item.type}
                  className={`${visitType === item.type ? styles.active : ""}`}
                  onClick={() => setVisitType(item.type)}
                >
                  {item.label}
                </button>
              ))}
            </div>
          )}
          {data && (
            <BasicTable data={data?.data?.results} columns={ServiceCoulmn} />
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

export default ViewVisit;
