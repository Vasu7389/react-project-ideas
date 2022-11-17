import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Header from "./common/header/Header";
import Stopwatch from "./stopwatch/Stopwatch";
import Timer from "./timer/Timer";

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <div className="container">
          <Switch>
            <Route path="/" exact component={Stopwatch} />
            <Route path="/timer" component={Timer} />
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
