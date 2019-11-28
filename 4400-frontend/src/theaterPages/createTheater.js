import React, { useState, useEffect } from 'react';
import { Alert, Button, Form, FormGroup, Label, Input, Col, Row, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import {useHistory} from 'react-router-dom';
import axios from 'axios';

function CreateTheater() {
  let history = useHistory();

  var states = ["AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL",
   "GA", "HI", "ID", "IL", "IN", "IA", "KS",
    "KY", "LA", "ME", "MD", "MA", "MI", "MN", "MS", "MO", "MT",
     "NE", "NV", "NH", "NJ", "NM", "NY", "NC", "ND", "OH", "OK",
      "OR", "PA", "RI", "SC", "SD", "TN", "TX", "UT", "VT", "VA",
       "WA", "WV", "WI", "WY"];

  const [theaterName, setTheaterName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [capacity, setCapacity] = useState("");

  const [companies, setCompanies] = useState([]);
  const [managers, setManagers] = useState(["Please choose a company to see managers"]);

  const [companyDropdownOpen, setCompanyDropdownOpen] = useState(false);
  const [stateDropdownOpen, setstateDropdownOpen] = useState(false);
  const [managerDropdownOpen, setManagerDropdownOpen] = useState(false);
  const [managerSelected, setManagerSelected] = useState("Choose Manager");
  const [companySelected, setCompanySelected] = useState("Choose Company");
  const [stateSelected, setStateSelected] = useState("Choose State");

  const [createSuccess, setCreateSuccess] = useState(false);
  const [createFail, setCreateFail] = useState(false);
  const [notAllFieldsPresent, setNotAllFieldsPresent] = useState(false);
  const [badZipCode, setBadZipCode] = useState(false);
  const [badCapacity, setBadCapacity] = useState(false);

  const companyToggle = () => setCompanyDropdownOpen(prevState => !prevState);
  const stateToggle = () => setstateDropdownOpen(prevState => !prevState);
  const managerToggle = () => setManagerDropdownOpen(prevState => !prevState);

  useEffect(() => {
    axios.get(`https://cs4400-api.herokuapp.com/companies`)
      .then((response) => {
        // console.log(response.data);
        var companyNames = response.data.companies;

        setCompanies(companyNames);
      })
      .catch((err) => {
        console.log(err);
    });
  }, [])

  const handleInput = (target) => {
    var id = target.id;
    var val = target.value;

    if (id === "inputTheaterName") {
      setTheaterName(val);

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
    setBadZipCode(false);
    setBadCapacity(false);
    setNotAllFieldsPresent(false);
    setCreateSuccess(false);
    setCreateFail(false);
    // console.log(theaterName, companySelected, address, city, stateSelected, zipcode, capacity, managerSelected);

    if (theaterName === "" || address === "" || city === "" || companySelected === "Choose Company" || stateSelected === "Choose State" || managerSelected === "Choose Manager") {
      setNotAllFieldsPresent(true);

    } else if (!zipcode.match(/^\d{5}$/)) {
      setBadZipCode(true);

    } else if (!capacity.match(/^[0-9]*$/)) {
      setBadCapacity(true);

    } else {
      axios.get(`https://cs4400-api.herokuapp.com/admin/create_theater/${theaterName}/${companySelected.toString()}/${address}/${city}/${stateSelected.toString()}/${zipcode}/${capacity}/${managerSelected.toString()}`)
        .then((response) => {
          // console.log(response);
          setCreateSuccess(true);
        })
        .catch((err) => {
          // console.log(err);
          setCreateFail(true);
      });    
    }
  }

  const handleCompanyClick = (company) => {
    axios.get(`https://cs4400-api.herokuapp.com/admin/available_managers/${company}`)
      .then((response) => {
        console.log(response.data);
        var managerNames = response.data.managers;

        setManagers(managerNames);
      })
      .catch((err) => {
        console.log(err);
    });
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
                  <Label for="inputTheaterName"> Theater Name </Label>
                  <Input onChange={(e) => handleInput(e.target)} id="inputTheaterName" placeholder="Enter name" />
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

            <Alert isOpen={notAllFieldsPresent} color="danger">
              All fields must have a value!
            </Alert>

            <Alert isOpen={badZipCode} color="danger">
              Zipcode must be exactly 5 digits
            </Alert>

            <Alert isOpen={badCapacity} color="danger">
              Capacity must be a digit
            </Alert>

            <FormGroup className="LoginButton">
              <Button color="primary" onClick={ goBack }>Back</Button> {' '}
              <Button color="primary" onClick={ create }>Create</Button>
            </FormGroup>

            <Alert isOpen={createSuccess} color="success">
              Create Successful!
            </Alert>

            <Alert isOpen={createFail} color="danger">
              Create Failed! Entry already exists in the DB. 
            </Alert>

          </Form>
        </div>
      </div>
  );
}

export default CreateTheater;