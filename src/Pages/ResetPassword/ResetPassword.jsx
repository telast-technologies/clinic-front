import React from "react";
import classes from "./ResetPassword.module.css";
import { BiSolidRightArrowCircle } from "react-icons/bi";

const ResetPassword = () => {
  return (
    <div className={classes.resetPassword}>
      <div className={classes.FormLayout}>
        <BiSolidRightArrowCircle />
        <h2>Reset Your Password</h2>
        <p>Enter the email address you used to registed</p>
        <form>
          <div className={classes.formAction}>
            <input type="text" />
            <span>Forgot or lost your email address</span>
          </div>
          <div className={classes.actions}>
            <button className={classes.primaryBtn}> Back to sign in </button>
            <button className={classes.mainBtn}> Send Instruction </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
