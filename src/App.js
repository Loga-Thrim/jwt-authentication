import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";

import AxiosInterceptors from "./components/AxiosInterceptors";

function App() {
  return (
    <div className="App">
      <Router>
        <AxiosInterceptors />
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/home">
            <Home />
          </Route>
          <Route path="/">
            <Index />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

function Index() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div>
      {user ? <h1>Welcome: {user.email}</h1> : null}
      <h1>{user ? "You are signined" : "You are not signin"}</h1>
    </div>
  );
}

export default App;
