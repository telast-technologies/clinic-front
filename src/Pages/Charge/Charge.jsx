import React, { useContext, useEffect, useState } from "react";
import NavMenu from "../../Components/NavMenu/NavMenu";
import Navbar from "../../Components/Navbar/Navbar";
import classes from "./Charge.module.css";
import { AppContext } from "../../shared/AppContext";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Invoice from "../Invoice/Invoice";
import InvoiceInfo from "../../Components/InvoiceInfo/InvoiceInfo";
import CahrgeTable from "../../Components/ChargeItemTaple/CahrgeTable";
import ChargeService from "../../Components/ChargeService/ChargeService";
import { useNavigate } from "react-router";
const Charge = () => {
  const [uid, setUid] = useState();
  const { token } = useContext(AppContext);
  const navigate = useNavigate();
  const config = {
    headers: {
      Authorization: `Bearer ${token}`, // Set authorization header
    },
  };
  const getInvoice = () => {
    return axios.get(
      `https://clinic.telast.tech/api/v1/invoices/invoice_select/`,
      config
    );
  };
  const { data, isLoading, error, isError, refetch } = useQuery({
    queryKey: ["getInvoice"],
    queryFn: getInvoice,
  });
  if (data) {
    console.log("comming from charge", data?.data?.results);
  }
  useEffect(() => {
    if (data) {
      setUid(data?.data?.results[0]?.value);
    }
  }, [data]);
  return (
    <>
      <NavMenu />
      <div className="main">
        <Navbar />
        <div className={classes.chargeAction}>
          <button onClick={() => navigate(`/updateCharge/${uid}`)}>
            Pay Now
          </button>
          {data && (
            <select
              onChange={(e) => {
                setUid(e.target.value);
              }}
            >
              {data?.data?.results.map((res) => (
                <option key={res?.value} value={res?.value}>
                  {res?.value}
                </option>
              ))}
            </select>
          )}
        </div>
        <InvoiceInfo uid={uid} />
        <CahrgeTable uid={uid} />
        <ChargeService uid={uid} />
      </div>
    </>
  );
};

export default Charge;
