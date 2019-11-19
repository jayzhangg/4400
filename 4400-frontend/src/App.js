import React from 'react';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import './css/masterCss.css';

import LoginPage from './loginPage';
import FunctionalityPage from './functionalityPage';
import RegistrationPage from './registrationPage';
import temp from "./temp";
import UserRegistraion from './userRegistration';
import CustomerRegistration from './customerRegistration';
import ManagerRegistration from './managerRegistration';
import ManagerCustomerRegistration from './managerCustomerRegistration';

function App() {
  return (
    <Router>
      <div>
        {/* A <Switch> looks through its children <Route>s and renders the first one that matches the current URL. 
            This is why we have to use exact otherwise, LoginPage will always get rendered since / preceeds everything*/}
        <Switch>
          <Route path="/" exact component = { LoginPage } />
          <Route path="/functionalityPage" exact component = { FunctionalityPage } />
          <Route path="/register" exact component = { RegistrationPage } />
          <Route path="/register/user" exact component = {UserRegistraion} />
          <Route path="/register/customer" exact component = {CustomerRegistration} />
          <Route path="/register/manager" exact component = {ManagerRegistration} />
          <Route path="/register/managerCustomer" exact component = {ManagerCustomerRegistration} />
        </Switch>

      </div>
    </Router>
  );
}

export default App;
