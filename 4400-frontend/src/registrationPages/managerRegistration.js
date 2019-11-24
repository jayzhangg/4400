import React, { useState, useEffect } from 'react';
import { Button, Form, FormGroup, Label, Input, Col, Row, Alert, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import {useHistory} from 'react-router-dom';
import axios from 'axios';

function ManagerRegistration() {
  let history = useHistory();

  var states = ["AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL",
   "GA", "HI", "ID", "IL", "IN", "IA", "KS",
    "KY", "LA", "ME", "MD", "MA", "MI", "MN", "MS", "MO", "MT",
     "NE", "NV", "NH", "NJ", "NM", "NY", "NC", "ND", "OH", "OK",
      "OR", "PA", "RI", "SC", "SD", "TN", "TX", "UT", "VT", "VA",
       "WA", "WV", "WI", "WY"];

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [zipcode, setZipcode] = useState("");

  const [companies, setCompanies] = useState([]);
  const [companyDropdownOpen, setCompanyDropdownOpen] = useState(false);
  const [stateDropdownOpen, setstateDropdownOpen] = useState(false);
  const [companySelected, setCompanySelected] = useState("Choose Company");
  const [stateSelected, setStateSelected] = useState("Choose State");

  const [registerSuccess, setRegisterSuccess] = useState(false);
  const [registerFail, setRegisterFail] = useState(false);
  const [allFieldsPresent, setAllFieldsPresent] = useState(false);
  const [badZipCode, setBadZipCode] = useState(false);
  const [passwordShort, setPasswordShort] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState(false);

  const companyToggle = () => setCompanyDropdownOpen(prevState => !prevState);
  const stateToggle = () => setstateDropdownOpen(prevState => !prevState);

  useEffect(() => {
    // Update this array with an read from the DB for all companies on first render
    var companies = [];

    axios.get(`https://cs4400-api.herokuapp.com/companies`)
      .then((response) => {
        companies = response.data.companies;
        setCompanies(companies);
      })
      .catch((err) => {
        console.log(err);
    });
  }, [])

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

    } else if (id === "inputAddress") {
      setAddress(val);

    } else if (id === "inputCity") {
      setCity(val);

    } else if (id === "inputZipcode") {
      setZipcode(val);
    }

  }

  const goBack = () => {
    history.push("/register");
  }

  const register = () => {
    // Add register logic 
    setPasswordMatch(false);
    setPasswordShort(false);
    setAllFieldsPresent(false);
    setBadZipCode(false);
    setRegisterFail(false);
    setRegisterSuccess(false);

    // console.log(firstName, lastName, username, password, confirmPassword, companySelected, address, city, stateSelected, zipcode);

    if (firstName === "" || firstName === "" || lastName === "" || username === "" || password === "" || confirmPassword === "" || companySelected === "Choose Company" || stateSelected === "Choose State") {
      setAllFieldsPresent(true);

    } else if (password.length < 7 || password !== confirmPassword) {
      if (password.length < 7) {
        setPasswordShort(true);
      } 
      if (password !== confirmPassword) {
        setPasswordMatch(true);
      }
    } else if (!zipcode.match(/^\d{5}$/)) {
      setBadZipCode(true);

    } else {
        axios.get(`https://cs4400-api.herokuapp.com/register/manager/${username}/${companySelected.toString()}/${address}/${city}/${stateSelected}/${zipcode}/${firstName}/${lastName}/${password}/${confirmPassword}`)
        .then((response) => {
          setRegisterSuccess(true);
        })
        .catch((err) => {
          setRegisterFail(true);
      });
    }
  }

  const handleCompanyClick = (company) => {
    setCompanySelected(company);
  }

  const handleStateClick = (state) => {
    setStateSelected(state);
  }

  const displayCompanies = companies.map((company) => {
    return (
      <DropdownItem key={company} onClick={() => handleCompanyClick(company)}>
        {company}
      </DropdownItem>
    )
  });

  const displayStates = states.map((state) => {
    return (
      <DropdownItem key={state} onClick={() => handleStateClick(state)}>
        {state}
      </DropdownItem>
    )
  });

  return (
      <div className="FullPage"> 
        <div className="LoginPage">
          <h2>Manager-Only Registration</h2>
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

            <Row>
              <Col md={6}>
                <FormGroup>
                  <Label for="inputUsername"> Username </Label>
                  <Input onChange={(e) => handleInput(e.target)} id="inputUsername" placeholder="Enter username" />
                </FormGroup>
              </Col>

              <Col>
                <FormGroup>
                  <Label> Company </Label>
                  <Dropdown isOpen={companyDropdownOpen} toggle={companyToggle}>
                    <DropdownToggle caret>
                      {companySelected}
                    </DropdownToggle>
                      <DropdownMenu modifiers={{
                                      setMaxHeight: {
                                        enabled: true,
                                        order: 890,
                                        fn: (data) => {
                                          return {
                                            ...data,
                                            styles: {
                                              ...data.styles,
                                              overflow: 'auto',
                                              maxHeight: 110,
                                            },
                                          };
                                        },
                                      },
                                    }}>
                        <DropdownItem header>Companies</DropdownItem>
                          {displayCompanies}
                      </DropdownMenu>
                  </Dropdown>
                </FormGroup>
              </Col>
            </Row>

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

            <FormGroup>
              <Label for="inputAddress"> Address </Label>
              <Input onChange={(e) => handleInput(e.target)} id="inputAddress" placeholder="Enter address" />
            </FormGroup>

            <Row>
              <Col md={4}>
                <FormGroup>
                  <Label for="inputCity"> City </Label>
                  <Input onChange={(e) => handleInput(e.target)} id="inputCity" placeholder="Enter City" />
                </FormGroup>
              </Col>

              <Col md={4}>
                <FormGroup>
                  <Label> State </Label>
                  <Dropdown isOpen={stateDropdownOpen} toggle={stateToggle}>
                    <DropdownToggle caret>
                      {stateSelected}
                    </DropdownToggle>
                      <DropdownMenu modifiers={{
                                      setMaxHeight: {
                                        enabled: true,
                                        order: 890,
                                        fn: (data) => {
                                          return {
                                            ...data,
                                            styles: {
                                              ...data.styles,
                                              overflow: 'auto',
                                              maxHeight: 110,
                                            },
                                          };
                                        },
                                      },
                                    }}>
                        <DropdownItem header>States</DropdownItem>
                          {displayStates}
                      </DropdownMenu>
                  </Dropdown>                
                </FormGroup>
              </Col>

              <Col md={4}>
                <FormGroup>
                  <Label for="inputZipcode"> Zipcode </Label>
                  <Input onChange={(e) => handleInput(e.target)} id="inputZipcode" placeholder="Enter Zipcode" />
                </FormGroup>
              </Col>
            </Row>

            <Alert isOpen={allFieldsPresent} color="danger">
              All fields must have a value!
            </Alert>

            <Alert isOpen={passwordShort} color="danger">
              Password must be at least 8 characters!
            </Alert>

            <Alert isOpen={passwordMatch} color="danger">
              Passwords did not match!
            </Alert>

            <Alert isOpen={badZipCode} color="danger">
              Zipcode must be exactly 5 digits
            </Alert>

            <FormGroup className="LoginButton">
              <Button color="primary" onClick={ goBack }>Back</Button> {' '}
              <Button color="primary" onClick={ register }>Register</Button>
            </FormGroup>

            <Alert isOpen={registerSuccess} color="success">
              Registration Successful!
            </Alert>

            <Alert isOpen={registerFail} color="danger">
              Registration Failed! Entry already exists in the DB!
            </Alert>


          </Form>
        </div>
      </div>
  );
}

export default ManagerRegistration;