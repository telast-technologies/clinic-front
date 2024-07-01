import React, { useContext, useEffect } from "react";
import { AppContext } from "../../shared/AppContext";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

const CancelLogo = ({ id }) => {
  const { token } = useContext(AppContext);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  function CancelAppointment(data) {
    return axios.patch(
      `https://clinic.telast.tech/api/v1/visits/visit/${id}/cancel/`,
      data,
      config
    );
  }
  const { mutate, data, isError, isPending, error } = useMutation({
    mutationFn: CancelAppointment,
  });
  const clickHandler = () => {
    const data = {
      reason: "any thing",
    };
    mutate(data);
  };
  useEffect(() => {
    if (data) {
      toast.success("status change to cancel ");
    }
  }, [data]);
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      class="size-2"
      onClick={clickHandler}
      width="2.5rem"
      height="2.5rem"
      cursor="pointer"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
      />
    </svg>
  );
};

export default CancelLogo;
