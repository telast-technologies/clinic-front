import React, { useState } from "react";
import "./table.css";
import SearchIcon from "./SearchIcon";
export const GlobalFilter = ({ filter, setFilter }) => {
  return (
    <div className="genralFilter">
      <SearchIcon />
      <input
        value={filter || ""}
        onChange={(e) => setFilter(e.target.value)}
        placeholder="Search by ID , name, email and mobile"
      />
    </div>
  );
};
