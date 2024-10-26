import React from "react";
import Header from "../Header";
import Sidebar from "../Sidebar";
import FeatherIcon from "feather-icons-react/build/FeatherIcon";
import { Link } from "react-router-dom";
import Api from '../../_Utils/Api';
import { useForm } from "react-hook-form";

const AddPatients = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const addPatient = (patientData) => {
    Api.add_patient(patientData).then((res) => {
      window.location.href = '/patientslist';
    }).catch((error) => {
      alert(error.response.data.message);
    });
  };

  const onSubmit = (data) => {
    const patientData = {
      first_name: data.first_name,
      last_name: data.last_name,
      email: data.email || null,
      phone: data.phone,
      birthdate: data.birthdate || null,
      address: data.address || null,
      nid: data.nid,
      channel: data.channel
    };
    addPatient(patientData);
  };

  return (
    <div>
      <>
        <Header />
        <Sidebar id="menu-item2" id1="menu-items2" activeClassName="add-patient"/>
        <div className="page-wrapper">
          <div className="content">
            {/* Page Header */}
            <div className="page-header">
              <div className="row">
                <div className="col-sm-12">
                  <ul className="breadcrumb">
                    <li className="breadcrumb-item">
                      <Link to="patientslist">Patients</Link>
                    </li>
                    <li className="breadcrumb-item">
                      <i className="feather-chevron-right">
                        <FeatherIcon icon="chevron-right" />
                      </i>
                    </li>
                    <li className="breadcrumb-item active">Add Patient</li>
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
                            <h4>Patient Details</h4>
                          </div>
                        </div>
                        {/* First Name */}
                        <div className="col-12 col-md-6 col-xl-4">
                          <div className="form-group local-forms">
                            <label>
                              First Name <span className="login-danger">*</span>
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              placeholder="John"
                              {...register("first_name", {
                                required: "Please Enter First Name",
                                maxLength: {
                                  value: 100,
                                  message: "First name must be 100 characters or fewer",
                                },
                              })}
                            />
                            {errors.first_name && <p className="error">{errors.first_name.message}</p>}
                          </div>
                        </div>
                        {/* Last Name */}
                        <div className="col-12 col-md-6 col-xl-4">
                          <div className="form-group local-forms">
                            <label>
                              Last Name <span className="login-danger">*</span>
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              placeholder="Doe"
                              {...register("last_name", {
                                required: "Please Enter Last Name",
                                maxLength: {
                                  value: 100,
                                  message: "Last name must be 100 characters or fewer",
                                },
                              })}
                            />
                            {errors.last_name && <p className="error">{errors.last_name.message}</p>}
                          </div>
                        </div>
                        {/* Email */}
                        <div className="col-12 col-md-6 col-xl-6">
                          <div className="form-group local-forms">
                            <label>Email</label>
                            <input
                              className="form-control"
                              type="email"
                              placeholder="example@email.com"
                              {...register("email", {
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
                            {errors.email && <p className="error">{errors.email.message}</p>}
                          </div>
                        </div>
                        {/* Phone */}
                        <div className="col-12 col-md-6 col-xl-6">
                          <div className="form-group local-forms">
                            <label>
                              Phone <span className="login-danger">*</span>
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              placeholder="+1 23 456890"
                              {...register("phone", {
                                required: "Please Enter Phone number",
                                maxLength: {
                                  value: 128,
                                  message: "Phone number must be 128 characters or fewer",
                                },
                              })}
                            />
                            {errors.phone && <p className="error">{errors.phone.message}</p>}
                          </div>
                        </div>
                        {/* Birthdate */}
                        <div className="col-12 col-md-6 col-xl-6">
                          <div className="form-group local-forms">
                            <label>Birthdate</label>
                            <input
                              className="form-control"
                              type="date"
                              {...register("birthdate")}
                            />
                          </div>
                        </div>
                        {/* Address */}
                        <div className="col-12 col-md-6 col-xl-6">
                          <div className="form-group local-forms">
                            <label>Address</label>
                            <input
                              className="form-control"
                              type="text"
                              placeholder="123 Main St"
                              {...register("address", {
                                maxLength: {
                                  value: 100,
                                  message: "Address must be 100 characters or fewer",
                                },
                              })}
                            />
                            {errors.address && <p className="error">{errors.address.message}</p>}
                          </div>
                        </div>
                        {/* NID */}
                        <div className="col-12 col-md-6 col-xl-6">
                          <div className="form-group local-forms">
                            <label>
                              National/Passport ID <span className="login-danger">*</span>
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              placeholder="Enter at least 10 digits"
                              {...register("nid", {
                                required: "Please Enter National/Passport ID",
                                pattern: {
                                  value: /^\d{10,}$/, // Regular expression for minimum 10 digits
                                  message: "ID must be at least 10 digits long",
                                },
                              })}
                            />
                            {errors.nid && <p className="error">{errors.nid.message}</p>}
                          </div>
                        </div>

                        {/* Channel */}
                        <div className="col-12 col-md-6 col-xl-6">
                          <div className="form-group local-forms">
                            <label>
                              Communication Channel <span className="login-danger">*</span>
                            </label>
                            <select
                              className="form-control"
                              {...register("channel", {
                                required: "Please select a communication channel",
                              })}
                            >
                              <option value="facebook">Facebook</option>
                              <option value="telegram">Telegram</option>
                              <option value="whatsapp">WhatsApp</option>
                              <option value="sms">SMS</option>
                              <option value="email">Email</option>
                              <option value="other">Other</option>
                            </select>
                            {errors.channel && <p className="error">{errors.channel.message}</p>}
                          </div>
                        </div>

                        <div className="col-12">
                          <div className="doctor-submit text-end">
                            <button type="submit" className="btn btn-primary submit-form me-2">
                              Submit
                            </button>
                            <Link to="patientslist" className="btn btn-primary cancel-form">
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
        </div>
      </>
    </div>
  );
};

export default AddPatients;
