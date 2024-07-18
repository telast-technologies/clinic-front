import React, { useContext, useEffect, useState } from "react";
import classes from "./AddTimeForm.module.css";
import { useForm } from "react-hook-form";
import { AppContext } from "../../shared/AppContext";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import PulseLoader from "react-spinners/PulseLoader";
import ErrorBlock from "../ErrorBlock/ErrorBlock";
const AddTimeForm = ({ setAdd, refetch }) => {
  const { token } = useContext(AppContext);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`, // Set authorization header
    },
  };
  function AddTimeSlot(data) {
    return axios.post(
      "https://clinic.telast.tech/api/v1/visits/slot/",
      data,
      config
    );
  }
  const days = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
  ];
  const { mutate, data, isError, isPending, error } = useMutation({
    mutationFn: AddTimeSlot,
  });
  const [day, setDay] = useState([]);
  const navigate = useNavigate();
  const handleChange = (event) => {
    if (event.target.value === "all") {
      if (event.target.checked) {
        setEnable(true);
        setDay(days);
      } else {
        setDay([]);
        setEnable(null);
      }
      return;
    }
    if (event.target.value === "SUN") {
      if (event.target.checked) {
        setDay((prevStatte) => [...prevStatte, "sunday"]);
      } else {
        const newArray = day.filter((item) => item !== "sunday");

        setDay(newArray);
      }
    }
    if (event.target.value === "Mon") {
      if (event.target.checked) {
        setDay((prevStatte) => [...prevStatte, "monday"]);
      } else {
        const newArray = day.filter((item) => item !== "monday");

        setDay(newArray);
      }
    }
    if (event.target.value === "Tue") {
      if (event.target.checked) {
        setDay((prevStatte) => [...prevStatte, "tuesday"]);
      } else {
        const newArray = day.filter((item) => item !== "tuesday");

        setDay(newArray);
      }
    }
    if (event.target.value === "Wed") {
      if (event.target.checked) {
        setDay((prevStatte) => [...prevStatte, "wednesday"]);
      } else {
        const newArray = day.filter((item) => item !== "wednesday");

        setDay(newArray);
      }
    }
    if (event.target.value === "Thr") {
      if (event.target.checked) {
        setDay((prevStatte) => [...prevStatte, "thursday"]);
      } else {
        const newArray = day.filter((item) => item !== "thursday");

        setDay(newArray);
      }
    }
    if (event.target.value === "Fri") {
      if (event.target.checked) {
        setDay((prevStatte) => [...prevStatte, "friday"]);
      } else {
        const newArray = day.filter((item) => item !== "friday");

        setDay(newArray);
      }
    }
    if (event.target.value === "Sat") {
      if (event.target.checked) {
        setDay((prevStatte) => [...prevStatte, "saturday"]);
      } else {
        const newArray = day.filter((item) => item !== "saturday");

        setDay(newArray);
      }
    }
  };

  const [enable, setEnable] = useState(null);
  const Form = useForm();
  const { register, handleSubmit, formState } = Form;
  const { errors } = formState;
  const SubmitForm = (data) => {
    const dataSending = {
      start_time: data.StartTime,
      end_time: data.endtime,
      days: day,
    };
    console.log(dataSending);
    mutate(dataSending);
  };
  useEffect(() => {
    if (data) {
      toast.success("Doctor Sesstion Add Success");
      setAdd(false);
      refetch();
    }
  }, [data]);
  return (
    <>
      <div className={classes.cardFormPatient}>
        <h2>Basic information</h2>
        <form onSubmit={handleSubmit(SubmitForm)}>
          <div className={classes.formPatient}>
            <div className={classes.formAction}>
              <label htmlFor="start time">
                Start Time <span>*</span>
              </label>
              <input
                type="time"
                placeholder="Start Time"
                id="starttime"
                {...register("StartTime", {
                  required: "StartTime is required",
                })}
              />
            </div>
            <div className={classes.formAction}>
              <label htmlFor="end time">
                End Time <span>*</span>
              </label>
              <input
                type="time"
                placeholder="End Time"
                id="endtime"
                {...register("endtime", {
                  required: "endTime is required",
                })}
              />
            </div>
          </div>
        </form>
        <div className={classes.checkBox}>
          <div className={classes.checkAction}>
            <input value="all" type="checkbox" onChange={handleChange} />
            <span>All</span>
          </div>
          <div className={classes.checkAction}>
            <input
              type="checkbox"
              value="SUN"
              onChange={handleChange}
              checked={enable}
            />
            <span>Sun</span>
          </div>
          <div className={classes.checkAction}>
            <input
              type="checkbox"
              value="Mon"
              onChange={handleChange}
              checked={enable}
            />
            <span>Mon</span>
          </div>
          <div className={classes.checkAction}>
            <input
              type="checkbox"
              value="Tue"
              onChange={handleChange}
              checked={enable}
            />
            <span>Tue</span>
          </div>
          <div className={classes.checkAction}>
            <input
              type="checkbox"
              value="Wed"
              onChange={handleChange}
              checked={enable}
            />
            <span>Wed</span>
          </div>
          <div className={classes.checkAction}>
            <input
              type="checkbox"
              value="Thr"
              onChange={handleChange}
              checked={enable}
            />
            <span>Thr</span>
          </div>
          <div className={classes.checkAction}>
            <input
              type="checkbox"
              value="Fri"
              onChange={handleChange}
              checked={enable}
            />
            <span>Fri</span>
          </div>
          <div className={classes.checkAction}>
            <input
              type="checkbox"
              value="Sat"
              onChange={handleChange}
              checked={enable}
            />
            <span>Sat</span>
          </div>
        </div>
        {isError && (
          <ErrorBlock title="Error" message={error.response.data.message} />
        )}
        <div className={classes.action}>
          <PulseLoader color="#4874dc" size={18} loading={isPending} />
          {!isPending && (
            <>
              <button
                type="submit"
                className="mainBtton"
                onClick={handleSubmit(SubmitForm)}
              >
                Save
              </button>
              <button
                className="mainBtton"
                onClick={() => {
                  setAdd(false);
                }}
              >
                Back
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
};
export default AddTimeForm;
