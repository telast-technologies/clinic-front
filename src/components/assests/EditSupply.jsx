/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import Header from "../Header";
import Sidebar from "../Sidebar";
import { Link } from 'react-router-dom';
import { useForm } from "react-hook-form";
import Api from '../../_Utils/Api';
import { useLocation } from 'react-router-dom';

const EditSupply = () => {

  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }
  const query = useQuery();
  const supplyId = query.get('id');

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  useEffect(() => {
    Api.get_single_supply(supplyId).then(res => {
      if (res.data) {
        setValue("item", res.data.item);
        setValue("invoice", res.data.invoice);
        setValue("profit_share", res.data.profit_share);
        setValue("unit_cost", res.data.unit_cost);
        setValue("quantity", res.data.quantity);
      }
    }).catch(error => {
      console.log(error);
    });
  }, [supplyId, setValue]);

  const onSubmit = (data) => {
    const supplyData = {
      item: data.item,
      invoice: data.invoice,
      profit_share: data.profit_share,
      unit_cost: data.unit_cost,
      quantity: data.quantity,
    };
    Api.edit_supply(supplyId, supplyData).then(res => {
      window.location.href = 'supplies'
    }).catch(error => {
      console.log(error);
    });
  };


  return (
    <div>
      <Header />
      <Sidebar id='menu-item11' id1='menu-items11' activeClassName='EditSupply' />
      <div className="page-wrapper">
        <div className="content">
          {/* Page Header */}
          <div className="page-header">
            <div className="row">
              <div className="col-sm-12">
                <ul className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to="/supplies">Supplies </Link>
                  </li>
                  <li className="breadcrumb-item">
                    <i className="feather-chevron-right">
                      {/* FeatherIcon component removed for simplicity */}
                    </i>
                  </li>
                  <li className="breadcrumb-item active">Edit Supply</li>
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
                          <h4>Supply Details</h4>
                        </div>
                      </div>

                      {/* Item */}
                      <div className="col-12 col-md-6 col-xl-4">
                        <div className="form-group local-forms">
                          <label>
                            Item <span className="login-danger">*</span>
                          </label>
                          <input
                            className="form-control"
                            type="text"
                            placeholder="Enter item name"
                            {...register("item", {
                              required: "Please enter the item name",
                              minLength: {
                                value: 1,
                                message: "Item name must be at least 1 character",
                              },
                              maxLength: {
                                value: 255,
                                message: "Item name cannot exceed 255 characters",
                              }
                            })}
                          />
                          {errors.item && <p className='error'>{errors.item.message}</p>}
                        </div>
                      </div>

                      {/* Invoice Number */}
                      <div className="col-12 col-md-6 col-xl-4">
                        <div className="form-group local-forms">
                          <label>
                            Invoice Number <span className="login-danger">*</span>
                          </label>
                          <input
                            className="form-control"
                            type="number"
                            placeholder="Enter invoice number"
                            {...register("invoice", {
                              required: "Please enter invoice number",
                              min: {
                                value: 0,
                                message: "Invoice number cannot be less than 0",
                              },
                              max: {
                                value: 32767,
                                message: "Invoice number cannot exceed 32767",
                              }
                            })}
                          />
                          {errors.invoice && <p className='error'>{errors.invoice.message}</p>}
                        </div>
                      </div>

                      {/* Profit Share */}
                      <div className="col-12 col-md-6 col-xl-4">
                        <div className="form-group local-forms">
                          <label>
                            Profit Share (%) <span className="login-danger">*</span>
                          </label>
                          <input
                            className="form-control"
                            type="number"
                            step="0.01"
                            placeholder="Enter profit share"
                            {...register("profit_share", {
                              required: "Please enter profit share",
                              min: {
                                value: 0,
                                message: "Profit share cannot be less than 0",
                              },
                              max: {
                                value: 100,
                                message: "Profit share cannot exceed 100",
                              }
                            })}
                          />
                          {errors.profit_share && <p className='error'>{errors.profit_share.message}</p>}
                        </div>
                      </div>

                      {/* Unit Cost */}
                      <div className="col-12 col-md-6 col-xl-4">
                        <div className="form-group local-forms">
                          <label>
                            Unit Cost <span className="login-danger">*</span>
                          </label>
                          <input
                            className="form-control"
                            type="number"
                            step="0.01"
                            placeholder="Enter unit cost"
                            {...register("unit_cost", {
                              required: "Please enter unit cost",
                              min: {
                                value: 0,
                                message: "Unit cost cannot be less than 0",
                              }
                            })}
                          />
                          {errors.unit_cost && <p className='error'>{errors.unit_cost.message}</p>}
                        </div>
                      </div>

                      {/* Quantity */}
                      <div className="col-12 col-md-6 col-xl-4">
                        <div className="form-group local-forms">
                          <label>
                            Quantity <span className="login-danger">*</span>
                          </label>
                          <input
                            className="form-control"
                            type="number"
                            step="0.01"
                            placeholder="Enter quantity"
                            {...register("quantity", {
                              required: "Please enter quantity",
                              min: {
                                value: 0,
                                message: "Quantity cannot be less than 0",
                              }
                            })}
                          />
                          {errors.quantity && <p className='error'>{errors.quantity.message}</p>}
                        </div>
                      </div>

                      {/* Submit and Cancel Buttons */}
                      <div className="col-12">
                        <div className="doctor-submit text-end">
                          <button
                            type="submit"
                            className="btn btn-primary submit-form me-2"
                          >
                            Edit
                          </button>
                          <Link to="/supplies"
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

export default EditSupply;
