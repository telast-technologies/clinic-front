import React, { useContext, useEffect, useState } from "react";
import classes from "./AddVisitForm.module.css";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { AppContext } from "../../shared/AppContext";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import DatePicker from "react-date-picker";
import ErrorBlock from "../ErrorBlock/ErrorBlock";
import PulseLoader from "react-spinners/PulseLoader";
import { useNavigate, useNavigation } from "react-router";
function isoDateToCustomFormat(isoDateString) {
  const date = new Date(isoDateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Add leading zero for single-digit months
  const day = String(date.getDate()).padStart(2, "0"); // Add leading zero for single-digit days

  return `${year}-${month}-${day}`;
}
function convertTime(timeString) {
  // Check if the input string is in valid format (HH:MM:SS)
  let match = timeString.split(":");

  const hours = parseInt(match[0]);
  const minutes = parseInt(match[1]);
  const seconds = parseInt(match[2]);

  // Convert to 12-hour format with AM/PM indicator
  let convertedHours = hours % 12;
  if (convertedHours === 0) {
    convertedHours = 12; // Handle midnight as 12:00AM
  }
  const amPm = hours < 12 ? "AM" : "PM";

  return `${convertedHours}:${minutes.toString().padStart(2, "0")} ${amPm}`;
}
const now = new Date();

const year = now.getFullYear();
const month = now.getMonth() + 1;
const day = now.getDate();
const hours = now.getHours();
const minutes = now.getMinutes();
const seconds = now.getSeconds();
const milliseconds = now.getMilliseconds();
const AddVisitForm = ({ paient }) => {
  const { token } = useContext(AppContext);
  const [dates, setDate] = useState([]);
  const [times, setTimes] = useState([]);
  const [timeVal, setTimeVal] = useState();
  const [type, setType] = useState("scheduled");
  const [datenew, setDateNew] = useState();
  const [paientVal, setPaientVal] = useState();
  const [disabledCal, setDisableCal] = useState(true);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`, // Set authorization header
    },
  };
  const AddApoient = (data) => {
    axios.post("https://clinic.telast.tech/api/v1/visits/visit/", data, config);
  };
  const paientChange = (event) => {
    setPaientVal(event.target.value);
    axios
      .get(
        `https://clinic.telast.tech/api/v1/visits/slot/date/available/${event.target.value}`,
        config
      )
      .then((data) => {
        setDate(data?.data?.dates);
        setDisableCal(false);
      })
      .catch((err) => console.log(err));
  };
  const timeChange = (event) => {
    axios
      .get(
        `https://clinic.telast.tech/api/v1/visits/slot/time/available/${event}`,
        config
      )
      .then((data) => {
        // console.log(data?.data?.slots);
        setTimes(data?.data?.slots);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const changeDate = (value) => {
    setDateNew(value);
    console.log(isoDateToCustomFormat(value));
    timeChange(isoDateToCustomFormat(value));
  };
  const Form = useForm();
  const {
    mutate,
    isPending,
    isError,
    error,
    data: CommingData,
    isSuccess,
  } = useMutation({
    mutationFn: AddApoient,
  });
  const { register, handleSubmit, formState } = Form;
  const SumbitForm = (e) => {
    let FormData = {
      date: isoDateToCustomFormat(datenew),
      time: timeVal,
      visit_type: type,

      patient: paientVal,
    };
    console.log(FormData);
    if (type === "walk_in") {
      FormData = {
        visit_type: type,
        patient: paientVal,
        date: `${year}-${month.toString().padStart(2, "0")}-${day
          .toString()
          .padStart(2, "0")}`,
        time: `${hours.toString().padStart(2, "0")}:${minutes
          .toString()
          .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`,
      };
    }
    mutate(FormData);
    e.preventDefault();
  };

  const navigate = useNavigate();
  useEffect(() => {
    if (isSuccess) {
      toast.success("added Success");
    }
  }, [isSuccess]);

  return (
    <div className={classes.cardFormPaient}>
      <h2>Appointment</h2>
      <form>
        <div className={classes.appointmentLayout}>
          <div className={classes.leftSide}>
            <div className={classes.formAction}>
              <label>
                Select Type <span className={classes.span}>*</span>
              </label>
              <select
                {...register("type", { required: "type is reaquired" })}
                onChange={(e) => {
                  setType(e.target.value);
                }}
              >
                <option>scheduled</option>
                <option>walk_in</option>
              </select>
            </div>
            <div className={classes.formAction}>
              <label>
                Select Patient <span className={classes.span}>*</span>
              </label>
              <select
                {...register("patient", { required: "patient is reaquired" })}
                onChange={paientChange}
              >
                <option>Select Paient</option>
                {paient.map((item) => (
                  <>
                    <option value={item.uid}>
                      {item.first_name} {item.last_name}
                    </option>
                  </>
                ))}
              </select>
            </div>
            <div className={classes.formAction}>
              <label>
                Appointment Date <span className={classes.span}>*</span>
              </label>
              <DatePicker
                value={datenew}
                onChange={changeDate}
                minDate={new Date(dates[0])}
                className={classes.datePicker}
                disabled={disabledCal}
                // required={true}
                maxDate={new Date(dates[dates.length - 1])}
              />
            </div>
          </div>
          <div className={classes.rightSide}>
            <label>
              Appointment Time <span className={classes.span}>*</span>
            </label>
            <div className={classes.time}>
              {times.map((time) => (
                <span
                  className={time === timeVal ? classes.active : ""}
                  onClick={() => {
                    setTimeVal(time);
                  }}
                >
                  {convertTime(time)}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className={classes.action}>
          {!isPending && (
            <div className={classes.action}>
              <button type="submit" className="mainBtton" onClick={SumbitForm}>
                Save
              </button>
              <button
                onClick={() => {
                  navigate("/viewvisit");
                }}
                className="mainBtton"
              >
                Back
              </button>
            </div>
          )}
          <PulseLoader color="#4874dc" size={18} loading={isPending} />
        </div>
        {isError && <ErrorBlock title="error" message={error.message} />}
      </form>
    </div>
  );
};

export default AddVisitForm;
