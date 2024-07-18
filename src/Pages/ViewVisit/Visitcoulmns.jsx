import CancelLogo from "../../Components/Logos/CancelLogo";
import CheckIn from "../../Components/Logos/CheckIn";
import { ColumnFilter } from "../../Components/PatientTable/ColumnFilter";
import { format } from "date-fns";
import Invoice from "../Invoice/Invoice";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import styles from "./Visitcoulmns.module.css";
const StatusEnum = {
  booked: "Booked",
  checked_in: "Checked In",
  checked_out: "Checked Out",
  cancelled: "Cancelled",
};
export const ServiceCoulmn = [
  {
    Header: "Patient Name ",
    accessor: "patient.first_name",
    Filter: ColumnFilter,
  },

  // {
  //   Header: "Invoice",
  //   accessor: "invoice",
  //   Filter: ColumnFilter,
  // },
  {
    Header: "Visit Type",
    accessor: "visit_type",
    Filter: ColumnFilter,
    Cell: ({ value }) => {
      let className = styles.defaultStyle; // Default style when value doesn't match

      if (value === "scheduled") {
        className = styles.scheduled; // Apply scheduled style
      } else if (value === "walk_in") {
        className = styles.walkIn; // Apply walk-in style
      }

      return (
        <p className={className}>
          {value === "scheduled"
            ? "Scheduled"
            : value === "walk_in"
            ? "Walk In"
            : "----"}
        </p>
      );
    },
  },
  {
    Header: "Invoice",
    accessor: "invoice",
    Filter: ColumnFilter,
    Cell: ({ value }) => {
      return <Link to={`/invoice/${value}`}>{value}</Link>;
    },
  },
  {
    Header: "Date",
    accessor: "date",
    Filter: ColumnFilter,
  },
  {
    Header: "Status",
    accessor: "status",
    Filter: ColumnFilter,
    Cell: ({ value }) => {
      let className = styles.defaultStyleStatus; // Default style when value doesn't match

      if (value === "checked_in") {
        className = styles.checkedIn; // Apply checked-in style
      } else if (value === "booked") {
        className = styles.booked; // Apply booked style
      } else if (value === "checked_out") {
        className = styles.checkedOut; // Apply checked-out style
      } else if (value === "cancelled") {
        className = styles.cancelled; // Apply cancelled style
      }

      return <p className={className}>{StatusEnum[value] || value}</p>;
    },
  },
  {
    Header: "Action",
    accessor: "uid",
    Filter: ColumnFilter,
    Cell: ({ value }) => {
      return (
        <div>
          <CancelLogo id={value} />
          <CheckIn id={value} />
        </div>
      );
    },
  },
];
