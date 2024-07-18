import React, { useContext } from "react";
import classes from "./UpdateClinic.module.css";
import { AppContext } from "../../shared/AppContext";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import ErrorBlock from "../ErrorBlock/ErrorBlock";
import PulseLoader from "react-spinners/PulseLoader";
const UpdateClinic = ({ data }) => {
  const { token } = useContext(AppContext);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`, // Set authorization header
    },
  };
  function UpdateClinic(data) {
    return axios.patch(
      "https://clinic.telast.tech/api/v1/system_management/clinic/update/",
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
    mutationFn: UpdateClinic,
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
          <label>Clinc Name</label>
          <input
            type="text"
            placeholder={data.name}
            id="name"
            {...register("name", {
              required: "name is required",
            })}
          />
        </div>
        <div className={classes.formAction}>
          <label>Description</label>
          <input
            type="text"
            placeholder={data?.description}
            id="description"
            {...register("description", {
              required: "description is required",
            })}
          />
        </div>
        <div className={classes.formAction}>
          <label>Phone</label>
          <input
            type="text"
            placeholder={data?.phone}
            id="phone"
            {...register("phone", {
              required: "phone is required",
            })}
          />
        </div>
        <div className={classes.formAction}>
          <label>Email</label>
          <input
            type="text"
            placeholder={data?.email}
            id="email"
            {...register("email", {
              required: "email is required",
            })}
          />
        </div>
        <div className={classes.formAction}>
          <label>Website</label>
          <input
            type="text"
            placeholder={data?.website}
            id="website"
            {...register("website", {
              required: "website is required",
            })}
          />
        </div>
        <div className={classes.formAction}>
          <label>Capacity</label>
          <input
            type="number"
            placeholder={data?.capacity}
            id="capacity"
            {...register("capacity", {
              required: "capacity is required",
            })}
          />
        </div>
        <div className={classes.formAction}>
          <label>Address</label>
          <textarea
            id="address"
            {...register("address", {
              required: "address is required",
            })}
          >
            {data?.address}
          </textarea>
        </div>
        <PulseLoader color="#4874dc" size={18} loading={isPending} />
        {isError && (
          <ErrorBlock title="Error" message={error.response.data.message} />
        )}
        {!isPending && (
          <button className={classes.saveChange} type="submit">
            Save Change
          </button>
        )}
      </form>
    </div>
  );
};

export default UpdateClinic;
