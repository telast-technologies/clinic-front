import React, { useContext, useEffect } from "react";
import classes from "./AddServiceForm.module.css";
import { useForm } from "react-hook-form";
import { AppContext } from "../../shared/AppContext";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";
import ErrorBlock from "../ErrorBlock/ErrorBlock";
import { useNavigate } from "react-router";
import PulseLoader from "react-spinners/PulseLoader";
const AddServiceForm = () => {
  const Form = useForm();
  const { register, handleSubmit, formState } = Form;
  const { errors } = formState;
  const navigate = useNavigate();
  const { token } = useContext(AppContext);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`, // Set authorization header
    },
  };
  const AddService = (data) => {
    return axios.post(
      "https://clinic.telast.tech/api/v1/healthcare/service/",
      data,
      config
    );
  };
  const { mutate, data, isError, isPending, error, isSuccess } = useMutation({
    mutationFn: AddService,
  });
  const SumbitForm = (data) => {
    const sendigData = {
      ...data,
      active: "True",
    };
    mutate(sendigData);
  };
  if (isSuccess) {
    toast.success("data is Success Created");
  }

  return (
    <div className={classes.cardFormPaient}>
      <h2>Basic information</h2>
      <form onSubmit={handleSubmit(SumbitForm)}>
        <div className={classes.formPaient}>
          <div className={classes.formAction}>
            <label htmlFor="name">
              Service Name <span>*</span>
            </label>
            <input
              type="text"
              placeholder="name"
              id="name"
              {...register("name", {
                required: "name is required",
              })}
            />
          </div>
          <div className={classes.formAction}>
            <label htmlFor="charge">
              Charge <span>*</span>
            </label>
            <input
              type="charge"
              placeholder="charge"
              id="charge"
              {...register("charge", {
                required: "charge is required",
              })}
            />
          </div>
        </div>
        {isError && <ErrorBlock title="Error" message={error.message} />}
        <div className={classes.action}>
          <PulseLoader color="#4874dc" size={18} loading={isPending} />
          {!isPending && (
            <>
              <button type="submit" className="mainBtton">
                Save
              </button>
              <button
                className="mainBtton"
                onClick={() => {
                  navigate(-1);
                }}
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

export default AddServiceForm;
