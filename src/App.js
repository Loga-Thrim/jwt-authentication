import React from "react";
import Home from "./Home";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
} from "react-router-dom";
import verifyToken from "./service/authen";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/home">
            <Home />
          </Route>
          <Route path="/">
            <h1>Hello </h1>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

function Login() {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const history = useHistory();

  React.useEffect(() => {
    getVerifyToken();
  }, []);

  async function getVerifyToken() {
    if (await verifyToken()) history.push("/home");
  }

  async function login(e) {
    e.preventDefault();

    const res = await fetch("http://localhost:5000/login", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        username,
        password,
      }),
    });
    const data = await res.json();

    document.cookie = `token=${data.token}`;
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

export default App;
