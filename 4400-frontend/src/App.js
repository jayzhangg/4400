import React from 'react';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import LoginPage from './loginPage';
import FunctionalityPage from './functionalityPage';
import RegistrationPage from './registrationPage';
import temp from "./temp";

function App() {
  return (
    <Router>
      <div>
        {/* A <Switch> looks through its children <Route>s and renders the first one that matches the current URL. 
            This is why we have to use exact otherwise, LoginPage will always get rendered since / preceeds everything*/}
        <Switch>
          <Route path="/" exact component = { LoginPage } />
          <Route path="/functionalityPage" exact component = { FunctionalityPage } />
          <Route path="/registrationPage" exact component = { RegistrationPage } />
          <Route path="/register/user" exact component = {temp} />
          <Route path="/register/customer" exact component = {temp} />
          <Route path="/register/manager" exact component = {temp} />
          <Route path="/register/managerCustomer" exact component = {temp} />
        </Switch>

      </div>
    </Router>
  );
}

export default App;
