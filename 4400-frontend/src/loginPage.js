import React, { useState, useEffect } from 'react';
// import { ToggleButton, ToggleButtonGroup, Button, Form } from 'react-bootstrap';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { useHistory } from 'react-router-dom';

import './loginPage.css';

function LoginPage() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  let history = useHistory();

  const validateLogin = () => {
    // Make an API call to check if username and pass are valid, then use setValid(true/false) to change state
    console.log("username:", username, "password:", password);
    if (username === "" && password === "") {
      history.push("/functionalityPage");
    }
  }

  const navigateToRegister = () => {
    history.push("/registrationPage");
  }

  const handleInput = (target) => {
    var id = target.id;
    var val = target.value;

    if (id === "inputUsername") {
      setUsername(val);
    } else if (id === "inputPassword") {
      setPassword(val);
    }
  }

  // For debugging purposes
  // useEffect(() => {
  //   console.log(username)
  // }, [username] );

  // useEffect(() => {
  //   console.log(password)
  // }, [password] );

  return (
    <div className="FullPage"> 
      <div className="LoginPage">
        <h2>Atlanta Movie Login</h2>
      </div>
      
      <div className="Form">
        <Form>
          <FormGroup>
            <Label for="inputUsername"> Username </Label>
            <Input onChange={(e) => handleInput(e.target)} id="inputUsername" placeholder="Enter username" />
          </FormGroup>

          <FormGroup>
            <Label for="inputPassword"> Username </Label>
            <Input type="password" onChange={(e) => handleInput(e.target)} id="inputPassword" placeholder="Enter password" />
          </FormGroup>

        </Form>
      </div>

      <div className="LoginButton">
        <Button color="primary" onClick={ validateLogin }>Login</Button>{' '}
        <Button color="primary" onClick={ navigateToRegister }>Register</Button>
      </div>

    </div>
  );
}

export default LoginPage;



