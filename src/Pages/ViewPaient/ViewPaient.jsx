import React, { useContext } from "react";

import NavMenu from "../../Components/NavMenu/NavMenu";
import Navbar from "../../Components/Navbar/Navbar";
import BasicTable from "../../Components/PaientTable/BasicTable";
import axios from "axios";
import { AppContext } from "../../shared/AppContext";
import { useQuery } from "@tanstack/react-query";
import AddLogo from "../../Components/Logos/AddLogo";
import { useNavigate } from "react-router";
import TableHeader from "../../Components/TableHeader/TableHeader";
import { COLUMNS } from "../../Components/PaientTable/columns";
import BounceLoader from "react-spinners/BounceLoader";
import ErrorBlock from "../../Components/ErrorBlock/ErrorBlock";
const ViewPaient = () => {
  const { token } = useContext(AppContext);
  const navigate = useNavigate();
  const getPaientData = () => {
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
  const { data, isLoading, isError, error, refetch, isSuccess } = useQuery({
    queryKey: ["getData"],
    queryFn: getPaientData,
  });
  if (data) {
    console.log(data);
  }
  const navigationfn = () => {
    navigate("/addpaient");
  };

  return (
    <div>
      <NavMenu />
      <div className="main">
        <Navbar />
        <div className="tableContainer">
          {data && (
            <TableHeader
              name="Paients List"
              navigationfn={navigationfn}
              btnName="Add Paient"
            />
          )}
          {data && <BasicTable data={data?.data?.results} columns={COLUMNS} />}
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
    </div>
  );
};

export default ViewPaient;
