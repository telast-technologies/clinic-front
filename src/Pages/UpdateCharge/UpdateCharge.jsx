import React, { useContext } from "react";
import NavMenu from "../../Components/NavMenu/NavMenu";
import Navbar from "../../Components/Navbar/Navbar";
import UpdateChargeForm from "../../Components/UpdateChargeForm/UpdateChargeForm";
import { useParams } from "react-router";
import { AppContext } from "../../shared/AppContext";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "@tanstack/react-query";

const UpdateCharge = () => {
  const { uid } = useParams();
  const { token } = useContext(AppContext);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`, // Set authorization header
    },
  };
  const getInvoiceInfo = () => {
    return axios.get(
      `https://clinic.telast.tech/api/v1/invoices/invoice/${uid}`,
      config
    );
  };
  const { data, isError, error, isLoading, refetch } = useQuery({
    queryKey: ["getinvoiceInfo"],
    queryFn: getInvoiceInfo,
  });
  return (
    <>
      <NavMenu />
      <div className="main">
        <Navbar />
        {data && <UpdateChargeForm data={data} />}
      </div>
    </>
  );
};

export default UpdateCharge;
