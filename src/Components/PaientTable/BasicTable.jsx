import {
  useFilters,
  useGlobalFilter,
  usePagination,
  useRowSelect,
  useSortBy,
  useTable,
} from "react-table";
import { COLUMNS } from "./columns";
import MOCK_DATA from "./MOCK_DATA.json";
import { useMemo } from "react";
import "./table.css";
import { GlobalFilter } from "./GlobalFilter";
import { Checkbox } from "./Checkbox";
import SortIcon from "./SortIcon";
import PrevIcon from "./PrevIcon";
import NextIcon from "./NextIcon";
const BasicTable = ({ data: Painetdata, columns: RtriveCoulm }) => {
  console.log(Painetdata);
  const columns = useMemo(() => RtriveCoulm, []);
  const data = useMemo(() => Painetdata, [Painetdata]);
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    footerGroups,
    rows,
    prepareRow,
    page,
    nextPage,
    previousPage,
    canPreviousPage,
    canNextPage,
    setGlobalFilter,
    state,
    gotoPage,
    pageCount,
    setPageSize,
    selectedFlatRows,
  } = useTable(
    { columns, data },
    useGlobalFilter,
    useFilters,
    useSortBy,
    usePagination,
    useRowSelect,
    (hooks) => {
      hooks.visibleColumns.push((columns) => [
        {
          id: "selection",
          Header: ({ getToggleAllRowsSelectedProps }) => (
            <Checkbox {...getToggleAllRowsSelectedProps()} />
          ),
          Cell: ({ row }) => <Checkbox {...row.getToggleRowSelectedProps()} />,
        },
        ...columns,
      ]);
    }
  );

  const { globalFilter, pageSize, pageIndex } = state;
  return (
    <div>
      <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column, index) => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  <div className="Header">
                    {index > 0 && <SortIcon />}
                    <p> {column.render("Header")} </p>
                  </div>
                  <div>{column.canFilter ? column.render("Filter") : null}</div>
                  <div>
                    {column.isSorted ? (column.isSortedDesc ? " " : " ") : ""}
                  </div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="footerTable">
        <div className="SelectRow">
          <p>Row Per Page</p>
          <select
            value={pageSize}
            onChange={(e) => setPageSize(Number(e.target.value))}
          >
            {[5, 10, 15].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                {pageSize}
              </option>
            ))}
          </select>
        </div>
        <div className="pagantion">
          <span>
            <strong>
              Page {pageIndex + 1} of {page.length}
            </strong>
          </span>
          <div className="pagantionBtns">
            <button onClick={() => previousPage()} disabled={!canPreviousPage}>
              <PrevIcon />
              <p>Prev</p>
            </button>
            <button onClick={() => nextPage()} disabled={!canNextPage}>
              <p>Next</p>
              <NextIcon />
            </button>
          </div>
        </div>
      </div>
      {/* <pre>
        <code>
          {JSON.stringify(
            {
              selectedFlatRows: selectedFlatRows.map((row) => row.original),
            },
            null,
            2
          )}
        </code>
      </pre> */}
    </div>
  );
};

export default BasicTable;
