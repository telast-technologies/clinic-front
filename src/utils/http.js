import axios from "axios";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

export async function FetchData() {
  return axios.get("https://jsonplaceholder.typicode.com/posts");
}
export function LoginSendData(data) {
  return axios.post("https://clinic.telast.tech/api/auth/login/", data);
}
export function AddPatientSend(data, config) {
  // return axios.post(
  //   "https://clinic.telast.tech/api/v1/patients/patient/",
  //   data,
  //   config
  // );
}
