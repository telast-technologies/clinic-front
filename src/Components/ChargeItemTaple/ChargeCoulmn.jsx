import { ColumnFilter } from "../PatientTable/ColumnFilter";
import { format } from "date-fns";
export const ChargeCoulmn = [
  {
    Header: "Suppler Name ",
    accessor: "supply.item",
    Filter: ColumnFilter,
    disableFilters: true,
  },
  {
    Header: "charge",
    accessor: "charge",
    Filter: ColumnFilter,
    disableFilters: true,
  },
  {
    Header: "quantity",
    accessor: "quantity",
    Filter: ColumnFilter,
    disableFilters: true,
  },

  {
    Header: "Creation Date",
    accessor: "created_at",
    Filter: ColumnFilter,
    Cell: ({ value }) => {
      return format(value, "dd/mm/yyyy");
    },
    disableFilters: true,
  },
];
