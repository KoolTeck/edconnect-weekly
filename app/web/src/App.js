import React from 'react'
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./Home";
import Signup from "./Signup";
import CreateProject from "./CreateProject";
import Login from "./Login";
import Project from "./Project";
import Error from "./Error";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact={true} component={Home} />
        <Route path="/signup" exact={true} component={Signup} />
        <Route path="/projects/submit" component={CreateProject} />
        <Route path="/login" component={Login} />
        <Route path="/projects" component={Project} />
        <Route path="*" component={Error} />
      </Switch>
    </Router>
  );
}

export default App;
