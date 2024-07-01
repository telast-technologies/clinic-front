import React, { useContext } from "react";
import { Scheduler } from "@aldabil/react-scheduler";
// import { EVENTS } from "./events";
import classes from "./SchedulerPage.module.css";
import NavMenu from "../../Components/NavMenu/NavMenu";
import Navbar from "../../Components/Navbar/Navbar";
import { AppContext } from "../../shared/AppContext";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import ErrorBlock from "../../Components/ErrorBlock/ErrorBlock";
import BounceLoader from "react-spinners/BounceLoader";
import { da } from "date-fns/locale";
const SchedulerPage = () => {
  let EVENTS = [];
  const { token } = useContext(AppContext);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`, // Set authorization header
    },
  };
  const getScheduler = () => {
    return axios.get(
      "https://clinic.telast.tech/api/v1/visits/calendar/",
      config
    );
  };
  const { data, isError, error, isLoading, isSuccess } = useQuery({
    queryKey: ["getScheduler"],
    queryFn: getScheduler,
  });
  if (isSuccess) {
    let newData = data.data;
    let NewEvent = newData.map((data, i) => {
      return {
        event_id: data.uid,
        title: `Event ${i + 1}`,
        start: new Date(`${data?.date} ${data?.time}`),
        end: new Date(`${data?.date} 23:59`),
        color:
          data.status === "booked"
            ? "#125C71"
            : data.stauts === "checked_in"
            ? "#7351A3"
            : "#F17E25",
      };
    });
    EVENTS = NewEvent;
  }
  return (
    <>
      <NavMenu />
      <div className="main">
        <Navbar />

        <div className={classes.sch}>
          {data && <Scheduler events={EVENTS} disableViewer />}
        </div>
        {isError && (
          <div className="center">
            <ErrorBlock title="Error" message={error.message} />
          </div>
        )}
        {isLoading && (
          <div>
            <BounceLoader color="#4874dc" size={150} />
          </div>
        )}
        {data && (
          <div className={classes.schDetails}>
            <div className={classes.singleDetail}>
              <span className={classes.booked}></span>
              <p>booked</p>
            </div>
            <div className={classes.singleDetail}>
              <span className={classes.check_in}></span>
              <p>checked_in</p>
            </div>
            <div className={classes.singleDetail}>
              <span className={classes.cancel}></span>
              <p>cancelled</p>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default SchedulerPage;
