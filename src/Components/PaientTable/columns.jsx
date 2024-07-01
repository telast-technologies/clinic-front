import { format } from "date-fns";
import { ColumnFilter } from "./ColumnFilter";
export const COLUMNS = [
  // { Header: "Id", accessor: "id", Filter: ColumnFilter },
  {
    Header: "First Name",
    accessor: "first_name",
    Filter: ColumnFilter,
    // disableFilters: true,
  },
  { Header: "Last Name", accessor: "last_name", Filter: ColumnFilter },
  {
    Header: "Date Of Birth",
    accessor: "birthdate",
    Cell: ({ value }) => {
      return format(value, "dd/mm/yyyy");
    },
    Filter: ColumnFilter,
  },
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
];
