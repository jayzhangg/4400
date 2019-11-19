import React from 'react';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import './css/masterCss.css';

import LoginPage from './loginPage';
import FunctionalityPage from './functionalityPages/functionalityPage';
import RegistrationPage from './registrationPages/registrationPage';
import UserRegistraion from './registrationPages/userRegistration';
import CustomerRegistration from './registrationPages/customerRegistration';
import ManagerRegistration from './registrationPages/managerRegistration';
import ManagerCustomerRegistration from './registrationPages/managerCustomerRegistration';

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
