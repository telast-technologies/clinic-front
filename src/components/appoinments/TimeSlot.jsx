import React, { useState, useEffect } from 'react';
import { Table } from 'antd';
import { Link } from 'react-router-dom';
import Api from '../../_Utils/Api';
import FeatherIcon from 'feather-icons-react/build/FeatherIcon';
import Header from '../Header';
import Sidebar from '../Sidebar';
import { TextField } from "@mui/material";
import Select from "react-select";
import { imagesend, pdficon, pdficon3, pdficon4, plusicon, refreshicon} from '../imagepath';

const daysEnum = [
  { value: "monday", label: "Monday" },
  { value: "tuesday", label: "Tuesday" },
  { value: "wednesday", label: "Wednesday" },
  { value: "thursday", label: "Thursday" },
  { value: "friday", label: "Friday" },
  { value: "saturday", label: "Saturday" },
  { value: "sunday", label: "Sunday" },
];

const TimeSlot = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [datasource, setDatasource] = useState([]);
  const [deleteId, setDeleteId] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [dataCount, setDataCount] = useState(null);
  const [timeZone, setTimeZone] = useState({
    startTime: '',
    endTime: ''
  });
  const [selectedDays, setSelectedDays] = useState();

  const handleTimeChange = (e, field) => {
    setTimeZone((prevTimeZone) => ({
      ...prevTimeZone,
      [field]: e.target.value,
    }));
  };

  const handleDaysChange = (days) => {
    setSelectedDays((prev) => prev == days ? null : days);
  };

  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const columns = [
    { title: 'ID', render: (text, record, index) => index + 1 },
    { title: 'Start Time', render: (text, record) => record.start_time },
    { title: 'End Time', render: (text, record) => record.end_time },
    { title: 'Days', render: (text, record) => record.days.join(', ') },
    {
      title: '',
      dataIndex: 'action',
      render: (_, record) => (
        <div className="text-end">
          <div className="dropdown dropdown-action">
            <Link to="#" className="action-icon dropdown-toggle" data-bs-toggle="dropdown">
              <i className="fas fa-ellipsis-v" />
            </Link>
            <div className="dropdown-menu dropdown-menu-end">
              <Link className="dropdown-item" to={`/edittimeslot?id=${record.id}`}>
                <i className="far fa-edit me-2" />
                Edit
              </Link>
              <Link className="dropdown-item" to="#" data-bs-toggle="modal" data-bs-target="#delete_visit_slot" onClick={() => setDeleteId(record.id)}>
                <i className="fa fa-trash-alt m-r-5"></i> Delete
              </Link>
            </div>
          </div>
        </div>
      ),
    },
  ];

  useEffect(() => {
    const selectedDayValues = selectedDays?.value;
    Api.get_all_visit_slots(selectedDayValues, currentPage, timeZone.endTime, timeZone.startTime)
      .then((res) => {
        setDatasource(res.data.results);
        setDataCount(res.data.count);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [currentPage, selectedDays, timeZone]);

  const handleDeleteVisitSlot = () => {
    Api.delete_visit_slot(deleteId)
      .then(() => {
        window.location.href = '/timeslot';
      })
      .catch((error) => {
        console.log(error);
      });
  };

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
      <Sidebar id="menu-item4" id1="menu-items4" activeClassName="TimeSlot" />
      <>
        <div className="page-wrapper">
          <div className="content">
            {/* Page Header */}
            <div className="page-header">
              <div className="row">
                <div className="col-sm-12">
                  <ul className="breadcrumb">
                    <li className="breadcrumb-item">
                      <Link to="timeslot">Time Slot</Link>
                    </li>
                    <li className="breadcrumb-item">
                      <i className="feather-chevron-right">
                        <FeatherIcon icon="chevron-right" />
                      </i>
                    </li>
                    <li className="breadcrumb-item active">All Time Slots</li>
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
                      <h3>Time Slots</h3>
                      <div className="doctor-search-blk">
                        <div className="add-group">
                          <Link
                            to="/addtimeslot"
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
                    <div className="page-table-header mb-2">
                      <div className="row">
                      <div className="col-12 col-md-6 col-xl-4">
                          <div className="form-group local-forms">
                            <label>Select Days</label>
                            <Select
                              value={selectedDays}
                              onChange={handleDaysChange}
                              options={daysEnum}
                              id="select-day"
                              components={{
                                IndicatorSeparator: () => null,
                              }}
                              styles={{
                                control: (baseStyles, state) => ({
                                  ...baseStyles,
                                  borderColor: state.isFocused
                                    ? "none"
                                    : "2px solid rgba(46, 55, 164, 0.1);",
                                  boxShadow: state.isFocused
                                    ? "0 0 0 1px #2e37a4"
                                    : "none",
                                  "&:hover": {
                                    borderColor: state.isFocused
                                      ? "none"
                                      : "2px solid rgba(46, 55, 164, 0.1)",
                                  },
                                  borderRadius: "10px",
                                  fontSize: "14px",
                                  minHeight: "45px",
                                }),
                                dropdownIndicator: (base, state) => ({
                                  ...base,
                                  transform: state.selectProps.menuIsOpen
                                    ? "rotate(-180deg)"
                                    : "rotate(0)",
                                  transition: "250ms",
                                  width: "35px",
                                  height: "35px",
                                }),
                              }}
                            />
                          </div>
                        </div>
                        <div className="col-12 col-md-6 col-xl-4">
                          <div className="form-group local-forms">
                            <label>From</label>
                            <TextField
                              className="form-control"
                              type="time"
                              onChange={(e) => handleTimeChange(e, 'startTime')}
                            />
                          </div>
                        </div>

                        <div className="col-12 col-md-6 col-xl-4">
                          <div className="form-group local-forms">
                            <label>To</label>
                            <TextField
                              className="form-control"
                              type="time"
                              onChange={(e) => handleTimeChange(e, 'endTime')}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* /Table Header */}

                    <div className="table-responsive">
                      <Table
                        rowSelection={rowSelection}
                        className="table table-hover table-center mb-0 datatable"
                        columns={columns}
                        rowKey={(record) => record.id}
                        dataSource={datasource}
                        pagination={{
                          total: dataCount,
                          pageSize: 10,
                          current: currentPage,
                          onChange: onShowSizeChange,
                          itemRender: itemRender,
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* /Main Wrapper */}

        {/* Delete Modal */}
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
                  <button type="submit" className="btn btn-danger" onClick={handleDeleteVisitSlot}>
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    </>
  );
};

export default TimeSlot;
