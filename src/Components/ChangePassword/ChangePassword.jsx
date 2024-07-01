import React, { useContext } from "react";
import classes from "./ChangePassword.module.css";
import { AppContext } from "../../shared/AppContext";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import ErrorBlock from "../ErrorBlock/ErrorBlock";
import PulseLoader from "react-spinners/PulseLoader";
const ChangePassword = () => {
  const { token } = useContext(AppContext);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`, // Set authorization header
    },
  };
  function updatePassword(data) {
    return axios.post(
      "https://clinic.telast.tech/api/auth/password/change/",
      data,
      config
    );
  }
  const Form = useForm();
  const { register, handleSubmit, formState } = Form;
  const { errors } = formState;
  const { mutate, isError, isPending, error, isSuccess } = useMutation({
    mutationFn: updatePassword,
  });
  const SubmitForm = (data) => {
    console.log(data);
    mutate(data);
  };
  if (isSuccess) {
    toast.success("updated is success");
  }
  return (
    <div className={classes.changePassword}>
      <form onSubmit={handleSubmit(SubmitForm)}>
        <div className={classes.formAction}>
          <label>Old Passwaord</label>
          <input
            type="text"
            id="old_password"
            {...register("old_password", {
              required: "old_password is required",
            })}
          />
        </div>
        <div className={classes.formAction}>
          <label>New Passwaord</label>
          <input
            type="text"
            id="new_password1"
            {...register("new_password1", {
              required: "new_password1 is required",
            })}
          />
        </div>
        <div className={classes.formAction}>
          <label>Confirm Passwaord</label>
          <input
            type="text"
            id="new_password2"
            {...register("new_password2", {
              required: "new_password2 is required",
            })}
          />
        </div>
        <PulseLoader color="#4874dc" size={18} loading={isPending} />
        {isError && <ErrorBlock title="Error" message={error.message} />}
        <button type="submit" className={classes.saveChange}>
          Save Change
        </button>
      </form>
    </div>
  );
};

export default ChangePassword;
