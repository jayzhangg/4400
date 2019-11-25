import React, { useState, useEffect } from 'react';
import ReactTable from 'react-table';
import { Button, Form, FormGroup, Label, Input, Col, Row, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import {useHistory} from 'react-router-dom';
import axios from 'axios';

function ManageCompany() {
  let history = useHistory();

  const columns = [{
    Header: "Name",
    accessor: 'name',
    width: 225,
    Cell: props => (
      <div>
        <input checked={checkboxSelected === props.index.toString()} id={props.index} onChange={(e) => handleCheckboxClick(e)} type="radio"></input> {props.row.name} 
      </div>
    )
    }, {
      Header: "# City Covered",
      accessor: "numCityCovered"
    }, {
      Header: "# Theaters",
      accessor: "numTheaters"
    }, {
      Header: "# Employee",
      accessor: "numEmployee"
  }]

  const [nameSelected, setNameSelected] = useState("Choose Name");
  const [cityCoveredFrom, setCityCoveredFrom] = useState("");
  const [cityCoveredTo, setCityCoveredTo] = useState("");
  const [theatersFrom, setTheatersFrom] = useState("");
  const [theatersTo, setTheatersTo] = useState("");
  const [employeeFrom, setEmployeeFrom] = useState("");
  const [employeeTo, setEmployeeTo] = useState("");

  const [names, setNames] = useState([]);
  const [nameDropdownOpen, setNameDropdownOpen] = useState(false);
  const [data, setData] = useState([]);
  const [checkboxSelected, setCheckboxSelected] = useState("")

  useEffect(() => {
    axios.get(`https://cs4400-api.herokuapp.com/companies`)
      .then((response) => {
        // console.log(response.data);
        var companyNames = response.data.companies;

        setNames(companyNames);
      })
      .catch((err) => {
        console.log(err);
    });

    axios.get(`https://cs4400-api.herokuapp.com/admin/filter_company/ALL/0/100/0/100/0/100/numCityCovered/DES`)
      .then((response) => {
        // console.log(response.data);

        var initialData = [];
        var companyList = response.data.companies;

        for (var i=0; i < companyList.length; i++) {
          var temp = {}
          temp.name = companyList[i][0];
          temp.numCityCovered = companyList[i][1];
          temp.numTheaters = companyList[i][2];
          temp.numEmployee = companyList[i][3];
          initialData.push(temp);
        }
        setData(initialData);
      })
      .catch((err) => {
        console.log(err);
    });
  }, [])

  const nameToggle = () => setNameDropdownOpen(prevState => !prevState);

  const handleInput = (target) => {
    var id = target.id;
    var val = target.value;

    if (id === "inputCityFrom") {
      setCityCoveredFrom(val);

    } else if (id === "inputCityTo") {
      setCityCoveredTo(val);
      
    } else if (id === "inputTheaterFrom") {
      setTheatersFrom(val);
      
    } else if (id === "inputTheaterTo") {
      setTheatersTo(val);
      
    } else if (id === "inputEmployeeFrom") {
      setEmployeeFrom(val);
      
    } else if (id === "inputEmployeeTo") {
      setEmployeeTo(val);
      
    }
  }

  const goBack = () => {
    history.push("/");
  }

  const navigateToCreateTheater = () => {
    history.push("/theater/create");
  }

  const navigateToCompanyDetail = () => {
    if (checkboxSelected !== "") {
      var companyName = data[parseInt(checkboxSelected)];
      history.push("/company/detail/" + companyName.name.toString(), {companyName: companyName.name.toString()});
    } 
  }

  const handleCheckboxClick = (e) => {
    var id = e.target.id;
    setCheckboxSelected(id);
  }

  const filter = () => {
    // console.log(nameSelected, cityCoveredFrom, cityCoveredTo, theatersFrom, theatersTo, employeeFrom, employeeTo);

    axios.get(`https://cs4400-api.herokuapp.com/admin/filter_company/${nameSelected.toString()}/${cityCoveredFrom}/${cityCoveredTo}/${theatersFrom}/${theatersTo}/${employeeFrom}/${employeeTo}/numCityCovered/DES`)
      .then((response) => {
        console.log(response.data);

        var newData = [];
        var companyList = response.data.companies;

        for (var i=0; i < companyList.length; i++) {
          var temp = {}
          temp.name = companyList[i][0];
          temp.numCityCovered = companyList[i][1];
          temp.numTheaters = companyList[i][2];
          temp.numEmployee = companyList[i][3];
          newData.push(temp);
        }
        setData(newData);
      })
      .catch((err) => {
        console.log(err);
    });
  }

  const handleNameClick = (name) => {
    setNameSelected(name);
  }

  const displayNames = names.map((name) => {
    return (
      <DropdownItem key={name} onClick={() => handleNameClick(name)}>
        {name}
      </DropdownItem>
    )
  });

  return (
      <div className="FullPage"> 
        <div className="LoginPage">
          <h2>Manage Company</h2>
        </div>
        <div>
          <Form className="RegistrationForm">
            <Row>
              <Col md={4}>
                <FormGroup>
                  <Label> Name </Label>
                  <Dropdown isOpen={nameDropdownOpen} toggle={nameToggle}>
                    <DropdownToggle caret>
                      {nameSelected}
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
                        <DropdownItem header>Names</DropdownItem>
                          {displayNames}
                      </DropdownMenu>
                  </Dropdown>
                </FormGroup>
              </Col>

              <Col md={4}>
                <FormGroup>
                  <Label> # City Covered </Label>
                  <Input onChange={(e) => handleInput(e.target)} id="inputCityFrom" placeholder="From" />
                </FormGroup>
              </Col>

              <Col md={4}>
                <FormGroup>
                  <Label> # City Covered </Label>
                  <Input onChange={(e) => handleInput(e.target)} id="inputCityTo" placeholder="To" />
                </FormGroup>
              </Col>
            </Row>

            <Row>
            <Col md={3}>
                <FormGroup>
                  <Label> # Theaters </Label>
                  <Input onChange={(e) => handleInput(e.target)} id="inputTheaterFrom" placeholder="From" />
                </FormGroup>
              </Col>

              <Col md={3}>
                <FormGroup>
                  <Label> # Theaters </Label>
                  <Input onChange={(e) => handleInput(e.target)} id="inputTheaterTo" placeholder="To" />
                </FormGroup>
              </Col>

              <Col md={3}>
                <FormGroup>
                  <Label> # Employee </Label>
                  <Input onChange={(e) => handleInput(e.target)} id="inputEmployeeFrom" placeholder="From" />
                </FormGroup>
              </Col>

              <Col md={3}>
                <FormGroup>
                  <Label> # Employee </Label>
                  <Input onChange={(e) => handleInput(e.target)} id="inputEmployeeTo" placeholder="To" />
                </FormGroup>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <FormGroup>
                  <Button color="primary" onClick={ filter }>Filter</Button> {' '}
                </FormGroup>
              </Col>

              <Col md={4}>
                <FormGroup>
                  <Button color="primary" onClick={ navigateToCreateTheater }>Create Theater</Button> {' '}
                </FormGroup>
              </Col>

              <Col md={2}>
                <FormGroup>
                  <Button color="primary" onClick={ navigateToCompanyDetail }>Detail</Button> {' '}
                </FormGroup>
              </Col>
            </Row>

            <FormGroup>
              <ReactTable
                    data={data}
                    columns={columns}
                    minRows={5}
                    />
            </FormGroup>

            <div className="LoginButton">
              <Button color="primary" onClick={ goBack }>Back</Button> {' '}
            </div>

          </Form>
        </div>
      </div>
  );
}

export default ManageCompany;