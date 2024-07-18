import React, { useContext, useEffect, useState } from "react";
import classes from "./AddPatientForm.module.css";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { AppContext } from "../../shared/AppContext";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";
import PulseLoader from "react-spinners/PulseLoader";
import ErrorBlock from "../ErrorBlock/ErrorBlock";

const AddPatientForm = ({ setAddPatient, refetch, patient }) => {
  const { token } = useContext(AppContext);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const addPatient = (data) => {
    return axios.post(
      "https://clinic.telast.tech/api/v1/patients/patient/",
      data,
      config
    );
  };

  const [value, setValue] = useState();

  const form = useForm({
    defaultValues: patient,
  });
  const { register, handleSubmit, formState } = form;
  const { errors } = formState;

  const { mutate, data, isError, isLoading, error } = useMutation({
    mutationFn: addPatient,
    onSuccess: () => {
      toast.success("Patient added successfully");
      refetch(); // Refetch patient data after a successful mutation
      setAddPatient(false);
    },
  });

  const submitForm = (data) => {
    const sendingData = {
      first_name: data.firstname,
      last_name: data.lastname,
      email: data.email,
      phone: value,
      birthdate: data.birthday,
      address: data.address,
      channel: data.channel,
      nid: data.nid,
    };

    mutate(sendingData);
  };

  return (
    <div className={classes.cardFormPatient}>
      <h2>Basic information</h2>
      <form onSubmit={handleSubmit(submitForm)}>
        <div className={classes.formPatient}>
          <div className={classes.formAction}>
            <label htmlFor="firstname">
              First Name <span>*</span>
            </label>
            <input
              type="text"
              placeholder="Ahmed"
              id="firstname"
              {...register("firstname", {
                required: "First name is required",
              })}
            />
            {errors.firstname && <p>{errors.firstname.message}</p>}
          </div>
          <div className={classes.formAction}>
            <label htmlFor="lastname">
              Last Name <span>*</span>
            </label>
            <input
              type="text"
              placeholder="Hany"
              id="lastname"
              {...register("lastname", {
                required: "Last name is required",
              })}
            />
            {errors.lastname && <p>{errors.lastname.message}</p>}
          </div>
          <div className={classes.formAction}>
            <label htmlFor="email">
              Email <span>*</span>
            </label>
            <input
              type="text"
              placeholder="ahmed@gmail.com"
              id="email"
              {...register("email", {
                required: "Email is required",
              })}
            />
            {errors.email && <p>{errors.email.message}</p>}
          </div>
          <div className={classes.formAction}>
            <label htmlFor="birthday">
              Birth Date <span>*</span>
            </label>
            <input
              type="date"
              id="birthday"
              max="2024-06-24"
              {...register("birthday", {
                required: "Birth date is required",
              })}
            />
            {errors.birthday && <p>{errors.birthday.message}</p>}
          </div>
          <div className={classes.formAction}>
            <label htmlFor="phone">
              Phone Number <span>*</span>
            </label>
            <PhoneInput
              defaultCountry="EG"
              placeholder="Enter phone number"
              value={value}
              onChange={setValue}
            />
          </div>

          <div className={classes.formAction}>
            <label htmlFor="nid">
              National ID/Passport <span>*</span>
            </label>
            <input
              type="text"
              placeholder="1234567890"
              id="nid"
              {...register("nid", {
                required: "National ID is required",
                minLength: {
                  value: 1,
                  message: "National ID must be at least 1 character long",
                },
                maxLength: {
                  value: 100,
                  message: "National ID must be at most 100 characters long",
                },
              })}
            />
            {errors.nid && <p>{errors.nid.message}</p>}
          </div>
        </div>
        <hr />
        <div className={classes.formAction}>
          <h2>Contact Information</h2>
          <div className={classes.formAction}>
            <label htmlFor="channel">
              Channel <span>*</span>
            </label>
            <select
              id="channel"
              {...register("channel", {
                required: "Channel is required",
              })}
            >
              <option value="">Select a channel</option>
              <option value="facebook">Facebook</option>
              <option value="telegram">Telegram</option>
              <option value="whatsapp">Whatsapp</option>
              <option value="sms">SMS</option>
              <option value="email">Email</option>
              <option value="other">Other</option>
            </select>
            {errors.channel && <p>{errors.channel.message}</p>}
          </div>
          <label htmlFor="address">
            Address <span>*</span>
          </label>
          <textarea
            id="address"
            {...register("address", {
              required: "Address is required",
            })}
          ></textarea>
          {errors.address && <p>{errors.address.message}</p>}
          {isError && (
            <ErrorBlock title="Error" message={error.response.data.message} />
          )}
        </div>
        <div className={classes.action}>
          {/* <PulseLoader color="#4874dc" size={18} loading={isLoading} /> */}
          {!isLoading && (
            <>
              <button type="submit" className="mainBtton">
                Save
              </button>
              <button
                type="button"
                onClick={() => {
                  setAddPatient(false);
                }}
                className="mainBtton"
              >
                Back
              </button>
            </>
          )}
        </div>
      </form>
    </div>
  );
};

export default AddPatientForm;
