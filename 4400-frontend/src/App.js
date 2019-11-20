import React from 'react';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import './css/masterCss.css';
import 'react-table/react-table.css'

import Temp from "./temp";

import LoginPage from './loginPage';

import UserFunctionalityPage from './functionalityPages/userFunctionalityPage';
import CustomerFunctionalityPage from './functionalityPages/customerFunctionalityPage';
import ManagerFunctionalityPage from './functionalityPages/managerFunctionalityPage';
import ManagerCustomerFunctionalityPage from './functionalityPages/managerCustomerFunctionalityPage';
import AdminFunctionalityPage from './functionalityPages/adminFunctionalityPage';
import AdminCustomerFunctionalityPage from './functionalityPages/adminCustomerFunctionalityPage';

import RegistrationPage from './registrationPages/registrationPage';
import UserRegistraion from './registrationPages/userRegistration';
import CustomerRegistration from './registrationPages/customerRegistration';
import ManagerRegistration from './registrationPages/managerRegistration';
import ManagerCustomerRegistration from './registrationPages/managerCustomerRegistration';

import ManageUser from './managePages/manageUser';
import ManageCompany from './managePages/manageCompany';

import CreateTheater from './theaterPages/createTheater';

function App() {
  return (
    <Router>
      <div>
        {/* A <Switch> looks through its children <Route>s and renders the first one that matches the current URL. 
            This is why we have to use exact otherwise, LoginPage will always get rendered since / preceeds everything*/}
        <Switch>
          <Route path="/" exact component = { LoginPage } />

          <Route path="/functionality/user" exact component = { UserFunctionalityPage } />
          <Route path="/functionality/customer" exact component = { CustomerFunctionalityPage } />
          <Route path="/functionality/manager" exact component = { ManagerFunctionalityPage } />
          <Route path="/functionality/managerCustomer" exact component = { ManagerCustomerFunctionalityPage } />
          <Route path="/functionality/admin" exact component = { AdminFunctionalityPage } />
          <Route path="/functionality/adminCustomer" exact component = { AdminCustomerFunctionalityPage } />

          <Route path="/register" exact component = { RegistrationPage } />
          <Route path="/register/user" exact component = {UserRegistraion} />
          <Route path="/register/customer" exact component = {CustomerRegistration} />
          <Route path="/register/manager" exact component = {ManagerRegistration} />
          <Route path="/register/managerCustomer" exact component = {ManagerCustomerRegistration} />

          <Route path="/theater/explore" exact component = { Temp } />
          <Route path="/theater/overview" exact component = { Temp } />
          <Route path="/theater/create" exact component = { CreateTheater } />

          <Route path="/movie/explore" exact component = { Temp } />
          <Route path="/movie/schedule" exact component = { Temp } />
          <Route path="/movie/create" exact component = { Temp } />

          <Route path="/manage/user" exact component = { ManageUser } />
          <Route path="/manage/company" exact component = { ManageCompany } />

          <Route path="/history/visit" exact component = { Temp } />
          <Route path="/history/view" exact component = { Temp } />

          <Route path="/company/detail/" component = { UserFunctionalityPage } />

        </Switch>

      </div>
    </Router>
  );
}

export default App;
