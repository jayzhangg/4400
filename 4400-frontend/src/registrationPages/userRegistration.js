import React, { useState } from 'react';
import { Button, Form, FormGroup, Label, Input, Col, Row, Alert } from 'reactstrap';
import {useHistory} from 'react-router-dom';
import axios from 'axios';

function UserRegistration() {
  let history = useHistory();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [passwordShort, setPasswordShort] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState(false);

  const handleInput = (target) => {
    var id = target.id;
    var val = target.value;

    if (id === "inputFirstName") {
      setFirstName(val);

    } else if (id === "inputLastName") {
      setLastName(val);

    } else if (id === "inputUsername") {
      setUsername(val);

    }else if (id === "inputPassword") {
      setPassword(val);

    } else if (id === "inputConfirmPassword") {
      setConfirmPassword(val);
    }
  }

  const goBack = () => {
    history.push("/register");
  }

  const register = () => {
    setPasswordMatch(false);
    setPasswordShort(false);

    console.log(firstName, lastName, username, password, confirmPassword);

    if (password.length < 7) {
      setPasswordShort(true);
    }
    if (password !== confirmPassword) {
      setPasswordMatch(true);
    }

    axios.get(`https://cs4400-api.herokuapp.com/register/user/${firstName}/${lastName}/${username}/${password}/${confirmPassword}`)
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
    });
  }

  return (
      <div className="FullPage"> 
        <div className="LoginPage">
          <h2>User Registration</h2>
        </div>
        <div>
          <Form className="RegistrationForm">
            <Row>
              <Col md={6}>
                <FormGroup>
                  <Label for="inputFirstName"> First Name </Label>
                  <Input onChange={(e) => handleInput(e.target)} id="inputFirstName" placeholder="Enter username" />
                </FormGroup>
              </Col>

              <Col>
                <FormGroup>
                  <Label for="inputLastName"> Last Name </Label>
                  <Input onChange={(e) => handleInput(e.target)} id="inputLastName" placeholder="Enter password" />
                </FormGroup>
              </Col>
            </Row>

            <FormGroup>
              <Label for="inputUsername"> Username </Label>
              <Input onChange={(e) => handleInput(e.target)} id="inputUsername" placeholder="Enter username" />
            </FormGroup>

            <Row>
              <Col md={6}>
                <FormGroup>
                  <Label for="inputPassword"> Password </Label>
                  <Input type="password" onChange={(e) => handleInput(e.target)} id="inputPassword" placeholder="Enter password" />
                </FormGroup>
              </Col>

              <Col md={6}>
                <FormGroup>
                  <Label for="inputConfirmPassword"> Confirm Password </Label>
                  <Input type="password" onChange={(e) => handleInput(e.target)} id="inputConfirmPassword" placeholder="Enter password" />
                </FormGroup>
              </Col>
            </Row>

            <Alert isOpen={passwordShort} color="danger">
              Password must be at least 8 characters!
            </Alert>

            <Alert isOpen={passwordMatch} color="danger">
              Passwords did not match!
            </Alert>

            <div className="LoginButton">
              <Button color="primary" onClick={ goBack }>Back</Button> {' '}
              <Button color="primary" onClick={ register }>Register</Button>
            </div>

          </Form>
        </div>
      </div>
  );
}

export default UserRegistration;