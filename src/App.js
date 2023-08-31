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
            <h1>Hello </h1>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
