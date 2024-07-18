import React from "react";
import "./table.css";
export const ColumnFilter = ({ column }) => {
  const { filterValue, setFilter } = column;
  return (
    <div className="coulmFilter">
      <input
        value={filterValue || ""}
        onChange={(e) => setFilter(e.target.value)}
        placeholder="Filter By"
      />
    </div>
  );
};
