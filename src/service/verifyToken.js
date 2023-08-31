import axios from "../config/axios";

export const verifyToken = async (history, pathname) => {
  axios
    .get(`${process.env.REACT_APP_API_URL}/verify-token`)
    .then(() => {
      if (pathname === "/login" || pathname === "/signup")
        history.push("/home");
    })
    .catch(() => {
      history.push("/login");
    });
};
