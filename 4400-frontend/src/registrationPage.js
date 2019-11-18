import React from 'react';
import { Button } from 'reactstrap';
import { useHistory } from 'react-router-dom';

import './registrationPage.css';

function RegistrationPage() {
  let history = useHistory();

  const goUser = () => {
    history.push("/register/user");
  }

  const goCustomer = () => {
    history.push("/register/customer");
  }

  const goManager = () => {
    history.push("/register/manager");
  }

  const goManagerCustomer = () => {
    history.push("/register/managerCustomer");
  }

  const goBack = () => {
    history.push("/");
  }

  return (
    <div className="parent">
      <h2 className="myH2"> Register Navigation </h2>

      <div>
        <Button color="primary" onClick={ goUser }> User Only </Button>{' '}
      </div>
      <br/>

      <div>
        <Button color="primary" onClick={ goCustomer }> Customer Only </Button>{' '}
      </div>
      <br/>

      <div>
        <Button color="primary" onClick={ goManager }> Manager Only </Button>{' '}
      </div>
      <br/>

      <div>
        <Button color="primary" onClick={ goManagerCustomer }> Manager-Customer </Button>{' '}
      </div>
      <br/>

      <div>
        <Button color="primary" onClick={ goBack }> Back </Button>{' '}
      </div>
    </div>
  
  );
}

export default RegistrationPage;