import React, { useState, useEffect } from 'react';
import ReactTable from 'react-table';
import { Button, Form, FormGroup, Label, Col, Row } from 'reactstrap';
import {useHistory} from 'react-router-dom';

function CompanyDetail() {
  let history = useHistory();

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
    var url = (document.URL).split("/");
    var name = url[url.length - 1];
    // API call here to get all employees
    var employees = [" James Smith", " Clara Wilson"];
    // API call here to get initial data
    var initialData = [
      {
        name: "J",
        manager: "0",
        city: "0",
        state: "0",
        capacity: "0"
      },
      {
        name: "AA",
        manager: "1",
        city: "2",
        state: "3",
        capacity: "4"
      }
    ]
    setEmployees(employees);
    setCompanyName(name);
    setData(initialData);
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
              <Col md={4}>
                <FormGroup>
                  <h5> Name </h5>
                </FormGroup>
              </Col>

              <Col md={4}>
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

              <Col md={3}>
                <FormGroup>
                  <Label> {employees.toString()} </Label>
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