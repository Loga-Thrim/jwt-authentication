import React from "react";
import verifyToken from "./service/authen";
import { useHistory } from "react-router-dom";

export default function Home() {
  const history = useHistory();

  React.useEffect(() => {
    getVerifyToken();
  }, []);

  async function getVerifyToken() {
    if (!(await verifyToken())) {
      history.push("/login");
    }
  }
  React.useEffect(() => {
    verifyToken();
  });
  return <h1>Home</h1>;
}
