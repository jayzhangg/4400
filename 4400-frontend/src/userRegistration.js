import React, { useState } from 'react';
import { Button, Form, FormGroup, Label, Input, Alert } from 'reactstrap';

function UserRegistration() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

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
          <h2>User Registration</h2>
        </div>
        <div>
          <Form className="Form">
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
      </div>
  );
}

export default UserRegistration;