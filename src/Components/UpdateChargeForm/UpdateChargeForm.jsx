import React, { useContext, useEffect } from "react";
import classes from "./UpdateChargeForm.module.css";
import { useNavigate, useParams } from "react-router";
import { AppContext } from "../../shared/AppContext";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import ErrorBlock from "../ErrorBlock/ErrorBlock";
import PulseLoader from "react-spinners/PulseLoader";
const UpdateChargeForm = () => {
  const { uid } = useParams();
  const { token } = useContext(AppContext);
  const navigate = useNavigate();
  const config = {
    headers: {
      Authorization: `Bearer ${token}`, // Set authorization header
    },
  };
  function UpdateCharge(data) {
    return axios.patch(
      `https://clinic.telast.tech/api/v1/invoices/invoice/${uid}`,
      data,
      config
    );
  }
  const Form = useForm();
  const { register, handleSubmit, formState } = Form;
  const { mutate, data, isError, isPending, error, isSuccess } = useMutation({
    mutationFn: UpdateCharge,
  });
  const SubmitForm = (data) => {
    mutate(data);
  };

  if (isSuccess) {
    toast.success("Item update success");
    navigate(-1);
  }
  return (
    <div className={classes.cardFormPaient}>
      <h2>Basic information</h2>
      <form onSubmit={handleSubmit(SubmitForm)}>
        <div className={classes.formPaient}>
          <div className={classes.formAction}>
            <label htmlFor="tax">Tax</label>
            <input type="number" placeholder="Tax" {...register("tax")} />
          </div>
          <div className={classes.formAction}>
            <label htmlFor="discount">Discount</label>
            <input
              type="number"
              placeholder="Discount"
              {...register("discount")}
            />
          </div>
          <div className={classes.formAction}>
            <label htmlFor="sub_total">Sub Total</label>
            <input
              type="number"
              placeholder="Sub Total"
              {...register("sub_total")}
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

export default UpdateChargeForm;
