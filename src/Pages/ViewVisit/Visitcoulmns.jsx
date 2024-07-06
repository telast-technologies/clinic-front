import CancelLogo from "../../Components/Logos/CancelLogo";
import CheckIn from "../../Components/Logos/CheckIn";
import { ColumnFilter } from "../../Components/PaientTable/ColumnFilter";
import { format } from "date-fns";
import Invoice from "../Invoice/Invoice";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

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
      if (value === "checked_in") {
        return <p>Checked In</p>;
      } else {
        return <p>{value}</p>;
      }
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
