import React, { useState, useEffect } from "react";
import Header from "../Header";
import Sidebar from "../Sidebar";
import FeatherIcon from "feather-icons-react/build/FeatherIcon";
import { imagesend } from "../imagepath";
import Select from 'react-select';
import { Link } from "react-router-dom";
import Api from '../../_Utils/Api';
import { useForm } from "react-hook-form";
import { useLocation } from 'react-router-dom';
import { useStateContext } from "../../shared/Context";
import SelectPermission from "./SelectPermission";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const StaffProfile = () => {
  const query = useQuery();
  const staffId = query.get('id');

  const { selectedPermissions, setSelectedPermissions } = useStateContext();
  const [curentStaff, setCurentStaff] = useState();

console.log(curentStaff);

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

  return (
    <div>
      <>
        <Header />
        <Sidebar id='menu-item3' id1='menu-items3' activeClassName='staff-profile' />
        <div className="page-wrapper">
          {curentStaff && (
            <div className="content">
              {/* Page Header */}
              <div className="page-header">
                <div className="row">
                  <div className="col-sm-12">
                    <ul className="breadcrumb">
                      <li className="breadcrumb-item">
                        <Link to="#">Staffs </Link>
                      </li>
                      <li className="breadcrumb-item">
                        <i className="feather-chevron-right">
                          <FeatherIcon icon="chevron-right" />
                        </i>
                      </li>
                      <li className="breadcrumb-item active">Staff Profile</li>
                    </ul>
                  </div>
                </div>
              </div>
              {/* /Page Header */}
              <div className="row">
                <div className="col-sm-12">
                  <div className="card">
                    <div className="card-body">
                      <form>
                        <div className="row">
                          <div className="col-12">
                            <div className="form-heading">
                              <h4>Staff Profile</h4>
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
                                disabled={true}
                              />
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
                                disabled={true}
                              />
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
                                disabled={true}
                              />
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
                                disabled={true}
                              />
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
                                disabled={true}
                              />
                            </div>
                          </div>

                          <SelectPermission select={false}/>

                          <div className="col-12 col-md-6 col-xl-2">
                            <div className="select-gender">
                              <label className="gen-label">
                                Status <span className="login-danger">*</span>
                              </label>
                              {curentStaff.user?.is_active ? (
                                <div className="form-check-inline">
                                  <label className="form-check-label">
                                    <input
                                      type="radio"
                                      value={true}
                                      defaultChecked={curentStaff.user?.is_active} // Set default checked
                                      className="form-check-input"
                                    />
                                    Active
                                  </label>
                                </div>
                              ) : (
                                <div className="form-check-inline">
                                  <label className="form-check-label">
                                    <input
                                      type="radio"
                                      value={false}
                                      defaultChecked={!curentStaff.user?.is_active} // Set default checked
                                      className="form-check-input"
                                    />
                                    Not Active
                                  </label>
                                </div>
                              )}
                            </div>
                          </div>

                          <div className="col-12 col-md-6 col-xl-2">
                            <div className="select-gender">
                              <label className="gen-label">
                                Admin <span className="login-danger">*</span>
                              </label>
                              {curentStaff.is_client_admin ? (
                                <div className="form-check-inline">
                                  <label className="form-check-label">
                                    <input
                                      type="radio"
                                      value={true}
                                      defaultChecked={curentStaff.is_client_admin} // Set default checked
                                      className="form-check-input"
                                    />
                                    Yes
                                  </label>
                                </div>
                              ) : (
                                <div className="form-check-inline">
                                  <label className="form-check-label">
                                    <input
                                      type="radio"
                                      value={false}
                                      defaultChecked={!curentStaff.is_client_admin} // Set default checked
                                      className="form-check-input"
                                    />
                                    No
                                  </label>
                                </div>
                              )}
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

export default StaffProfile;