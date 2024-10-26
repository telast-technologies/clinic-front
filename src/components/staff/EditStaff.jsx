import React, { useState, useEffect } from "react";
import Header from "../Header";
import Sidebar from "../Sidebar";
import FeatherIcon from "feather-icons-react/build/FeatherIcon";
import { imagesend } from "../imagepath";
import Select from 'react-select';
import { Link } from "react-router-dom";
import Api from '../../_Utils/Api';
import { useForm } from "react-hook-form";
import { useStateContext } from "../../shared/Context";
import SelectPermission from "./SelectPermission";

import { useLocation } from 'react-router-dom';
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const EditStaff = () => {
  const query = useQuery();
  const staffId = query.get('id');

  const { selectedPermissions, setSelectedPermissions } = useStateContext();
  const [curentStaff, setCurentStaff] = useState();

  console.log(selectedPermissions);


  useEffect(() => {
    Api.get_single_staff(staffId).then(res => {
      setCurentStaff(res.data);

      const formattedPermissions = res.data.permissions.map(permission => ({
        label: permission.name,
        value: permission.codename, 
      }));

      setSelectedPermissions(formattedPermissions); 

    }).catch(error => {
      console.log(error);
    })

  }, [staffId]);



  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const password = watch("password");

  const onSubmit = (data) => {
    console.log(data);
    const permissionsCodenames = selectedPermissions.map(permission => permission.value);

    const staffData = {
      user: {
        first_name: data.first_name,
        last_name: data.last_name,
        username: data.username,
        email:data.email,
        phone: data.phone,
        is_active: data.status,
        password: data.password,
        password_confirm: data.password_confirm
      },
      is_client_admin: data.admin,
      permissions: permissionsCodenames
    };
    
    Api.edit_staff(staffData).then(res => {
      console.log(res);
    }).catch(error => {
      console.log(error);
    })
  };
  
  return (
    <div>
      <>
        <Header />
        <Sidebar id='menu-item3' id1='menu-items3' activeClassName='edit-staff' />
        <div className="page-wrapper">
          {curentStaff && (
            <div className="content">
              {/* Page Header */}
              <div className="page-header">
                <div className="row">
                  <div className="col-sm-12">
                    <ul className="breadcrumb">
                      <li className="breadcrumb-item">
                        <Link to="/stafflist">Staffs </Link>
                      </li>
                      <li className="breadcrumb-item">
                        <i className="feather-chevron-right">
                          <FeatherIcon icon="chevron-right" />
                        </i>
                      </li>
                      <li className="breadcrumb-item active">Edit Staff</li>
                    </ul>
                  </div>
                </div>
              </div>
              {/* /Page Header */}
              <div className="row">
                <div className="col-sm-12">
                  <div className="card">
                    <div className="card-body">
                      <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="row">
                          <div className="col-12">
                            <div className="form-heading">
                              <h4>Staff Details</h4>
                            </div>
                          </div>
                          <div className="col-12 col-md-6 col-xl-4">
                            <div className="form-group local-forms">
                              <label>
                                First Name <span className="login-danger">*</span>
                              </label>
                              <input
                                className="form-control"
                                type="text"
                                placeholder="Daniel"
                                defaultValue={curentStaff.user?.first_name} // Set default value
                                {...register("first_name", {
                                  required: "Please Enter Your First name",
                                  maxLength: {
                                    value: 150,
                                    message: "First name must be 150 characters or fewer",
                                  },
                                })}
                              />
                              {errors.first_name && <p className='error'>{errors.first_name.message}</p>}
                            </div>
                          </div>
                          <div className="col-12 col-md-6 col-xl-4">
                            <div className="form-group local-forms">
                              <label>
                                Last Name <span className="login-danger">*</span>
                              </label>
                              <input
                                className="form-control"
                                type="text"
                                placeholder="Bruk"
                                defaultValue={curentStaff.user?.last_name} // Set default value
                                {...register("last_name", {
                                  required: "Please Enter Your Last name",
                                  maxLength: {
                                    value: 150,
                                    message: "Last name must be 150 characters or fewer",
                                  },
                                })}
                              />
                              {errors.last_name && <p className=' error'>{errors.last_name.message}</p>}
                            </div>
                          </div>
                          <div className="col-12 col-md-6 col-xl-4">
                            <div className="form-group local-forms">
                              <label>
                                User Name <span className="login-danger">*</span>
                              </label>
                              <input
                                className="form-control"
                                type="text"
                                placeholder="DanielBruk"
                                defaultValue={curentStaff.user?.username} // Set default value
                                {...register("username", {
                                  required: "Please Enter Your Username",
                                  minLength: {
                                    value: 1,
                                    message: "Username must be at least 1 character",
                                  },
                                  maxLength: {
                                    value: 150,
                                    message: "Username must be 150 characters or fewer",
                                  },
                                  pattern: {
                                    value: /^[\w.@+-]+$/,
                                    message:
                                      "can only contain letters, digits, Special Caracters and no space",
                                  },
                                })}
                              />
                              {errors.username && <p className='error'>{errors.username.message}</p>}
                            </div>
                          </div>
                          <div className="col-12 col-md-6 col-xl-6">
                            <div className="form-group local-forms">
                              <label>
                                Phone <span className="login-danger">*</span>
                              </label>
                              <input
                                className="form-control"
                                type="text"
                                placeholder="+1 23 456890"
                                defaultValue={curentStaff.user?.phone} // Set default value
                                {...register("phone", {
                                  required: "Please Enter Your Phone number",
                                  minLength: {
                                    value: 1,
                                    message: "Phone number must be at least 1 character",
                                  },
                                  maxLength: {
                                    value: 128,
                                    message: "Phone number must be 128 characters or fewer",
                                  },
                                })}
                              />
                              {errors.phone && <p className='error'>{errors.phone.message}</p>}
                            </div>
                          </div>
                          <div className="col-12 col-md-6 col-xl-6">
                            <div className="form-group local-forms">
                              <label>
                                Email <span className="login-danger">*</span>
                              </label>
                              <input
                                className="form-control"
                                type="email"
                                placeholder="example@email.com"
                                defaultValue={curentStaff.user?.email} // Set default value
                                {...register("email", {
                                  required: "Please Enter Your Email",
                                  minLength: {
                                    value: 1,
                                    message: "Email must be at least 1 character",
                                  },
                                  maxLength: {
                                    value: 254,
                                    message: "Email must be 254 characters or fewer",
                                  },
                                  pattern: {
                                    value: /^[\w.%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                    message: "Please enter a valid email",
                                  },
                                })}
                              />
                              {errors.email && <p className='error'>{errors.email.message}</p>}
                            </div>
                          </div>
                          <div className="col-12 col-md-6 col-xl-6">
                            <div className="form-group local-forms">
                              <label>
                                Password <span className="login-danger">*</span>
                              </label>
                              <input
                                className="form-control"
                                type="password"
                                placeholder=""
                                defaultValue={curentStaff.user?.password} // Set default value
                                {...register("password", {
                                  required: "Please Enter Your Password",
                                  minLength: {
                                    value: 8,
                                    message: "Password must be at least 8 characters",
                                  },
                                })}
                              />
                              {errors.password && <p className='error'>{errors.password.message}</p>}
                            </div>
                          </div>
                          <div className="col-12 col-md-6 col-xl-6">
                            <div className="form-group local-forms">
                              <label>
                                Confirm Password{" "}
                                <span className="login-danger">*</span>
                              </label>
                              <input
                                className="form-control"
                                type="password"
                                placeholder=""
                                defaultValue={curentStaff.user?.password_confirm} // Set default value
                                {...register("password_confirm", {
                                  required: "Please confirm Your Password",
                                  validate: (value) =>
                                    value === password || "Passwords do not match",
                                })}
                              />
                              {errors.password_confirm && <p className='error'>{errors.password_confirm.message}</p>}
                            </div>
                          </div>

                          <SelectPermission />

                          <div className="col-12 col-md-6 col-xl-2">
                            <div className="select-gender">
                              <label className="gen-label">
                                Status <span className="login-danger">*</span>
                              </label>
                              <div className="form-check-inline">
                                <label className="form-check-label">
                                  <input
                                    type="radio"
                                    value={true}
                                    defaultChecked={curentStaff.user?.is_active} // Set default checked
                                    {...register("status", { required: true })}
                                    className="form-check-input"
                                  />
                                  Active
                                </label>
                              </div>
                              <div className="form-check-inline">
                                <label className="form-check-label">
                                  <input
                                    type="radio"
                                    value={false}
                                    defaultChecked={!curentStaff.user?.is_active} // Set default checked
                                    {...register("status", { required: true })}
                                    className="form-check-input"
                                  />
                                  Not Active
                                </label>
                              </div>
                            </div>
                            {errors.status && <p className="error">Status is required</p>}
                          </div>
                          <div className="col-12 col-md-6 col-xl-2">
                            <div className="select-gender">
                              <label className="gen-label">
                                Admin <span className="login-danger">*</span>
                              </label>
                              <div className="form-check-inline">
                                <label className="form-check-label">
                                  <input
                                    type="radio"
                                    value={true}
                                    defaultChecked={curentStaff.is_client_admin} // Set default checked
                                    {...register("admin", { required: true })}
                                    className="form-check-input"
                                  />
                                  Yes
                                </label>
                              </div>
                              <div className="form-check-inline">
                                <label className="form-check-label">
                                  <input
                                    type="radio"
                                    value={false}
                                    defaultChecked={!curentStaff.is_client_admin} // Set default checked
                                    {...register("admin", { required: true })}
                                    className="form-check-input"
                                  />
                                  No
                                </label>
                              </div>
                            </div>
                            {errors.admin && <p className="error">is client admin ?</p>}
                          </div>
                          <div className="col-12">
                            <div className="doctor-submit text-end">
                              <button
                                type="submit"
                                className="btn btn-primary submit-form me-2"
                              >
                                Edit
                              </button>
                              <Link to="/stafflist"
                                className="btn btn-primary cancel-form"
                              >
                                Cancel
                              </Link>
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            )}
        </div>
      </>
    </div>
  );
};

export default EditStaff;