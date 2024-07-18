import { format } from "date-fns";
import { ColumnFilter } from "./ColumnFilter";
import Tippy from "@tippyjs/react";
import styles from "./columns.module.css";
import {
  FaEdit,
  FaCalendarAlt,
  FaFileAlt,
  FaUserAlt,
  FaTrash,
} from "react-icons/fa";
export const COLUMNS = [
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
            <button className={styles.actionButton}>
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
];
