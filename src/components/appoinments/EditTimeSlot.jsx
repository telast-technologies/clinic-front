/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams, Link } from "react-router-dom";
import Header from "../Header";
import Sidebar from "../Sidebar";
import { TextField } from "@mui/material";
import Api from "../../_Utils/Api"; // Import the API function
import Select from 'react-select';
import { useLocation } from 'react-router-dom';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

// Days Enum
const daysEnum = [
  { value: "monday", label: "Monday" },
  { value: "tuesday", label: "Tuesday" },
  { value: "wednesday", label: "Wednesday" },
  { value: "thursday", label: "Thursday" },
  { value: "friday", label: "Friday" },
  { value: "saturday", label: "Saturday" },
  { value: "sunday", label: "Sunday" },
];

const EditTimeSlot = () => {
  const query = useQuery();
  const slotId = query.get('id');
  
  const [selectedDays, setSelectedDays] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  // Fetch the time slot data
  useEffect(() => {
    Api.get_single_visit_slot(slotId).then(res => {
      const timeSlot =  res.data
      setValue("startTime", timeSlot.start_time);
      setValue("endTime", timeSlot.end_time);
      const selectedDaysArray = daysEnum.filter(day => timeSlot.days.includes(day.value));
      setSelectedDays(selectedDaysArray);
      setSelectedOption(selectedDaysArray); // Pre-select days in Select component
    }).catch(error => {
      console.error("Error fetching time slot data", error);
    })

  }, [slotId, setValue]);


  const onSubmit = async (data) => {
    // Ensure start time is before end time
    if (data.startTime >= data.endTime) {
      alert("Start time must be before end time.");
      return;
    }

    const supplyData = {
      start_time: data.startTime,
      end_time: data.endTime,
      days: selectedDays.map(day => day.value), // Use selected days values
    };

    Api.edit_visit_slot(slotId, supplyData)
    .then((res) => {
      window.location.href = "/timeslot";
    })
    .catch((error) => {
      alert(error.response.data.message);
    });
  };

  return (
    <div>
      <Header />
      <Sidebar id="menu-item4" id1="menu-items4" activeClassName="EditTimeSlot" />
      <div className="page-wrapper">
        <div className="content">
          {/* Page Header */}
          <div className="page-header">
            <div className="row">
              <div className="col-sm-12">
                <ul className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to="/timeslot">Time Slot</Link>
                  </li>
                  <li className="breadcrumb-item">
                    <i className="feather-chevron-right">
                      {/* Feather icon */}
                    </i>
                  </li>
                  <li className="breadcrumb-item active">Edit Time</li>
                </ul>
              </div>
            </div>
          </div>

          {/* /Page Header */}
          <div className="row">
            <div className="col-sm-12">
              <div className="card">
                <div className="card-body">
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="row">
                      <div className="col-12">
                        <div className="form-heading">
                          <h4>Edit Time Slot</h4>
                        </div>
                      </div>

                      {/* Start Time */}
                      <div className="col-12 col-md-6 col-xl-4">
                        <div className="form-group local-forms">
                          <label>
                            From <span className="login-danger">*</span>
                          </label>
                          <TextField
                            className="form-control"
                            id="outlined-controlled"
                            type="time"
                            {...register("startTime", { required: true })}
                          />
                          {errors.startTime && <p className="text-danger">Start time is required</p>}
                        </div>
                      </div>

                      {/* End Time */}
                      <div className="col-12 col-md-6 col-xl-4">
                        <div className="form-group local-forms">
                          <label>
                            To <span className="login-danger">*</span>
                          </label>
                          <TextField
                            className="form-control"
                            id="outlined-controlled"
                            type="time"
                            {...register("endTime", { required: true })}
                          />
                          {errors.endTime && <p className="text-danger">End time is required</p>}
                        </div>
                      </div>

                      {/* Select Days */}
                      <div className="col-12 col-md-6 col-xl-6">
                        <div className="form-group local-forms">
                          <label>Select a day</label>
                          <Select
                            value={selectedOption} // Bind the selected option
                            onChange={(selectedOption) => {
                              setSelectedOption(selectedOption);
                              setSelectedDays(selectedOption);
                            }}
                            options={daysEnum} // Use the daysEnum array for options
                            isMulti // Allow multi-selection of days
                            menuPortalTarget={document.body}
                            id="select-day"
                            components={{
                              IndicatorSeparator: () => null,
                            }}
                            styles={{
                              control: (baseStyles, state) => ({
                                ...baseStyles,
                                borderColor: state.isFocused
                                  ? 'none'
                                  : '2px solid rgba(46, 55, 164, 0.1);',
                                boxShadow: state.isFocused ? '0 0 0 1px #2e37a4' : 'none',
                                '&:hover': {
                                  borderColor: state.isFocused
                                    ? 'none'
                                    : '2px solid rgba(46, 55, 164, 0.1)',
                                },
                                borderRadius: '10px',
                                fontSize: '14px',
                                minHeight: '45px',
                              }),
                              dropdownIndicator: (base, state) => ({
                                ...base,
                                transform: state.selectProps.menuIsOpen
                                  ? 'rotate(-180deg)'
                                  : 'rotate(0)',
                                transition: '250ms',
                                width: '35px',
                                height: '35px',
                              }),
                            }}
                          />
                        </div>
                      </div>

                      {/* Submit and Cancel Buttons */}
                      <div className="col-12">
                        <div className="doctor-submit text-end">
                          <button
                            type="submit"
                            className="btn btn-primary submit-form me-2"
                          >
                            Edit
                          </button>
                          <Link to="/timeslot" className="btn btn-primary cancel-form">
                            Cancel
                          </Link>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditTimeSlot;
