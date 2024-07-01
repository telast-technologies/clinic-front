import React, { useState } from "react";
import classes from "./AddStaffForm.module.css";
import PhoneInput from "react-phone-number-input";
import { useForm } from "react-hook-form";
const AddStaffForm = () => {
  const [value, setValue] = useState();
  const [active, setActive] = useState();
  const Form = useForm();
  const { register, handleSubmit, formState } = Form;
  const { errors } = formState;
  const SumbitForm = (data) => {};
  return (
    <div className={classes.staffForm}>
      <section className={classes.staffHeading}>
        <h2> Add Staff</h2>
        <button className="mainBtton">Back</button>
      </section>
      <form
        onSubmit={handleSubmit(SumbitForm)}
        className={classes.FormLayoutStaff}
      >
        <div className={classes.two}>
          <div className={classes.formAction}>
            <label>
              First Name <span>*</span>
            </label>
            <input
              type="text"
              placeholder="First Name"
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
              placeholder="Last Name"
              type="text"
              id="lastname"
              {...register("lastname", {
                required: "lastname is required",
              })}
            />
          </div>
        </div>
        <div className={classes.two}>
          <div className={classes.formAction}>
            <label>
              User Name <span>*</span>
            </label>
            <input
              placeholder="User Name"
              type="text"
              id="username"
              {...register("username", {
                required: "username is required",
              })}
            />
          </div>
          <div className={classes.formAction}>
            <label>
              Email <span>*</span>
            </label>
            <input
              placeholder="Email"
              type="text"
              id="email"
              {...register("email", {
                required: "email is required",
              })}
            />
          </div>
        </div>
        <div className={classes.two}>
          <div className={classes.formAction}>
            <label>
              Password <span>*</span>
            </label>
            <input
              placeholder="Password"
              type="password"
              id="password"
              {...register("password", {
                required: "password is required",
              })}
            />
          </div>
          <div className={classes.formAction}>
            <label>
              Confirm Password <span>*</span>
            </label>
            <input
              placeholder="Confirm Password"
              type="password"
              id="confirmpassword"
              {...register("confirmpassword", {
                required: "confirmpassword is required",
              })}
            />
          </div>
        </div>
        <div className={classes.two}>
          <div className={classes.formAction}>
            <label>
              phone number <span>*</span>
            </label>
            <PhoneInput
              defaultCountry="EG"
              placeholder="Enter phone number"
              value={value}
              onChange={setValue}
            />
          </div>
          <div className={classes.formAction}>
            <label>
              Active <span>*</span>
            </label>
            <div className={classes.activeSelcted}>
              <div className={classes.actived}>
                <input
                  id="active"
                  type="radio"
                  value="active"
                  name="Actived"
                  onChange={(e) => setActive(e.target.value)}
                />
                <label htmlFor="active">Active</label>
              </div>
              <div className={classes.actived}>
                <input
                  id="inActive"
                  type="radio"
                  value="inactive"
                  name="Actived"
                  onChange={(e) => setActive(e.target.value)}
                />
                <label htmlFor="inActive">InActive</label>
              </div>
            </div>
          </div>
        </div>
        <div className={classes.actions}>
          <button className="mainBtton" type="submit">
            Save
          </button>
          <button className="SecondaryBtn">Discard</button>
        </div>
      </form>
    </div>
  );
};

export default AddStaffForm;
