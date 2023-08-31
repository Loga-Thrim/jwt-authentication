import React from "react";
import { useHistory } from "react-router-dom";
import axios from "./config/axios";

export default function Home() {
  const history = useHistory();

  function fetchData() {
    axios.get("http://localhost:5000/products");
  }

  function logout() {
    document.cookie = "token=;expires=Thu, 01 Jan 1970 00:00:01 GMT";
    history.push("/login");

  }

  return (
    <>
      <h1>Home</h1>
      <button onClick={fetchData}>Click me</button>
      <button onClick={logout}>Logout</button>
    </>
  );
}
