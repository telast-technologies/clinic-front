import React from "react";
import { useNavigate, useParams } from "react-router";
import NavMenu from "../../Components/NavMenu/NavMenu";
import Navbar from "../../Components/Navbar/Navbar";
import InvoiceInfo from "../../Components/InvoiceInfo/InvoiceInfo";
import CahrgeTable from "../../Components/ChargeItemTaple/CahrgeTable";
import ChargeService from "../../Components/ChargeService/ChargeService";
import classes from "./Invoice.module.css";
const Invoice = () => {
  const { value } = useParams();
  const navigate = useNavigate();
  return (
    <>
      <NavMenu />
      <div className="main">
        <Navbar />
        <div className={classes.chargeAction}>
          <button onClick={() => navigate(`/updateCharge/${value}`)}>
            {" "}
            Pay Now
          </button>
        </div>
        <InvoiceInfo uid={value} />
        <CahrgeTable uid={value} />
        <ChargeService uid={value} />
      </div>
    </>
  );
};

export default Invoice;
