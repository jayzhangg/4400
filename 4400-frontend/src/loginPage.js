import React from 'react';
import Button from 'react-bootstrap/Button';
import { LinkContainer } from 'react-router-bootstrap';

import './loginPage.css';

function LoginPage() {

  return (
    <div className="LoginPage">
      <h2>This is the login page</h2>

      <LinkContainer to="/functionalityPage">
        <Button>
          Login
        </Button>
      </LinkContainer>

    </div>
  );
}

export default LoginPage;



