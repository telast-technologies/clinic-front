import React, { useContext } from "react";
import classes from "./ChargeServiceForm.module.css";
import { useNavigate, useParams } from "react-router";
import { useForm } from "react-hook-form";
import { AppContext } from "../../shared/AppContext";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import PulseLoader from "react-spinners/PulseLoader";
import ErrorBlock from "../ErrorBlock/ErrorBlock";
const ChargeServiceForm = ({ commingData }) => {
  const { id } = useParams();
  const Form = useForm();
  const { register, handleSubmit, formState } = Form;
  const { token } = useContext(AppContext);
  const navigate = useNavigate();
  const config = {
    headers: {
      Authorization: `Bearer ${token}`, // Set authorization header
    },
  };
  function AddChargeService(data) {
    return axios.post(
      "https://clinic.telast.tech/api/v1/invoices/charge_services/",
      data,
      config
    );
  }
  const { mutate, data, isError, isPending, error, isSuccess } = useMutation({
    mutationFn: AddChargeService,
  });
  const SubmitForn = (data) => {
    let sendingData = { ...data, invoice: id };
    console.log(sendingData);
    mutate(sendingData);
  };
  if (isSuccess) {
    navigate("/invoice");
    toast.success("charge item is addes success");
  }
  return (
    <div className={classes.cardFormPaient}>
      <h2>Basic information</h2>
      <form onSubmit={handleSubmit(SubmitForn)}>
        <div className={classes.formPaient}>
          <div className={classes.formAction}>
            <label>Service</label>
            <select
              type="service"
              id="service"
              {...register("service", {
                required: "service is required",
              })}
            >
              {commingData.map((data) => (
                <option key={data.value} value={data.value}>
                  {data.label}
                </option>
              ))}
            </select>
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

export default ChargeServiceForm;
