import React, { useContext } from "react";
import classes from "./UpdateProfile.module.css";
import { AppContext } from "../../shared/AppContext";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import ErrorBlock from "../ErrorBlock/ErrorBlock";
import PulseLoader from "react-spinners/PulseLoader";
import { toast } from "react-toastify";
const UpdateProfile = ({ data }) => {
  const { token } = useContext(AppContext);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`, // Set authorization header
    },
  };
  function UpdateProfile(data) {
    return axios.patch(
      "https://clinic.telast.tech/api/auth/user/",
      data,
      config
    );
  }
  const Form = useForm({
    defaultValues: data,
  });
  const { register, handleSubmit, formState } = Form;
  const { errors } = formState;
  const { mutate, isError, isPending, error, isSuccess } = useMutation({
    mutationFn: UpdateProfile,
  });
  const SubmiForm = (data) => {
    console.log(data);
    mutate(data);
  };
  if (isSuccess) {
    toast.success("updated is success");
  }
  return (
    <div className={classes.changePassword}>
      <form onSubmit={handleSubmit(SubmiForm)}>
        <div className={classes.formAction}>
          <label>User Name</label>
          <input
            type="text"
            id="username"
            {...register("username", {
              required: "username is required",
            })}
          />
        </div>
        <div className={classes.formAction}>
          <label>Email</label>
          <input
            type="text"
            id="email"
            {...register("email", {
              required: "email is required",
            })}
          />
        </div>
        <div className={classes.formAction}>
          <label>First Name</label>
          <input
            type="text"
            id="first_name"
            {...register("first_name", {
              required: "first_name",
            })}
          />
        </div>
        <div className={classes.formAction}>
          <label>Last Name</label>
          <input
            type="text"
            id="last_name"
            {...register("last_name", {
              required: "last_name ",
            })}
          />
        </div>
        <div className={classes.formAction}>
          <label>Phone</label>
          <input
            type="text"
            id="phone"
            {...register("phone", {
              required: "phone ",
            })}
          />
        </div>
        <PulseLoader color="#4874dc" size={18} loading={isPending} />
        {isError && (
          <ErrorBlock title="Error" message={error.response.data.message} />
        )}
        {!isPending && (
          <button type="submit" className={classes.saveChange}>
            Save Change
          </button>
        )}
      </form>
    </div>
  );
};

export default UpdateProfile;
