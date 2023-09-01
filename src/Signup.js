import React from "react";
import axios from "./config/axios";

export default function Signup() {
  function handleSubmit(event) {
    event.preventDefault();
    const { email, username, password } = event.target;
    axios
      .post("http://localhost:5000/signup", {
        email: email.value,
        username: username.value,
        password: password.value,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((e) => {
        console.log(e);
      });
  }
  return (
    <>
      <h1>Signup</h1>

      <form>
        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" />

        <label htmlFor="username">Username</label>
        <input type="text" id="username" name="username" />

        <label htmlFor="password">Password</label>
        <input type="password" id="password" name="password" />

        <button type="submit" >Signup</button>
      </form>
    </>
  );
}
