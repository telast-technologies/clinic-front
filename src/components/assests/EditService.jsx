/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import Header from "../Header";
import Sidebar from "../Sidebar";
import Select from "react-select";
import FeatherIcon from "feather-icons-react/build/FeatherIcon";
import { DatePicker } from "antd";
import { Link } from 'react-router-dom';
import { useForm } from "react-hook-form";
import Api from '../../_Utils/Api'
import { useLocation } from 'react-router-dom';

const EditService = () => {
  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }
  const query = useQuery();
  const serviceId = query.get('id');
  const [isActive, setIsActive] = useState();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  useEffect(() => {
    Api.get_single_service(serviceId).then(res => {
      if (res.data) {
        setValue("service_name", res.data.name);
        setValue("charge", res.data.charge);
        setIsActive(res.data.active)
      }
    }).catch(error => {
      console.log(error);
    });
  }, [serviceId, setValue]);



  const onSubmit = (data) => {
    const patientData = {
      name: data.service_name,
      charge: data.charge,
      active: isActive
    };
    Api.edit_service(serviceId, patientData).then(res => {
      window.location.href = 'services'
    }).catch(error => {
      console.log(error);
    });
  };

  return (
    <div>
      <Header />
      <Sidebar id='menu-item11' id1='menu-items11' activeClassName='EditService' />
      <div className="page-wrapper">
        <div className="content">
          {/* Page Header */}
          <div className="page-header">
            <div className="row">
              <div className="col-sm-12">
                <ul className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to="/servicesLink">Services </Link>
                  </li>
                  <li className="breadcrumb-item">
                    <i className="feather-chevron-right">
                      <FeatherIcon icon="chevron-right" />
                    </i>
                  </li>
                  <li className="breadcrumb-item active">Edit Services</li>
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
                          <h4>Edit Services</h4>
                        </div>
                      </div>

                      <div className="col-12 col-md-6 col-xl-4">
                        <div className="form-group local-forms">
                          <label>
                            Service Name <span className="login-danger">*</span>
                          </label>
                          <input
                            className="form-control"
                            type="text"
                            placeholder="Teeth cleaning"
                            {...register("service_name", {
                              required: "Please Enter Service Name",
                              maxLength: {
                                value: 150,
                                message: "Service Name must be lower than 150 characters",
                              },
                            })}
                          />
                          {errors.service_name && <p className='error'>{errors.service_name.message}</p>}
                        </div>
                      </div>

                      <div className="col-12 col-md-6 col-xl-4">
                        <div className="form-group local-forms">
                          <label>
                            Charge <span className="login-danger">*</span>
                          </label>
                          <input
                            className="form-control"
                            type="number"
                            placeholder="Enter charge amount"
                            {...register("charge", {
                              required: "Please Enter Charge Amount",
                              min: {
                                value: 0,
                                message: "Charge cannot be less than 0",
                              },
                              valueAsNumber: true, // Ensures the input is treated as a number
                            })}
                          />
                          {errors.charge && <p className='error'>{errors.charge.message}</p>}
                        </div>
                      </div>
                      <div className="col-12 col-md-6 col-xl-5">
                        <div className="select-gender">
                            <label className="gen-label">Status:</label>

                            <div className="">
                                <label className="form-check-label">
                                    <input
                                        type="checkbox"
                                        className="form-check-input"
                                        checked={isActive === true}
                                        onChange={() => setIsActive(true)}
                                    />
                                    Active
                                </label>
                            </div>

                            <div className="">
                                <label className="form-check-label">
                                    <input
                                        type="checkbox"
                                        className="form-check-input"
                                        checked={isActive === false}
                                        onChange={() => setIsActive(false)}
                                    />
                                    Not Active
                                </label>
                            </div>
                        </div>
                      </div>


                      <div className="col-12">
                        <div className="doctor-submit text-end">
                          <button
                            type="submit"
                            className="btn btn-primary submit-form me-2"
                          >
                            Edit
                          </button>
                          <Link to="/servicesLink"
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
      </div>
    </div>
  );
};

export default EditService;
