import React from "react";
import { Link, useNavigate } from "react-router-dom";
// import FeatherIcon from "feather-icons-react";
import {
  login02,
  loginicon01,
  loginicon02,
  loginicon03,
  loginlogo,
} from "../../imagepath";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { Eye, EyeOff } from "feather-icons-react/build/IconComponents";
import { axiosApi } from "../../../Config/axiosConfig";
// import ReactPasswordToggleIcon from 'react-password-toggle-icon';

const Login = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState } = useForm();
  const { errors } = formState;
  const {
    mutate,
    isPending,
    isError,
    isSuccess,
    error,
    data: comiingData,
  } = useMutation({
    mutationFn: (data) => {
      return axiosApi.post("auth/login/", data);
    },
  });

  const SumbitForm = (data) => {
    const dataSend = {
      email: data.email,
      password: data.password,
    };
    mutate(dataSend, {
      onSuccess: (comiingData) => {
        const token = comiingData.data.access; // Assuming the token is in `access`
        // Store token in localStorage
        localStorage.setItem('token', token);
        navigate("/doctor-dashboard");
      },
    });
  };

  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <>
      {/* Main Wrapper */}
      <div className="main-wrapper login-body">
        <div className="container-fluid px-0">
          <div className="row">
            {/* Login logo */}
            <div className="col-lg-6 login-wrap">
              <div className="login-sec">
                <div className="log-img">
                  <img className="img-fluid" src={login02} alt="#" />
                </div>
              </div>
            </div>

            <div className="col-lg-6 login-wrap-bg">
              <div className="login-wrapper">
                <div className="loginbox">
                  <div className="login-right">
                    <div className="login-right-wrap">
                      <div className="account-logo">
                        <img src={loginlogo} alt="#" />
                      </div>
                      <h2>Login</h2>
                      {/* Form */}
                      <form onSubmit={handleSubmit(SumbitForm)}>
                        <div className="form-group">
                          <label>
                            Email <span className="login-danger">*</span>
                          </label>
                          <input
                            className="form-control"
                            type="text"
                            {...register("email", {
                              required: "Email is required",
                              pattern: {
                                value:
                                  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                message: "Please enter a valid email address",
                              },
                            })}
                          />
                          <p className="login-danger">
                            {errors.email?.message}
                          </p>
                        </div>
                        <div className="form-group">
                          <label>
                            Password <span className="login-danger">*</span>
                          </label>
                          <input
                            type={passwordVisible ? "text" : "password"} // Fixed the type toggle
                            className="form-control pass-input"
                            {...register("password", {
                              required: "Password is required",
                            })}
                          />
                          <span
                            className="toggle-password"
                            onClick={togglePasswordVisibility}
                          >
                            {passwordVisible ? (
                              <EyeOff className="react-feather-custom" />
                            ) : (
                              <Eye className="react-feather-custom" />
                            )}
                          </span>
                        </div>
                        <div className="forgotpass">
                          <div className="remember-me">
                            <label className="custom_check mr-2 mb-0 d-inline-flex remember-me">
                              {" "}
                              Remember me
                              <input type="checkbox" name="radio" />
                              <span className="checkmark" />
                            </label>
                          </div>
                          <Link to="/forgotpassword">Forgot Password?</Link>
                        </div>
                        <div className="form-group login-btn">
                          <button
                            type="submit"
                            className="btn btn-primary btn-block"
                          >
                            Login
                          </button>
                        </div>
                      </form>
                      {/* /Form */}
                      {isError && (
                        <div
                          className="alert alert-danger alert-dismissible fade show"
                          role="alert"
                        >
                          <strong>Error!</strong> A{" "}
                          <Link to="#" className="alert-link">
                            problem
                          </Link>{" "}
                          {error.response.data.message}
                          <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="alert"
                            aria-label="Close"
                          >
                            <span aria-hidden="true"> </span>
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* /Login Content */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
