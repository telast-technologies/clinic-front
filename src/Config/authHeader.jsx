import Cookies from "js-cookie";
export default function authHeader() {
  const obj = Cookies.get("accessToken");

  return {
    AUTHENTIC: () => {
      return {
        headers: {
          Authorization: `Bearer ${obj}`,
        },
      };
    },
    MULTIPARTAUTH: () => {
      return {
        headers: {
          Authorization: `Bearer ${obj}`,
          "Content-Type": "multipart/form-data",
        },
      };
    },
    MULTIPART: () => {
      return {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
    },
  };
}
