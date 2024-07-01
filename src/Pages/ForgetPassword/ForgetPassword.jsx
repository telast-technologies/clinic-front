import React from "react";
import classes from "./ForgetPasssword.module.css";
import Logo from "../../assets/logoForget.png";
import { useQuery } from "@tanstack/react-query";
import { FetchData } from "../../utils/http";
const ForgetPassword = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["events"],
    queryFn: FetchData,
  });
  let content;
  if (isLoading) {
    content = <p> Loading </p>;
  }
  // if (isError) {
  //   content = <p> Error </p>;
  // }
  if (data) {
    content = (
      <div className={classes.forgetLayout}>
        <img src={Logo} alt="logo " />
        <h2>Forgot Password?</h2>
        <div className={classes.formAction}>
          <label htmlFor="new">Enter a new password</label>
          <input id="new" placeholder="password" />
        </div>
        <div className={classes.formAction}>
          <label htmlFor="retype">Re-type a new password</label>
          <input id="retype" placeholder="password" />
        </div>
        <button>Save</button>
      </div>
    );
  }
  return content;
};

export default ForgetPassword;
