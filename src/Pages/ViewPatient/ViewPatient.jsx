import React, { useContext, useState } from "react";
import NavMenu from "../../Components/NavMenu/NavMenu";
import Navbar from "../../Components/Navbar/Navbar";
import BasicTable from "../../Components/PatientTable/BasicTable";
import axios from "axios";
import { AppContext } from "../../shared/AppContext";
import { useQuery } from "@tanstack/react-query";
import TableHeader from "../../Components/TableHeader/TableHeader";
import { COLUMNS } from "../../Components/PatientTable/columns";
import BounceLoader from "react-spinners/BounceLoader";
import ErrorBlock from "../../Components/ErrorBlock/ErrorBlock";
import AddPatientForm from "../../Components/AddPatientForm/AddPatientForm";
import { ColumnFilter } from "../../Components/PatientTable/ColumnFilter";
import Tippy from "@tippyjs/react";
import styles from "../../Components/PatientTable/columns.module.css";
import {
  FaEdit,
  FaCalendarAlt,
  FaFileAlt,
  FaUserAlt,
  FaTrash,
} from "react-icons/fa";
const ViewPatient = () => {
  const { token } = useContext(AppContext);
  const [addPatient, setAddPatient] = useState(false);
  const [patient, setPatient] = useState(null);

  const getPatientData = () => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`, // Set authorization header
      },
    };
    return axios.get(
      "https://clinic.telast.tech/api/v1/patients/patient/",
      config
    );
  };

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["getData"],
    queryFn: getPatientData,
  });

  const navigationfn = () => {
    setAddPatient(!addPatient);
  };

  return (
    <div>
      <NavMenu />
      <div className="main">
        <Navbar />
        <div className="tableContainer">
          {data && (
            <TableHeader
              name="Patients List"
              navigationfn={navigationfn}
              btnName="Add Patient"
              addMode={!addPatient}
            />
          )}
          {addPatient && (
            <AddPatientForm
              patient={patient}
              setAddPatient={setAddPatient}
              refetch={refetch}
            />
          )}
          {data && (
            <BasicTable
              data={data?.data?.results}
              columns={[
                // { Header: "Id", accessor: "id", Filter: ColumnFilter },
                {
                  Header: "Medical Number",
                  accessor: (row) => `${row.uid}`,
                  Filter: ColumnFilter,
                },

                {
                  Header: "Name",
                  accessor: (row) => `${row.first_name} ${row.last_name}`, // Concatenate first_name and last_name
                  Filter: ColumnFilter,
                  Cell: ({ value }) => <span>{value}</span>,

                  // disableFilters: true,
                },
                // { Header: "Last Name", accessor: "last_name", Filter: ColumnFilter },
                // {
                //   Header: "Date Of Birth",
                //   accessor: "birthdate",
                //   Cell: ({ value }) => {
                //     return format(value, "dd/mm/yyyy");
                //   },
                //   Filter: ColumnFilter,
                // },
                {
                  Header: "address",
                  accessor: "address",
                  Filter: ColumnFilter,
                  Cell: ({ value }) => {
                    const nValue = value.split(",")[0];
                    return <span> {nValue} </span>;
                  },
                },
                // { Header: "Email", accessor: "email", Filter: ColumnFilter },
                { Header: "Phone", accessor: "phone", Filter: ColumnFilter },
                {
                  Header: "Action",
                  accessor: "uid",
                  Filter: ColumnFilter,
                  Cell: ({ value }) => {
                    return (
                      <div className={styles.actionContainer}>
                        <Tippy content="Edit">
                          <button
                            className={styles.actionButton}
                            onClick={() => {
                              setAddPatient(true);
                              setPatient(
                                data?.data?.results.find((f) => f.uid == value)
                              );
                            }}
                          >
                            <FaEdit />
                          </button>
                        </Tippy>
                        <Tippy content="Appointment">
                          <button className={styles.actionButton}>
                            <FaCalendarAlt />
                          </button>
                        </Tippy>
                        <Tippy content="Reports">
                          <button className={styles.actionButton}>
                            <FaFileAlt />
                          </button>
                        </Tippy>
                        <Tippy content="Profile">
                          <button className={styles.actionButton}>
                            <FaUserAlt />
                          </button>
                        </Tippy>
                        <Tippy content="Delete">
                          <button className={styles.actionButton}>
                            <FaTrash />
                          </button>
                        </Tippy>
                      </div>
                    );
                  },
                },
                // {
                //   Header: "National Id/Passport",
                //   accessor: "nid",
                //   Filter: ColumnFilter,
                // },
              ]}
            />
          )}
          {isLoading && (
            <div className="center">
              <BounceLoader color="#4874dc" size={150} />
            </div>
          )}
          {isError && (
            <div className="center">
              <ErrorBlock title="Error" message={error.response.data.message} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewPatient;
