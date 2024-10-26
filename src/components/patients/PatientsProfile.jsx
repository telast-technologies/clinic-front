import React from "react";
import { useState, useEffect } from "react";
import Header from "../Header";
import Sidebar from "../Sidebar";
import {
  cameraicon,
  doctor,
  imagesend,
  menuicon16,
  profilebg,
  profileuser01,
} from "../imagepath";
import FeatherIcon from "feather-icons-react";
import { Link } from "react-router-dom";
import Api from '../../_Utils/Api';
import { useLocation } from 'react-router-dom';
import { Trash2, Download, ExternalLink } from 'lucide-react';
import { useForm } from "react-hook-form";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const patientReports = [
  "Medical History Report",
  "Lab Test Results",
  "Radiology Report",
  "Prescriptions Summary",
  "Discharge Summary",
  "Follow-up Report",
  "Consultation Report",
  "Treatment Plan",
  "Vital Signs Record",
];


const PatientsProfile = () => {
  const query = useQuery();
  const patientId = query.get('id');
  const isEdit = query.get('edit');

  const [isEditPatient, setIsEditPatient] = useState(isEdit || false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();


  const [curentPatien, setCurentPatien] = useState();

  useEffect(() => {
    Api.get_single_patient(patientId).then(res => {
      setCurentPatien(res.data);
      if (res.data) {
        setValue("first_name", res.data.first_name);
        setValue("last_name", res.data.last_name);
        setValue("email", res.data.email || ""); // set empty string if null
        setValue("phone", res.data.phone);
        setValue("birthdate", res.data.birthdate ? res.data.birthdate.split("T")[0] : ""); // format the date
        setValue("address", res.data.address || ""); // set empty string if null
        setValue("nid", res.data.nid);
        setValue("channel", res.data.channel || "facebook"); // set default channel if null
      }
    }).catch(error => {
      console.log(error);
    });
  }, [patientId,setValue]);

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
    Api.edit_patient(patientId, patientData).then(res => {
      console.log(res);
      window.location.href = 'patientslist'
    }).catch(error => {
      console.log(error);
    });
  };


  return (
    <div>
      <>
        <Header />
        <Sidebar id="menu-item2" id1="menu-items2" activeClassName="PatientProfile" />
        <>
          <div className="page-wrapper">
            {curentPatien && (
              <div className="content">
                {/* Page Header */}
                <div className="page-header">
                  <div className="row">
                    <div className="col-sm-12">
                      <ul className="breadcrumb">
                        <li className="breadcrumb-item">
                          <Link to="/patientslist">Patients </Link>
                        </li>
                        <li className="breadcrumb-item">
                          <i className="feather-chevron-right">
                            <FeatherIcon icon="chevron-right" />
                          </i>
                        </li>
                        <li className="breadcrumb-item active">
                          Patient Profile
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                {/* /Page Header */}
                <div className="row patient">
                  <div className="col-sm-12">
                    <div className="card">
                      <div className="card-body">
                        <div className="row">
                          <div className="col-md-12">
                            <div className="about-info">
                              <h4>
                                Patients Profile{" "}
                                <span>
                                  <Link to="#">
                                    <i className="feather-more-vertical">
                                      <FeatherIcon icon="more-vertical" />
                                    </i>
                                  </Link>
                                </span>
                              </h4>
                            </div>
                            <div className="doctor-profile-head">
                              <div className="row">
                                <div className="col-lg-4 col-md-4">
                                  <div className="profile-user-box">
                                    <div className="profile-user-img">
                                      <img src={profileuser01} alt="Profile" />
                                      <div className="form-group doctor-up-files profile-edit-icon mb-0">
                                        <div className="uplod d-flex">
                                          <label className="file-upload profile-upbtn mb-0">
                                            <img src={cameraicon} alt="Profile" />
                                            <input type="file" />
                                          </label>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="names-profiles">
                                      <h4>{curentPatien.first_name} {curentPatien.last_name}</h4>
                                      <h5>{curentPatien.medical_number}</h5>
                                    </div>
                                  </div>
                                </div>
                                <div className="col-lg-4 col-md-4 d-flex align-items-center">
                                  <div className="follow-group doctor">
                                    <div className="doctor-follows patient">
                                      <h5>Tootal Visits</h5>
                                      <h4>06</h4>
                                    </div>
                                    <div className="doctor-follows patient">
                                      <h5>Tootal Earnings</h5>
                                      <h4>$12000</h4>
                                    </div>
                                  </div>
                                </div>
                                <div className="col-lg-4 col-md-4 d-flex align-items-center">
                                  <div className="follow-btn-group patient">
                                    <button
                                      className="btn btn-info message-btns patient"
                                    >
                                      Contact Patient
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-lg-4 reports-holder">
                        <h4 className="mb-3">Reports</h4>
                        <ul className="holder">
                          {patientReports.map((x,index) => (
                            <li key={index}>
                              <div className="left">
                                <img src={require('../../assets/img/patient reports.png')} alt="" />  
                                {x}
                              </div>
                              <div className="patient-reports-actions">
                                <ExternalLink />
                                <Download />
                                <Trash2 />
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="col-lg-8">
                        <div className="doctor-personals-grp">
                          <div className="card">
                            <div className="card-body" style={{paddingBottom: "0px"}}>
                              <div className="tab-content-set patient" style={{marginBottom: "-6px"}}>
                                <ul className="nav">
                                  <li>
                                    <Link onClick={()=> setIsEditPatient(false)}
                                      to={`/patientsprofile?id=${curentPatien.uid}`}
                                      className={`patient ${!isEditPatient ? 'active' : ''}`}
                                    >
                                      <span className="set-about-icon me-2">
                                        <img src={doctor} alt="" />
                                      </span>
                                      About me
                                    </Link>
                                  </li>
                                  <li>
                                    <Link onClick={()=> setIsEditPatient(true)} className={`patient ${isEditPatient ? 'active' : ''}`} to={`/patientsprofile?id=${curentPatien.uid}&edit=${true}`}>
                                      <span className="set-about-icon me-2">
                                        <img src={menuicon16} alt="" />
                                      </span>
                                      Edit Details
                                    </Link>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </div>
                          {isEditPatient ? (
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
                                          defaultValue={curentPatien?.first_name || ""}
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
                                          defaultValue={curentPatien?.last_name || ""}
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
                                          defaultValue={curentPatien?.email || ""}
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
                                          defaultValue={curentPatien?.phone || ""}
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
                                          defaultValue={curentPatien ? curentPatien.birthdate.split("T")[0] : ""}
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
                                          defaultValue={curentPatien?.address || ""}
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
                                          defaultValue={curentPatien?.nid || ""}
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
                                          defaultValue={curentPatien?.channel || "facebook"} // Set default value to a specific channel or based on patient data
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
                                          Edit
                                        </button>
                                        <Link to="/patientslLinkist" className="btn btn-primary cancel-form">
                                          Cancel
                                        </Link>
                                      </div>
                                    </div>
                                  </div>
                                </form>
                              </div>
                            </div>
                            ) : (
                              <>
                            <div className="card">
                              <div className="card-body" style={{padding: "23px"}}>
                                <div className="personal-list-out">
                                  <div className="row">
                                    <div className="col-xl-2 col-md-6">
                                      <div className="detail-personal">
                                        <h2>Date of Birth</h2>
                                        <h3>{curentPatien.birthdate ? curentPatien.birthdate.split("T")[0] : ""}</h3>
                                      </div>
                                    </div>
                                    <div className="col-xl-2 col-md-6">
                                      <div className="detail-personal">
                                        <h2>Mobile </h2>
                                        <h3>{curentPatien.phone}</h3>
                                      </div>
                                    </div>
                                    <div className="col-xl-4 col-md-6">
                                      <div className="detail-personal">
                                        <h2>Email</h2>
                                        <h3>{curentPatien.email}</h3>
                                      </div>
                                    </div>
                                    <div className="col-xl-4 col-md-6">
                                      <div className="detail-personal">
                                        <h2>Location</h2>
                                        <h3>{curentPatien.address}</h3>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="card">
                            <div className="card-header">
                              <h4 className="card-title">Visit Information</h4>
                            </div>
                            <div className="card-body p-0 table-dash">
                              <div className="table-responsive">
                                <table className="table mb-0 border-0 datatable custom-table patient-profile-table">
                                  <thead>
                                    <tr>
                                      <th>
                                        <div className="form-check check-tables">
                                          <input
                                            className="form-check-input"
                                            type="checkbox"
                                            defaultValue="something"
                                          />
                                        </div>
                                      </th>
                                      <th>Date</th>
                                      <th>Time</th>
                                      <th>Visit Type</th>
                                      <th />
                                    </tr>
                                  </thead>
                                  <tbody>
                                    <tr>
                                      <td>
                                        <div className="form-check check-tables">
                                          <input
                                            className="form-check-input"
                                            type="checkbox"
                                            defaultValue="something"
                                          />
                                        </div>
                                      </td>
                                      <td>29/09/2023</td>
                                      <td>10:30 AM</td>
                                      <td>Scheduled</td>
                                      <td className="text-end">
                                        <div className="dropdown dropdown-action">
                                          <Link
                                            to="#"
                                            className="action-icon dropdown-toggle"
                                            data-bs-toggle="dropdown"
                                            aria-expanded="false"
                                          >
                                            <i className="fa fa-ellipsis-v" />
                                          </Link>
                                          <div className="dropdown-menu dropdown-menu-end">
                                            <Link
                                              className="dropdown-item"
                                              to="/editvisit"
                                            >
                                              <i className="fa-solid fa-pen-to-square m-r-5" />{" "}
                                              Edit
                                            </Link>
                                            <Link
                                              className="dropdown-item"
                                              to="#"
                                              data-bs-toggle="modal"
                                              data-bs-target="#delete_visit"
                                            >
                                              <i className="fa fa-trash-alt m-r-5"></i>{" "}
                                              Delete
                                            </Link>
                                          </div>
                                        </div>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>
                                        <div className="form-check check-tables">
                                          <input
                                            className="form-check-input"
                                            type="checkbox"
                                            defaultValue="something"
                                          />
                                        </div>
                                      </td>
                                      <td>15/08/2023</td>
                                      <td>2:00 PM</td>
                                      <td>Walk-in</td>
                                      <td className="text-end">
                                        <div className="dropdown dropdown-action">
                                          <Link
                                            to="#"
                                            className="action-icon dropdown-toggle"
                                            data-bs-toggle="dropdown"
                                            aria-expanded="false"
                                          >
                                            <i className="fa fa-ellipsis-v" />
                                          </Link>
                                          <div className="dropdown-menu dropdown-menu-end">
                                            <Link
                                              className="dropdown-item"
                                              to="/editvisit"
                                            >
                                              <i className="fa-solid fa-pen-to-square m-r-5" />{" "}
                                              Edit
                                            </Link>
                                            <Link
                                              className="dropdown-item"
                                              to="#"
                                              data-bs-toggle="modal"
                                              data-bs-target="#delete_visit"
                                            >
                                              <i className="fa fa-trash-alt m-r-5"></i>{" "}
                                              Delete
                                            </Link>
                                          </div>
                                        </div>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>
                                        <div className="form-check check-tables">
                                          <input
                                            className="form-check-input"
                                            type="checkbox"
                                            defaultValue="something"
                                          />
                                        </div>
                                      </td>
                                      <td>10/07/2023</td>
                                      <td>9:45 AM</td>
                                      <td>Scheduled</td>
                                      <td className="text-end">
                                        <div className="dropdown dropdown-action">
                                          <Link
                                            to="#"
                                            className="action-icon dropdown-toggle"
                                            data-bs-toggle="dropdown"
                                            aria-expanded="false"
                                          >
                                            <i className="fa fa-ellipsis-v" />
                                          </Link>
                                          <div className="dropdown-menu dropdown-menu-end">
                                            <Link
                                              className="dropdown-item"
                                              to="/editvisit"
                                            >
                                              <i className="fa-solid fa-pen-to-square m-r-5" />{" "}
                                              Edit
                                            </Link>
                                            <Link
                                              className="dropdown-item"
                                              to="#"
                                              data-bs-toggle="modal"
                                              data-bs-target="#delete_visit"
                                            >
                                              <i className="fa fa-trash-alt m-r-5"></i>{" "}
                                              Delete
                                            </Link>
                                          </div>
                                        </div>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                            </div>
</div>

                              </>
                            )
                          }
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div
            id="delete_patient"
            className="modal fade delete-modal"
            role="dialog"
          >
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-body text-center">
                  <img src={imagesend} alt="" width={50} height={46} />
                  <h3>Are you sure want to delete this ?</h3>
                  <div className="m-t-20">
                    {" "}
                    <Link
                      to="#"
                      className="btn btn-white me-2"
                      data-bs-dismiss="modal"
                    >
                      Close
                    </Link>
                    <button type="submit" className="btn btn-danger">
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      </>
    </div>
  );
};

export default PatientsProfile;
