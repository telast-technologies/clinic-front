import React, { useState, useEffect } from 'react';
import { Table } from 'antd';
import { Link } from 'react-router-dom';
import Api from '../../_Utils/Api';
import FeatherIcon from 'feather-icons-react/build/FeatherIcon';
import { onShowSizeChange, itemRender } from '../Pagination';
import Header from '../Header';
import Sidebar from '../Sidebar';
import { searchnormal, plusicon, refreshicon, pdficon, pdficon3, pdficon4, imagesend } from '../imagepath';

const Services = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [datasource, setDatasource] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isActive, setIsActive] = useState(null);
  const [deleteId, setDeleteId] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [dataCount, setDataCount] = useState(null);

  console.log(currentPage);

  const handleActiveChange = (value) => {
    setIsActive(isActive === value ? null : value);
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
    { title: 'Name', render: (text, record) => record.name },
    { title: 'Charge', render: (text, record) => `$${record.charge.toFixed(2)}` },
    { title: 'Status', render: (text, record) => (
        <span className={`custom-badge status-${record.active ? 'green' : 'pink'}`}>
            {record.active ? 'Active': 'Not Active'}
        </span>
    )},
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
              <Link className="dropdown-item" to={`/editservice?id=${record.uid}`}>
                <i className="far fa-edit me-2" />
                Edit
              </Link>
              <Link className="dropdown-item" to="#" data-bs-toggle="modal" data-bs-target="#delete_patient" onClick={() => setDeleteId(record.uid)}>
                <i className="fa fa-trash-alt m-r-5"></i> Delete
              </Link>
            </div>
          </div>
        </div>
      ),
    },
  ];

  // Refetch data when page, searchTerm, or isActive change
  useEffect(() => {
    Api.get_all_service(searchTerm, isActive, currentPage)
      .then((res) => {
        setDatasource(res.data.results);
        setDataCount(res.data.count);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [currentPage, searchTerm, isActive]); // Ensure all dependencies are included

  // Handle delete action
  const handleDeleteService = () => {
    Api.delete_service(deleteId)
      .then(() => {
        window.location.href = '/services';
      })
      .catch((error) => {
        console.log(error);
      });
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
    <Sidebar id='menu-item11' id1='menu-items11' activeClassName='Services' />
    <>
  <div className="page-wrapper">
    <div className="content">
      {/* Page Header */}
      <div className="page-header">
            <div className="row">
              <div className="col-sm-12">
                <ul className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to="/services">Services </Link>
                  </li>
                  <li className="breadcrumb-item">
                    <i className="feather-chevron-right">
                      <FeatherIcon icon="chevron-right"/>
                      </i>
                  </li>
                  <li className="breadcrumb-item active">Services List</li>
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
                      <h3>Services List</h3>
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
                            to="/addservice"
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
            <button type="submit" className="btn btn-danger" onClick={handleDeleteService}>
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

export default Services;