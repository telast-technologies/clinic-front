import React, { useContext, useEffect } from "react";
import classes from "./InvoiceInfo.module.css";
import { AppContext } from "../../shared/AppContext";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import BounceLoader from "react-spinners/BounceLoader";
import ErrorBlock from "../ErrorBlock/ErrorBlock";
const InvoiceInfo = ({ uid }) => {
  const { token } = useContext(AppContext);
  console.log(console.log(uid));
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
  useEffect(() => {
    refetch();
  }, [uid]);
  if (isLoading) {
    return (
      <div className="center">
        <BounceLoader color="#4874dc" size={150} />
      </div>
    );
  }
  if (isError) {
    return (
      <div className="center">
        <ErrorBlock title="Error" message={error.message} />
      </div>
    );
  }

  console.log(data);

  return (
    <div className={classes.layout}>
      <h2> Invoice Information </h2>
      <section className={classes.infoLayout}>
        <div className={classes.infoItem}>
          <p>balance</p>
          <span>{data.data?.balance}</span>
        </div>
        <div className={classes.infoItem}>
          <p>total</p>
          <span>{data.data?.total}</span>
        </div>
        <div className={classes.infoItem}>
          <p>created At</p>
          <span>{data.data?.created_at.split("T")[0]}</span>
        </div>
        <div className={classes.infoItem}>
          <p>tax</p>
          <span>{data.data?.tax}</span>
        </div>
        <div className={classes.infoItem}>
          <p>discount</p>
          <span>{data.data?.discount}</span>
        </div>
        <div className={classes.infoItem}>
          <p>sub_total</p>
          <span>{data.data?.sub_total}</span>
        </div>
        <div className={classes.infoItem}>
          <p>visit</p>
          <span>{data.data?.visit}</span>
        </div>
      </section>
    </div>
  );
};

export default InvoiceInfo;
