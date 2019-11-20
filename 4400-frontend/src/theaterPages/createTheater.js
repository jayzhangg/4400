import React, { useState } from 'react';
import { Button, Form, FormGroup, Label, Input, Col, Row, Alert, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import {useHistory} from 'react-router-dom';

function CreateTheater() {
  let history = useHistory();

  // Update this array with an read from the DB for all companies on first render
  var companies = [1,2,3,4,5,6,7,8,9];

  // Update this array with an read from the DB for all managers on first render
  var managers = ["J", "A"];

  var states = ["AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL",
   "GA", "HI", "ID", "IL", "IN", "IA", "KS",
    "KY", "LA", "ME", "MD", "MA", "MI", "MN", "MS", "MO", "MT",
     "NE", "NV", "NH", "NJ", "NM", "NY", "NC", "ND", "OH", "OK",
      "OR", "PA", "RI", "SC", "SD", "TN", "TX", "UT", "VT", "VA",
       "WA", "WV", "WI", "WY"];

  const [firstName, setFirstName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [capacity, setCapacity] = useState("");

  const [companyDropdownOpen, setCompanyDropdownOpen] = useState(false);
  const [stateDropdownOpen, setstateDropdownOpen] = useState(false);
  const [managerDropdownOpen, setManagerDropdownOpen] = useState(false);
  const [managerSelected, setManagerSelected] = useState("Choose Manager");
  const [companySelected, setCompanySelected] = useState("Choose Company");
  const [stateSelected, setStateSelected] = useState("Choose State");

  const companyToggle = () => setCompanyDropdownOpen(prevState => !prevState);
  const stateToggle = () => setstateDropdownOpen(prevState => !prevState);
  const managerToggle = () => setManagerDropdownOpen(prevState => !prevState);

  const handleInput = (target) => {
    var id = target.id;
    var val = target.value;

    if (id === "inputFirstName") {
      setFirstName(val);

    } else if (id === "inputAddress") {
      setAddress(val);

    } else if (id === "inputCity") {
      setCity(val);

    } else if (id === "inputZipcode") {
      setZipcode(val);

    } else if (id === "inputCapacity") {
      setCapacity(val);
    } 
  }

  const goBack = () => {
    history.push("/register");
  }

  const create = () => {
    // Add create logic 
    console.log(firstName, companySelected, address, city, stateSelected, zipcode, capacity, managerSelected);

  }

  const handleCompanyClick = (company) => {
    setCompanySelected(company);
  }

  const handleStateClick = (state) => {
    setStateSelected(state);
  }

  const handleManagerClick = (manager) => {
    setManagerSelected(manager);
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

  const displayManagers = managers.map((manager) => {
    return (
      <DropdownItem key={manager} onClick={() => handleManagerClick(manager)}>
        {manager}
      </DropdownItem>
    )
  });

  return (
      <div className="FullPage"> 
        <div className="LoginPage">
          <h2>Create Theater</h2>
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

            <FormGroup>
              <Label for="inputAddress"> Street Address </Label>
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

            <Row>
              <Col md={6}>
                <FormGroup>
                  <Label for="inputCapacity"> Capacity </Label>
                  <Input onChange={(e) => handleInput(e.target)} id="inputCapacity" placeholder="Enter capacity" />
                </FormGroup>
              </Col>

              <Col>
                <FormGroup>
                  <Label> Manager </Label>
                  <Dropdown isOpen={managerDropdownOpen} toggle={managerToggle}>
                    <DropdownToggle caret>
                      {managerSelected}
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
                        <DropdownItem header>Managers</DropdownItem>
                          {displayManagers}
                      </DropdownMenu>
                  </Dropdown>
                </FormGroup>
              </Col>
            </Row>

            <div className="LoginButton">
              <Button color="primary" onClick={ goBack }>Back</Button> {' '}
              <Button color="primary" onClick={ create }>Create</Button>
            </div>

          </Form>
        </div>
      </div>
  );
}

export default CreateTheater;