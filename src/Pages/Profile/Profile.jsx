import React, { useContext, useState } from "react";
import classes from "./Profile.module.css";
import ProfileAvatar from "../../assets/profile avatar.png";
import ChangePassword from "../../Components/ChangePassword/ChangePassword";
import UpdateProfile from "../../Components/UpdateProfile/UpdateProfile";
import UpdateClinic from "../../Components/UpdateClinic/UpdateClinic";
import { AppContext } from "../../shared/AppContext";
import { useNavigate } from "react-router";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import ErrorBlock from "../../Components/ErrorBlock/ErrorBlock";
import BounceLoader from "react-spinners/BounceLoader";
import { NavLink } from "react-router-dom";
import Navbar from "../../Components/Navbar/Navbar";
import NavMenu from "../../Components/NavMenu/NavMenu";
const Profile = () => {
  const { token } = useContext(AppContext);
  const navigate = useNavigate();
  const getProfileDAta = () => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`, // Set authorization header
      },
    };
    return axios.get("https://clinic.telast.tech/api/auth/user/", config);
  };
  const { data, isLoading, isError, error, isSuccess } = useQuery({
    queryKey: ["getProfile"],
    queryFn: getProfileDAta,
  });
  const [type, setType] = useState("profile");
  return (
    <div>
      <NavMenu />
      <div className="main">
        <Navbar />
        <div className={classes.profileLayout}>
          <div className={classes.avatarCard}>
            <img src={ProfileAvatar} alt="profileAvatar" />
            <p>Ahemd</p>
          </div>
          <div className={classes.formCard}>
            <aside>
              <div className={classes.links}>
                <a
                  className={type === "profile" ? classes.active : ""}
                  onClick={() => setType("profile")}
                >
                  Update info
                </a>
                <a
                  onClick={() => setType("clinic")}
                  className={type === "clinic" ? classes.active : ""}
                >
                  Clinic profile
                </a>
                <a
                  className={type === "password" ? classes.active : ""}
                  onClick={() => {
                    setType("password");
                  }}
                >
                  Security Seetting{" "}
                </a>
              </div>
              {isLoading && (
                <div className="center">
                  <BounceLoader color="#4874dc" size={150} />
                </div>
              )}
              {isError && <ErrorBlock title="error" message={error.message} />}
              {type === "profile" && data && (
                <UpdateProfile data={data?.data} />
              )}
              {type === "clinic" && data && (
                <UpdateClinic data={data?.data?.clinic} />
              )}
              {type === "password" && <ChangePassword />}
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
