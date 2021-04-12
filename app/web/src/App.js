import React from "react";
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

// cookie management functions
export function setCookie(cname, cvalue) {
  document.cookie = `${cname}=${cvalue};path=/;`; 
}

// delete cookie
export function deleteCookie(cname) {
  document.cookie = `${cname}=; expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
}

// get cookie
export function getCookie(cname) {
  let cvalue;
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let cArr = decodedCookie.split(";");
  for (let i = 0; i < cArr.length; i++) {
    let c = cArr[i];
    if (c.indexOf(name) === 0) {
      cvalue = c.substring(name.length);
      return cvalue;
    }
    return "";
  }
}

export default App;
