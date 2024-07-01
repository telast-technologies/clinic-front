import { ColumnFilter } from "../PaientTable/ColumnFilter";
import { format } from "date-fns";
export const ChargeServiceCoulmn = [
  {
    Header: "Service Name ",
    accessor: "service.name",
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
    Header: "Creation Date",
    accessor: "created_at",
    Filter: ColumnFilter,
    Cell: ({ value }) => {
      return format(value, "dd/mm/yyyy");
    },
    disableFilters: true,
  },
];
