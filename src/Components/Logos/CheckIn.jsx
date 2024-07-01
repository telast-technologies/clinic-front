import React, { useContext, useEffect } from "react";
import { AppContext } from "../../shared/AppContext";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

const CheckIn = ({ id }) => {
  const { token } = useContext(AppContext);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  function Confirm(data = {}) {
    return axios.patch(
      `https://clinic.telast.tech/api/v1/visits/visit/${id}/check_in/`,
      data,
      config
    );
  }
  const { mutate, data, isError, isPending, error } = useMutation({
    mutationFn: Confirm,
  });
  const handleConfirm = () => {
    console.log(id);
    mutate();
  };
  useEffect(() => {
    if (data) {
      toast.success("status change to check_in");
    }
  });
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      class="size-6"
      style={{
        width: "2.5rem",
        height: "2.5rem",
        marginLeft: "1rem",
      }}
      onClick={handleConfirm}
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
      />
    </svg>
  );
};

export default CheckIn;
