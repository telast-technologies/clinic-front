import React, { useContext } from "react";
import Image from "../../assets/LoginImg.jpeg";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { LoginSendData } from "../../utils/http";
import { AppContext } from "../../shared/AppContext";
import { useNavigate } from "react-router";
import PulseLoader from "react-spinners/PulseLoader";
import ErrorBlock from "../../Components/ErrorBlock/ErrorBlock";
import { Link } from "react-router-dom";
const Login = () => {
  const { setToken } = useContext(AppContext);
  const navigate = useNavigate();
  const Form = useForm();
  const { register, handleSubmit, formState } = Form;
  const { errors } = formState;
  const {
    mutate,
    isPending,
    isError,
    isSuccess,
    error,
    data: comiingData,
  } = useMutation({
    mutationFn: LoginSendData,
  });
  const SumbitForm = (data) => {
    const dataSend = {
      email: data.email,
      password: data.password,
    };
    mutate(dataSend);

    if (comiingData) {
    }
  };

  if (isSuccess) {
    setToken(comiingData.data.access);
    navigate("/dashboard");
  }
  return (
    <div className="container">
      <div className="form_layout">
        <div className="form">
          <h2>Welcome back</h2>
          <h6> please enter your male and password </h6>
          <form onSubmit={handleSubmit(SumbitForm)}>
            <div className="form_action">
              <label>Email</label>
              <input
                type="text"
                placeholder="Enter Email"
                id="email"
                {...register("email", {
                  required: "email is required",
                })}
              />
              <p className="error">{errors.email?.message}</p>
            </div>
            <div className="form_action">
              <label>Password</label>
              <input
                type="password"
                placeholder="Enter Password"
                id="password"
                {...register("password", {
                  required: "password is required",
                })}
              />
              <p className="error">{errors.password?.message}</p>
            </div>
            <PulseLoader color="#4874dc" size={18} loading={isPending} />
            {!isPending && (
              <button className="login_btn" type="submit">
                Login
              </button>
            )}
            <Link className="forget_link" to="/forgetpassword">
              Forget Password
            </Link>
            {isError && (
              <ErrorBlock title="Login Error" message={error.message} />
            )}
          </form>
        </div>
        <div className="image">
          <img src={Image} alt="logo" />
        </div>
      </div>
    </div>
  );
};

export default Login;

// Email: test@staff.com
// Password: ABC@2023
