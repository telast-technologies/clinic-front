import React, { useContext, useEffect, useState } from "react";
import classes from "./AddPaientForm.module.css";
import PhoneInput from "react-phone-number-input";
import { AppContext } from "../../shared/AppContext";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";

import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import ErrorBlock from "../ErrorBlock/ErrorBlock";
import PulseLoader from "react-spinners/PulseLoader";
const AddPaientForm = () => {
  const { token } = useContext(AppContext);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`, // Set authorization header
    },
  };
  function AddPaientSend(data) {
    return axios.post(
      "https://clinic.telast.tech/api/v1/patients/patient/",
      data,
      config
    );
  }
  const [value, setValue] = useState();

  const Form = useForm();
  const { register, handleSubmit, formState } = Form;
  const { errors } = formState;

  const { mutate, data, isError, isPending, error } = useMutation({
    mutationFn: AddPaientSend,
  });
  const navigate = useNavigate();
  const SumbitForm = (data) => {
    const sendingData = {
      first_name: data.firstname,
      last_name: data.lastname,
      email: data.email,
      phone: value,
      birthdate: data.birthday,
      address: data.address,
    };

    mutate(sendingData, config);
  };
  useEffect(() => {
    if (data) {
      toast.success("Paient is Adding Success");
    }
  }, [data]);

  return (
    <div className={classes.cardFormPaient}>
      <h2>Basic information</h2>
      <form onSubmit={handleSubmit(SumbitForm)}>
        <div className={classes.formPaient}>
          <div className={classes.formAction}>
            <label htmlFor="firstname">
              First Name <span>*</span>
            </label>
            <input
              type="text"
              placeholder="Ahmed"
              id="firstname"
              {...register("firstname", {
                required: "firstname is required",
              })}
            />
          </div>
          <div className={classes.formAction}>
            <label>
              Last Name <span>*</span>
            </label>
            <input
              type="text"
              placeholder="Hany"
              id="lastname"
              {...register("lastname", {
                required: "lastname is required",
              })}
            />
          </div>
          <div className={classes.formAction}>
            <label>
              email <span>*</span>
            </label>
            <input
              type="text"
              placeholder="ahmed@gmail.com"
              id="email"
              {...register("email", {
                required: "email is required",
              })}
            />
          </div>
          <div className={classes.formAction}>
            <label>
              birth day<span>*</span>
            </label>
            <input
              type="date"
              id="birthday"
              max="2024-06-24"
              {...register("birthday", {
                required: "birthday is required",
              })}
            />
          </div>
          <div className={classes.formAction}>
            <label>
              phone number<span>*</span>
              <PhoneInput
                defaultCountry="EG"
                placeholder="Enter phone number"
                value={value}
                onChange={setValue}
              />
            </label>
          </div>
        </div>
        <hr />
        <div className={classes.formAction}>
          <h2>Contact Information</h2>
          <label>
            Address <span>*</span>
          </label>
          <textarea
            id="address"
            {...register("address", {
              required: "address is required",
            })}
          ></textarea>
          {isError && <ErrorBlock title="Error" message={error.message} />}
        </div>
        <div className={classes.action}>
          <PulseLoader color="#4874dc" size={18} loading={isPending} />
          {!isPending && (
            <>
              <button type="submit" className="mainBtton">
                Save
              </button>
              <button
                onClick={() => {
                  navigate(-1);
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

export default AddPaientForm;
