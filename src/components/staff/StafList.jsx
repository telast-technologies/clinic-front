/* eslint-disable no-unused-vars */
import React from 'react'
import {  Table } from "antd";
import Header from '../Header';
import Sidebar from '../Sidebar';
import { blogimg10, imagesend, pdficon, pdficon3, pdficon4, plusicon, refreshicon, searchnormal, blogimg12,
        blogimg2, blogimg4, blogimg6, blogimg8} from '../imagepath';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import FeatherIcon from 'feather-icons-react/build/FeatherIcon';
import {onShowSizeChange,itemRender}from  '../Pagination'
import Api from '../../_Utils/Api'


const StaffList = () => {
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [datasource, setdatasource] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [isAdmin, setIsAdmin] = useState(null);
    const [isActive, setIsActive] = useState(null);
    const [deleteId, setDeleteId] = useState();
    const [currentPage, setCurrentPage] = useState(1);
    const [dataCount, setDataCount] = useState(null);

    const handleActiveChange = (value) => {
      if (isActive === value) {
          setIsActive(null);
      } else {
          setIsActive(value);
      }
  };

  const handleAdminChange = (value) => {
      if (isAdmin === value) {
          setIsAdmin(null);
      } else {
          setIsAdmin(value);
      }
  };

    const onSelectChange = (newSelectedRowKeys) => {
      console.log("selectedRowKeys changed: ", selectedRowKeys);
      setSelectedRowKeys(newSelectedRowKeys);
    };

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
      };

    const columns = [
      {
        title: "ID",
        render: (text, record) => record.user.id,
      },
      {
          title: "Name",
          dataIndex: "user",
          render: (user, record) => (
              <h2 className="profile-image">
                <Link to={`/staffprofile?id=${record.uid}`}>{`${user.first_name} ${user.last_name}`}</Link>
              </h2>
          )
      },
      {
          title: "Email",
          render: (text, record) => record.user.email,
          sorter: (a, b) => a.user.email.localeCompare(b.user.email),
      },
      {
          title: "Phone",
          render: (text, record) => record.user.phone,
      },
      {
          title: "Status",
          render: (text, record) => (
            <span className={`custom-badge status-${record.user.is_active ? 'green' : 'pink'}`}>
                {record.user.is_active ? 'Active': 'Not Active'}
            </span>
          ),
      },
      {
          title: "Client Admin",
          dataIndex: "is_client_admin",
          render: (isClientAdmin) => (
              <span className={`custom-badge status-${isClientAdmin ? 'green' : 'pink'}`}>
                  {isClientAdmin ? 'Admin': 'Not Admin'}
              </span>
          ),
      },
      {
          title: "",
          dataIndex: "action",
          render: (_, record) => (
              <div className="text-end">
                  <div className="dropdown dropdown-action">
                      <Link
                          to="#"
                          className="action-icon dropdown-toggle"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                      >
                          <i className="fas fa-ellipsis-v" />
                      </Link>
                      <div className="dropdown-menu dropdown-menu-end">
                          <Link className="dropdown-item" to={`/editstaff?id=${record.uid}`}>
                              <i className="far fa-edit me-2" />
                              Edit
                          </Link>
                          <Link className="dropdown-item" to="#" data-bs-toggle="modal" data-bs-target="#delete_patient" onClick={()=> setDeleteId(record.uid)}>
                              <i className="fa fa-trash-alt m-r-5"></i> Delete
                          </Link>
                      </div>
                  </div>
              </div>
          ),
      },
    ];

    useEffect(() => {
      Api.get_all_staff(searchTerm, isAdmin, isActive, currentPage).then(res=> {
        setdatasource(res.data.results)
      })
    }, [searchTerm, isAdmin, isActive, currentPage]);


    // handle Delete Staff
    const handleDeleteStaff = () => {
      Api.delete_staff(deleteId).then(res => {
          window.location.href = '/stafflist'
        }).catch(error => {
          console.log(error);
        })
      };

  // Pagination control functions
  const onShowSizeChange = (current) => {
    setCurrentPage(current);
  };

  const itemRender = (current, type, originalElement) => {
    if (type === 'prev') return <a>Previous</a>;
    if (type === 'next') return <a>Next</a>;
    return originalElement;
  };


  return (
    <>
    <Header />
    <Sidebar id='menu-item3' id1='menu-items3' activeClassName='staff-list' />
    <>
  <div className="page-wrapper">
    <div className="content">
      {/* Page Header */}
      <div className="page-header">
        <div className="row">
          <div className="col-sm-12">
            <ul className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="#">Staff </Link>
              </li>
              <li className="breadcrumb-item">
                <i className="feather-chevron-right">
                  <FeatherIcon icon="chevron-right"/>
                  </i>
              </li>
              <li className="breadcrumb-item active">Staff List</li>
            </ul>
          </div>
        </div>
      </div>
      {/* /Page Header */}
      <div className="row">
        <div className="col-sm-12">
          <div className="card card-table show-entire">
            <div className="card-body">
              {/* Table Header */}
              <div className="page-table-header mb-2">
                <div className="row align-items-center">
                  <div className="col">
                    <div className="doctor-table-blk">
                      <h3> Staff List</h3>
                      <div className="doctor-search-blk">
                        <div className="top-nav-search table-search-blk">
                          <form>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Search here"
                              value={searchTerm}
                              onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <Link className="btn">
                              <img
                                src={searchnormal}
                              alt="#"
                              />
                            </Link>
                          </form>
                        </div>
                        <div className="add-group">
                          <Link
                            to="/addstaff"
                            className="btn btn-primary add-pluss ms-2"
                          >
                            <img src={plusicon} alt="#" />
                          </Link>
                          <Link
                            to="#"
                            className="btn btn-primary doctor-refresh ms-2"
                          >
                            <img src={refreshicon} alt="#" />
                          </Link>
                        </div>
                        <div className='more-options'>
                            <div className="col-12 col-md-6 col-xl-4">
                                <div className="select-gender">
                                    <label className="gen-label">Status:</label>

                                    <div className="">
                                        <label className="form-check-label">
                                            <input
                                                type="checkbox"
                                                className="form-check-input"
                                                checked={isActive === true}
                                                onChange={() => handleActiveChange(true)}
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
                                                onChange={() => handleActiveChange(false)}
                                            />
                                            Not Active
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <div className="col-12 col-md-6 col-xl-4">
                                <div className="select-gender">
                                    <label className="gen-label">Admin:</label>
                                    <div className="">
                                        <label className="form-check-label">
                                            <input
                                                type="checkbox"
                                                className="form-check-input"
                                                checked={isAdmin === true}
                                                onChange={() => handleAdminChange(true)}
                                            />
                                            Admin
                                        </label>
                                    </div>
                                    <div className="">
                                        <label className="form-check-label">
                                            <input
                                                type="checkbox"
                                                className="form-check-input"
                                                checked={isAdmin === false}
                                                onChange={() => handleAdminChange(false)}
                                            />
                                            Not Admin
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-auto text-end float-end ms-auto download-grp">
                    <Link to="#" className=" me-2">
                      <img src={pdficon} alt="#" />
                    </Link>
                    <Link to="#" className=" me-2">
                    </Link>
                    <Link to="#" className=" me-2">
                      <img src={pdficon3} alt="#" />
                    </Link>
                    <Link to="#">
                      <img src={pdficon4} alt="#" />
                    </Link>
                  </div>
                </div>
              </div>
              {/* /Table Header */}
              <div className="table-responsive doctor-list">
                <Table
                  pagination={{
                    current: currentPage,
                    total: dataCount,
                    pageSize: 10,
                    onChange: onShowSizeChange,
                    showTotal: (total, range) => `Showing ${range[0]} to ${range[1]} of ${total} entries`,
                    itemRender: itemRender,
                  }}
                  columns={columns}
                  dataSource={datasource}
                  rowSelection={rowSelection}
                  rowKey={(record, index) => index + 1}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="notification-box">
      <div className="msg-sidebar notifications msg-noti">
        <div className="topnav-dropdown-header">
          <span>Messages</span>
        </div>
        <div className="drop-scroll msg-list-scroll" id="msg_list">
          <ul className="list-box">
            <li>
              <Link to="#">
                <div className="list-item">
                  <div className="list-left">
                    <span className="avatar">R</span>
                  </div>
                  <div className="list-body">
                    <span className="message-author">Richard Miles </span>
                    <span className="message-time">12:28 AM</span>
                    <div className="clearfix" />
                    <span className="message-content">
                      Lorem ipsum dolor sit amet, consectetur adipiscing
                    </span>
                  </div>
                </div>
              </Link>
            </li>
            <li>
              <Link to="#">
                <div className="list-item new-message">
                  <div className="list-left">
                    <span className="avatar">J</span>
                  </div>
                  <div className="list-body">
                    <span className="message-author">John Doe</span>
                    <span className="message-time">1 Aug</span>
                    <div className="clearfix" />
                    <span className="message-content">
                      Lorem ipsum dolor sit amet, consectetur adipiscing
                    </span>
                  </div>
                </div>
              </Link>
            </li>
            <li>
              <Link to="#">
                <div className="list-item">
                  <div className="list-left">
                    <span className="avatar">T</span>
                  </div>
                  <div className="list-body">
                    <span className="message-author"> Tarah Shropshire </span>
                    <span className="message-time">12:28 AM</span>
                    <div className="clearfix" />
                    <span className="message-content">
                      Lorem ipsum dolor sit amet, consectetur adipiscing
                    </span>
                  </div>
                </div>
              </Link>
            </li>
            <li>
              <Link to="#">
                <div className="list-item">
                  <div className="list-left">
                    <span className="avatar">M</span>
                  </div>
                  <div className="list-body">
                    <span className="message-author">Mike Litorus</span>
                    <span className="message-time">12:28 AM</span>
                    <div className="clearfix" />
                    <span className="message-content">
                      Lorem ipsum dolor sit amet, consectetur adipiscing
                    </span>
                  </div>
                </div>
              </Link>
            </li>
            <li>
              <Link to="#">
                <div className="list-item">
                  <div className="list-left">
                    <span className="avatar">C</span>
                  </div>
                  <div className="list-body">
                    <span className="message-author"> Catherine Manseau </span>
                    <span className="message-time">12:28 AM</span>
                    <div className="clearfix" />
                    <span className="message-content">
                      Lorem ipsum dolor sit amet, consectetur adipiscing
                    </span>
                  </div>
                </div>
              </Link>
            </li>
            <li>
              <Link to="#">
                <div className="list-item">
                  <div className="list-left">
                    <span className="avatar">D</span>
                  </div>
                  <div className="list-body">
                    <span className="message-author"> Domenic Houston </span>
                    <span className="message-time">12:28 AM</span>
                    <div className="clearfix" />
                    <span className="message-content">
                      Lorem ipsum dolor sit amet, consectetur adipiscing
                    </span>
                  </div>
                </div>
              </Link>
            </li>
            <li>
              <Link to="#">
                <div className="list-item">
                  <div className="list-left">
                    <span className="avatar">B</span>
                  </div>
                  <div className="list-body">
                    <span className="message-author"> Buster Wigton </span>
                    <span className="message-time">12:28 AM</span>
                    <div className="clearfix" />
                    <span className="message-content">
                      Lorem ipsum dolor sit amet, consectetur adipiscing
                    </span>
                  </div>
                </div>
              </Link>
            </li>
            <li>
              <Link to="#">
                <div className="list-item">
                  <div className="list-left">
                    <span className="avatar">R</span>
                  </div>
                  <div className="list-body">
                    <span className="message-author"> Rolland Webber </span>
                    <span className="message-time">12:28 AM</span>
                    <div className="clearfix" />
                    <span className="message-content">
                      Lorem ipsum dolor sit amet, consectetur adipiscing
                    </span>
                  </div>
                </div>
              </Link>
            </li>
            <li>
              <Link to="#">
                <div className="list-item">
                  <div className="list-left">
                    <span className="avatar">C</span>
                  </div>
                  <div className="list-body">
                    <span className="message-author"> Claire Mapes </span>
                    <span className="message-time">12:28 AM</span>
                    <div className="clearfix" />
                    <span className="message-content">
                      Lorem ipsum dolor sit amet, consectetur adipiscing
                    </span>
                  </div>
                </div>
              </Link>
            </li>
            <li>
              <Link to="#">
                <div className="list-item">
                  <div className="list-left">
                    <span className="avatar">M</span>
                  </div>
                  <div className="list-body">
                    <span className="message-author">Melita Faucher</span>
                    <span className="message-time">12:28 AM</span>
                    <div className="clearfix" />
                    <span className="message-content">
                      Lorem ipsum dolor sit amet, consectetur adipiscing
                    </span>
                  </div>
                </div>
              </Link>
            </li>
            <li>
              <Link to="#">
                <div className="list-item">
                  <div className="list-left">
                    <span className="avatar">J</span>
                  </div>
                  <div className="list-body">
                    <span className="message-author">Jeffery Lalor</span>
                    <span className="message-time">12:28 AM</span>
                    <div className="clearfix" />
                    <span className="message-content">
                      Lorem ipsum dolor sit amet, consectetur adipiscing
                    </span>
                  </div>
                </div>
              </Link>
            </li>
            <li>
              <Link to="#">
                <div className="list-item">
                  <div className="list-left">
                    <span className="avatar">L</span>
                  </div>
                  <div className="list-body">
                    <span className="message-author">Loren Gatlin</span>
                    <span className="message-time">12:28 AM</span>
                    <div className="clearfix" />
                    <span className="message-content">
                      Lorem ipsum dolor sit amet, consectetur adipiscing
                    </span>
                  </div>
                </div>
              </Link>
            </li>
            <li>
              <Link to="#">
                <div className="list-item">
                  <div className="list-left">
                    <span className="avatar">T</span>
                  </div>
                  <div className="list-body">
                    <span className="message-author">Tarah Shropshire</span>
                    <span className="message-time">12:28 AM</span>
                    <div className="clearfix" />
                    <span className="message-content">
                      Lorem ipsum dolor sit amet, consectetur adipiscing
                    </span>
                  </div>
                </div>
              </Link>
            </li>
          </ul>
        </div>
        <div className="topnav-dropdown-footer">
          <Link to="#">See all messages</Link>
        </div>
      </div>
    </div>
  </div>
  <div id="delete_patient" className="modal fade delete-modal" role="dialog">
    <div className="modal-dialog modal-dialog-centered">
      <div className="modal-content">
        <div className="modal-body text-center">
          <img src={imagesend} alt="#" width={50} height={46} />
          <h3>Are you sure want to delete this ?</h3>
          <div className="m-t-20">
            {" "}
            <Link to="#" className="btn btn-white me-2" data-bs-dismiss="modal">
              Close
            </Link>
            <button type="submit" className="btn btn-danger" onClick={handleDeleteStaff}>
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</>
</>
  )
}

export default StaffList;
