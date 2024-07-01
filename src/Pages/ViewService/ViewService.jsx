import React, { useContext } from "react";
import NavMenu from "../../Components/NavMenu/NavMenu";
import Navbar from "../../Components/Navbar/Navbar";
import TableHeader from "../../Components/TableHeader/TableHeader";
import { AppContext } from "../../shared/AppContext";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { da } from "date-fns/locale";
import BasicTable from "../../Components/PaientTable/BasicTable";
import { ServiceCoulmn } from "./Servicecoulmns";
import { useNavigate } from "react-router";
import BounceLoader from "react-spinners/BounceLoader";
import ErrorBlock from "../../Components/ErrorBlock/ErrorBlock";

const ViewService = () => {
  const { token } = useContext(AppContext);
  const getService = () => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`, // Set authorization header
      },
    };
    return axios.get(
      "https://clinic.telast.tech/api/v1/healthcare/service/",
      config
    );
  };
  const { data, isError, error, isLoading, refetch } = useQuery({
    queryKey: ["getServices"],
    queryFn: getService,
    staleTime: 500,
    gcTime: 100,
  });
  if (data) {
  }
  const navigate = useNavigate();
  const navigationfn = () => {
    navigate("/addservices");
  };
  return (
    <>
      <NavMenu />
      <div className="main">
        <Navbar />
        <div className="tableContainer">
          {data && (
            <TableHeader
              name="Service List"
              navigationfn={navigationfn}
              btnName="Add Service"
            />
          )}
          {data && (
            <BasicTable data={data?.data?.results} columns={ServiceCoulmn} />
          )}
        </div>
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
    </>
  );
};

export default ViewService;
