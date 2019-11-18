import React from 'react';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import LoginPage from './loginPage';
import FunctionalityPage from './functionalityPage';
import RegistrationPage from './registrationPage';

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
        </Switch>

      </div>
    </Router>
  );
}

export default App;
