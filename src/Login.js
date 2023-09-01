import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "./config/axios";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  async function login(e) {
    e.preventDefault();

    try {
      const res = await axios({
        headers: {
          "Content-Type": "application/json",
        },
        url: `${process.env.REACT_APP_API_URL}/login`,
        method: "POST",
        data: JSON.stringify({
          username,
          password,
        }),
      });

      document.cookie = `token=${res.data.token}`;
      localStorage.setItem("user", JSON.stringify(res.data.user));
      history.push("/home");
    } catch (e) {
      alert("Failed to fetch.");
    }
  }
  return (
    <form onSubmit={login}>
      <input
        type="text"
        placeholder="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />{" "}
      <br />
      <br />
      <input
        type="password"
        placeholder="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />{" "}
      <br />
      <br />
      <button type="submit">Login</button>
    </form>
  );
}
