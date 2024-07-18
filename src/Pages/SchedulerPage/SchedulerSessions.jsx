import React, { useContext } from "react";
import { Scheduler } from "@aldabil/react-scheduler";
import classes from "./SchedulerPage.module.css";
import NavMenu from "../../Components/NavMenu/NavMenu";
import Navbar from "../../Components/Navbar/Navbar";
import { AppContext } from "../../shared/AppContext";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import ErrorBlock from "../../Components/ErrorBlock/ErrorBlock";
import BounceLoader from "react-spinners/BounceLoader";

const getCurrentWeekDates = () => {
  const current = new Date();
  const week = [];

  // Starting from Sunday
  current.setDate(current.getDate() - current.getDay());

  for (let i = 0; i < 7; i++) {
    week.push(new Date(current));
    current.setDate(current.getDate() + 1);
  }

  return week;
};

const getDayIndex = (day) => {
  switch (day.toLowerCase()) {
    case "sunday":
      return 0;
    case "monday":
      return 1;
    case "tuesday":
      return 2;
    case "wednesday":
      return 3;
    case "thursday":
      return 4;
    case "friday":
      return 5;
    case "saturday":
      return 6;
    default:
      return -1;
  }
};

const transformData = (data) => {
  const currentWeekDates = getCurrentWeekDates();
  const events = [];

  data.results.forEach((item) => {
    item.days.forEach((day) => {
      const dayIndex = getDayIndex(day);
      if (dayIndex !== -1) {
        const date = currentWeekDates[dayIndex];
        const start = new Date(
          `${date.toISOString().split("T")[0]}T${item.start_time}`
        );
        const end = new Date(
          `${date.toISOString().split("T")[0]}T${item.end_time}`
        );
        events.push({
          event_id: item.id,
          title: `Schedule ${item.id}`,
          start: start,
          end: end,
        });
      }
    });
  });

  return events;
};

const SchedulerSlots = () => {
  const { token } = useContext(AppContext);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`, // Set authorization header
    },
  };

  const getScheduler = () => {
    return axios.get("https://clinic.telast.tech/api/v1/visits/slot/", config);
  };

  const { data, isError, error, isLoading, isSuccess } = useQuery({
    queryKey: ["getScheduler"],
    queryFn: getScheduler,
  });

  let EVENTS = [];
  if (isSuccess) {
    EVENTS = transformData(data.data);
  }

  return (
    <>
      <NavMenu />
      <div className="main">
        <Navbar />

        <div className={classes.sch}>
          {data && <Scheduler view="week" events={EVENTS} disableViewer />}
        </div>
        {isError && (
          <div className="center">
            <ErrorBlock title="Error" message={error.response.data.message} />
          </div>
        )}
        {isLoading && (
          <div>
            <BounceLoader color="#4874dc" size={150} />
          </div>
        )}
      </div>
    </>
  );
};

export default SchedulerSlots;
