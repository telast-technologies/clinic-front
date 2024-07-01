import React from "react";
import { useParams } from "react-router";
import NavMenu from "../../Components/NavMenu/NavMenu";
import Navbar from "../../Components/Navbar/Navbar";
import InvoiceInfo from "../../Components/InvoiceInfo/InvoiceInfo";
import CahrgeTable from "../../Components/ChargeItemTaple/CahrgeTable";
import ChargeService from "../../Components/ChargeService/ChargeService";

const Invoice = () => {
  const { value } = useParams();

  return (
    <>
      <NavMenu />
      <div className="main">
        <Navbar />
        <InvoiceInfo uid={value} />
        <CahrgeTable uid={value} />
        <ChargeService uid={value} />
      </div>
    </>
  );
};

export default Invoice;
