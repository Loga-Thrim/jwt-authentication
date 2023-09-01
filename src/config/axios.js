import axios from "axios";
import { getCookie } from "../utils/cookie";

const defaultOptions = {
  headers: {
    "Content-Type": "application/json",
  },
};

let instance = axios.create(defaultOptions);

export const setupInterceptors = (history, pathname) => {
  instance.interceptors.request.use(function (config) {
    const token = getCookie("token");
    config.headers.Authorization = token ? `Bearer ${token}` : "";
    return config;
  });

  instance.interceptors.response.use(
    function (res) {
      return res;
    },
    function (err) {
      if (pathname === "/login" || pathname === "/signup")
        return Promise.reject(err);
      if (err.response.status === 401 && pathname !== '/') {
        history.push("/login");
      }
    }
  );
};

export default instance;
