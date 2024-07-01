import React, { useContext, useEffect } from "react";
import classes from "./ChargeItemForm.module.css";
import { useNavigate, useParams } from "react-router";
import { useForm } from "react-hook-form";
import { AppContext } from "../../shared/AppContext";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import PulseLoader from "react-spinners/PulseLoader";
import ErrorBlock from "../ErrorBlock/ErrorBlock";
const ChargeItemForm = ({ data: invoiceData }) => {
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
  const AddChargeIten = (data) => {
    return axios.post(
      "https://clinic.telast.tech/api/v1/invoices/charge_items/",
      data,
      config
    );
  };
  const { mutate, data, isError, isPending, error, isSuccess } = useMutation({
    mutationFn: AddChargeIten,
  });
  const SubmitForm = (data) => {
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
      <form onSubmit={handleSubmit(SubmitForm)}>
        <div className={classes.formPaient}>
          <div className={classes.formAction}>
            <label htmlFor="quantity">quantity</label>
            <input
              type="number"
              placeholder="quantity"
              {...register("quantity")}
            />
          </div>
          <div className={classes.formAction}>
            <label>supply</label>
            <select
              type="supply"
              id="supply"
              {...register("supply", {
                required: "supply is required",
              })}
            >
              {invoiceData.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
          </div>
          <div></div>
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

export default ChargeItemForm;
