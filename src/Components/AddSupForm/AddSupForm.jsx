import React, { useContext, useEffect } from "react";
import classes from "./AddSupForm.module.css";
import { useForm } from "react-hook-form";
import { AppContext } from "../../shared/AppContext";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import ErrorBlock from "../ErrorBlock/ErrorBlock";
import PulseLoader from "react-spinners/PulseLoader";
const AddSupForm = () => {
  const { token } = useContext(AppContext);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`, // Set authorization header
    },
  };
  function AddSuppliesSend(data) {
    return axios.post(
      "https://clinic.telast.tech/api/v1/inventory/supply/",
      data,
      config
    );
  }
  const Form = useForm();
  const { register, handleSubmit, formState } = Form;
  const { errors } = formState;
  const { mutate, data, isError, isPending, error, isSuccess } = useMutation({
    mutationFn: AddSuppliesSend,
  });
  const navigate = useNavigate();
  const SubmitForm = (data) => {
    const dataSend = {
      invoice: Number(data.invoice),
      item: data.item,
      profit_share: Number(data.profit_share),
      unit_cost: Number(data.unit_cost),
      quantity: Number(data.quantity),
    };

    mutate(dataSend);
  };

  if (isSuccess) {
    if (data && !isError && !isPending) {
      toast.success("Supplies  is Adding Success");
      console.log("datasending");
    }
  }
  return (
    <div className={classes.cardFormPaient}>
      <h2>Basic information</h2>
      <form onSubmit={handleSubmit(SubmitForm)}>
        <div className={classes.formPaient}>
          <div className={classes.formAction}>
            <label htmlFor="invoice">
              Invoice <span>*</span>
            </label>
            <input
              type="number"
              placeholder="invoice"
              id="invoice"
              {...register("invoice", {
                required: "invoice is required",
              })}
            />
          </div>
          <div className={classes.formAction}>
            <label htmlFor="profit_share">
              Profit Share <span>*</span>
            </label>
            <input
              type="number"
              placeholder="Profit Share"
              id="profit_share"
              {...register("profit_share", {
                required: "profit_share is required",
              })}
            />
          </div>
          <div className={classes.formAction}>
            <label htmlFor="unit_cost">
              Unit Cost <span>*</span>
            </label>
            <input
              type="number"
              placeholder="Profit Share"
              id="unit_cost"
              {...register("unit_cost", {
                required: "unit_cost is required",
              })}
            />
          </div>
          <div className={classes.formAction}>
            <label htmlFor="quantity">
              Quantity <span>*</span>
            </label>
            <input
              type="number"
              placeholder="Profit Share"
              id="quantity"
              {...register("quantity", {
                required: "quantity is required",
              })}
            />
          </div>
          <div className={classes.formAction}>
            <label htmlFor="item">
              Item <span>*</span>
            </label>
            <input
              type="text"
              placeholder="Item"
              id="item"
              {...register("item", {
                required: "item is required",
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

export default AddSupForm;
