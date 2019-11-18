import React, { useState } from 'react';
// import { ToggleButton, ToggleButtonGroup, Button, Form } from 'react-bootstrap';
import { Button, Form, FormGroup, Label, Input, Alert } from 'reactstrap';
import { useHistory } from 'react-router-dom';

function LoginPage() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  let history = useHistory();

  const validateLogin = () => {
    // Make an API call to check if username and pass are valid, then use setValid(true/false) to change state
    console.log("username:", username, "password:", password);
    setShowAlert(false);

    // If username is correct, navigate away, else display error
    if (username === "" && password === "") {
      history.push("/functionalityPage");
    } else {
      setShowAlert(true);
    }
  }

  const navigateToRegister = () => {
    history.push("/register");
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

  return (
    <div className="FullPage"> 
      <div className="LoginPage">
        <h2>Atlanta Movie Login</h2>
      </div>
      
      <div className="LoginForm">
        <Form>
          <FormGroup>
            <Label for="inputUsername"> Username </Label>
            <Input onChange={(e) => handleInput(e.target)} id="inputUsername" placeholder="Enter username" />
          </FormGroup>

          <FormGroup>
            <Label for="inputPassword"> Password </Label>
            <Input type="password" onChange={(e) => handleInput(e.target)} id="inputPassword" placeholder="Enter password" />
          </FormGroup>

          <Alert isOpen={showAlert} color="danger">
            Wrong Username + Password combination. Try again!
          </Alert>

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



