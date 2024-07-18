import { ColumnFilter } from "../../Components/PatientTable/ColumnFilter";
import classes from "./ViewService.module.css";
import { format } from "date-fns";
export const ServiceCoulmn = [
  {
    Header: "Service Name ",
    accessor: "name",
    Filter: ColumnFilter,
  },
  { Header: "Charge", accessor: "charge", Filter: ColumnFilter },

  {
    Header: "Status",
    accessor: "active",
    Filter: ColumnFilter,
    Cell: ({ value }) => {
      return (
        <span
          className={value ? classes.active__status : classes.inactive__status}
        >
          {" "}
          {value ? "Active" : "inActive"}{" "}
        </span>
      );
    },
  },
  {
    Header: "Creation Date",
    accessor: "created_at",
    Filter: ColumnFilter,
    Cell: ({ value }) => {
      return format(value, "dd/mm/yyyy");
    },
  },
];
