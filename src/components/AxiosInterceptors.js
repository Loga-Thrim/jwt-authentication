import { useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { setupInterceptors } from "../config/axios";
import { verifyToken } from "../service/verifyToken";

export default function InjectAxiosInterceptors() {
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    setupInterceptors(history, location.pathname);
    verifyToken(history, location.pathname);
  }, [history]);

  return null;
}
