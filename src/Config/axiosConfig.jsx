import axios from "axios";

import { toast } from "react-toastify";
export const axiosApi = axios.create({
  baseURL: "https://clinic.telast.tech/api/",
});

// axiosApi.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response && error.response.status === 400) {
//       const statusCode = error.response.status;
//       const generalMessage =
//         error.response.data.message || t("An error occurred.");
//       let detailedMessages = "";

//       // Display a general error message
//       toast.error(`Error ${statusCode}: ${generalMessage}`);

//       // Check for detailed validation errors and display them
//       if (error.response.data.error) {
//         const errors = error.response.data.error;
//         for (const field in errors) {
//           detailedMessages += `${field}: ${errors[field].join(" ")}\n`;
//         }
//       }

//       if (detailedMessages) {
//         // Display detailed validation error messages if present
//         toast.error(`Details:\n${detailedMessages}`);
//       }
//     } else if (error.request) {
//       // When no response is received from the server
//       toast.error(t("No response from the server."));
//     } else {
//       // Handle general errors
//       toast.error(`Error: ${error.message}`);
//     }

//     // Reject the error to handle it downstream if needed
//     return Promise.reject(error);
//   }
// );

export async function get(url, config = {}) {
  return await axiosApi
    .get(url, { ...config })
    .then((response) => response.data.data);
}

export async function post(url, data, config = {}) {
  return axiosApi
    .post(url, data instanceof FormData ? data : { ...data }, { ...config })
    .then((response) => response.data.data);
}

export async function put(url, data, config = {}) {
  return axiosApi
    .put(url, { ...data }, { ...config })
    .then((response) => response.data.data);
}

export async function del(url, config = {}) {
  return await axiosApi
    .delete(url, { ...config })
    .then((response) => response.data.data);
}
