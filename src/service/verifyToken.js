import axios from "../config/axios";

export const verifyToken = async (history, pathname) => {
  axios
    .get(`${process.env.REACT_APP_API_URL}/verify-token`)
    .then((res) => {
      localStorage.setItem('user', JSON.stringify(res.data));
      if (pathname === "/login" || pathname === "/signup")
        history.push("/home");
    })
    .catch(() => {
      localStorage.removeItem('user');
      if(pathname != '/') history.push("/login");
    });
};
