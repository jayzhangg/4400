import React, { useState, useEffect } from 'react';
import ReactTable from 'react-table';
import { Button, Form, FormGroup, Label, Col, Row } from 'reactstrap';
import {useHistory} from 'react-router-dom';
import axios from 'axios';

function CompanyDetail() {
  let history = useHistory();
  var statePayload = history.location.state;

  const columns = [
    {
      Header: "Name",
      accessor: 'name'
      }, 
      {
        Header: "Manager",
        accessor: "manager"
      }, 
      {
        Header: "City",
        accessor: "city"
      }, 
      {
        Header: "State",
        accessor: "state"
    }, 
    {
      Header: "Capacity",
      accessor: "capacity"
    }
  ]

  const [companyName, setCompanyName] = useState("");
  const [employees, setEmployees] = useState("");

  const [data, setData] = useState([]);

  useEffect(() => {
    console.log(statePayload);
    var companyName = statePayload.companyName;
    setCompanyName(companyName);

    axios.get(`https://cs4400-api.herokuapp.com/admin/company_emps/${companyName}`)
      .then((response) => {
        console.log(response.data);
        var employeeNames = response.data.employees;
        var employeeString = "";

        for (var i=0; i < employeeNames.length; i++) {
          employeeString += ` ${employeeNames[i][0]} ${employeeNames[i][1]},`
        }

        setEmployees(employeeString.substring(0, employeeString.length - 1));
      })
      .catch((err) => {
        console.log(err);
    });

    axios.get(`https://cs4400-api.herokuapp.com/admin/company_theaters/${companyName}`)
      .then((response) => {
        console.log(response.data);
        var theaterData = response.data.theaters;
        var theaters = [];

        for (var i=0; i < theaterData.length; i++) {
          var temp = {}
          temp.name = theaterData[i][0];
          temp.manager = theaterData[i][1];
          temp.city = theaterData[i][2];
          temp.state = theaterData[i][3];
          temp.capacity = theaterData[i][4];
          theaters.push(temp);
        }
        setData(theaters);

      })
      .catch((err) => {
        console.log(err);
    });
  }, [])

  const goBack = () => {
    history.push("/");
  }

  return (
      <div className="FullPage"> 
        <div className="LoginPage">
          <h2>Company Detail</h2>
        </div>
        <div>
          <Form className="RegistrationForm">
            <Row>
              <Col md={3}>
                <FormGroup>
                  <h5> Name </h5>
                </FormGroup>
              </Col>

              <Col md={6}>
                <FormGroup>
                  <Label> {companyName} </Label>
                </FormGroup>
              </Col>
            </Row>

            <Row>
            <Col md={3}>
                <FormGroup>
                  <h5> Employees </h5>
                </FormGroup>
              </Col>

              <Col md={9}>
                <FormGroup>
                  {employees.toString()} 
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

export default CompanyDetail;