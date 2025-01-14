import { format } from "date-fns";

import { ColumnFilter } from "../../Components/PaientTable/ColumnFilter";
export const Supcoulmns = [
  {
    Header: "Item ",
    accessor: "item",
    Filter: ColumnFilter,
  },
  {
    Header: "Remains",
    accessor: "remains",
    Filter: ColumnFilter,
  },

  {
    Header: "Unit Cost",
    accessor: "unit_cost",
    Filter: ColumnFilter,
  },

  { Header: "Quantity", accessor: "quantity", Filter: ColumnFilter },
  {
    Header: "Unit sales Price",
    accessor: "unit_sales_price",
    Filter: ColumnFilter,
  },
  {
    Header: "Charge",
    accessor: "charge",
    Filter: ColumnFilter,
  },
];
