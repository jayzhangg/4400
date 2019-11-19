import React, { useState, useEffect } from 'react';
import ReactTable from 'react-table';
import { Button, Form, FormGroup, Label, Input, Col, Row, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import {useHistory} from 'react-router-dom';

function ManageUser() {
  let history = useHistory();

  // Get initial Data via API call
  const initialData = [{
      username: "J",
      creditCardCount: "0",
      userType: "User",
      status: "Pending"
    }, 
    {
      username: "AA",
      creditCardCount: "1",
      userType: "User",
      status: "Pending"
  }]

  const columns = [{
    Header: "Username",
    accessor: 'username',
    Cell: props => (
      <div>
        <input id={props.index} onClick={(e) => handleCheckboxClick(e)} type="checkbox"></input> {props.row.username} 
      </div>
    )
    }, {
      Header: "Credit Card Count",
      accessor: "creditCardCount"
    }, {
      Header: "User Type",
      accessor: "userType"
    }, {
      Header: "Status",
      accessor: "status"
  }]

  // Update this array with an read from the DB for all companies on first render
  var statuses = ["ALL", "Pending", "Declined", "Approved"];
  var selected = [];

  const [username, setUsername] = useState("");

  const [statusDropdownOpen, setStatusDropdownOpen] = useState(false);
  const [statusSelected, setStatusSelected] = useState("Choose Status");
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(initialData);
  }, [])

  const statusToggle = () => setStatusDropdownOpen(prevState => !prevState);

  const handleInput = (target) => {
    var id = target.id;
    var val = target.value;

    if (id === "inputUsername") {
      setUsername(val);
    }
  }

  const goBack = () => {
    history.push("/");
  }

  const handleCheckboxClick = (e) => {
    var id = e.target.id;

    if (selected.includes(id)) {
      var indexToRemove = selected.indexOf(id);
      selected.splice(indexToRemove, 1);

    } else {
      selected.push(id);

    }
  }

  const approve = () => {
    var newData = []
    if (selected.length > 0) {
      for (var i= 0; i< data.length; i++) {
        var newObj = {};
        newObj.username = data[i].username;
        newObj.creditCardCount = data[i].creditCardCount;
        newObj.userType = data[i].userType;
        newObj.status = data[i].status;

        if (selected.includes(i.toString())) {
          newObj.status = "Approved";
        }
        newData.push(newObj);
      }

      setData(newData);
    }
  }

  const decline = () => {
    var newData = []
    if (selected.length > 0) {
      for (var i= 0; i< data.length; i++) {
        var newObj = {};
        newObj.username = data[i].username;
        newObj.creditCardCount = data[i].creditCardCount;
        newObj.userType = data[i].userType;
        newObj.status = data[i].status;

        if (selected.includes(i.toString())) {
          newObj.status = "Declined";
        }
        newData.push(newObj);
      }

      setData(newData);
    }
  }

  const filter = () => {
    console.log(username, statusSelected);

    // Do a DB read with the given constraints and repopulate the data, its way too hard to filter through all the data in the way this app is structured and using react table 
    var newData = [{
      username: "Jasdasd",
      creditCardCount: "0",
      userType: "User",
      status: "Pending"
    }, 
    {
      username: "AAfsafs",
      creditCardCount: "2",
      userType: "Ah",
      status: "Pending"
  }];
  setData(newData);

  }

  const handleStatusClick = (status) => {
    setStatusSelected(status);
  }

  const displayStatuses = statuses.map((status) => {
    return (
      <DropdownItem key={status} onClick={() => handleStatusClick(status)}>
        {status}
      </DropdownItem>
    )
  });

  return (
      <div className="FullPage"> 
        <div className="LoginPage">
          <h2>Manage User</h2>
        </div>
        <div>
          <Form className="RegistrationForm">
            <Row>
              <Col md={6}>
                <FormGroup>
                  <Label for="inputUsername"> Username </Label>
                  <Input onChange={(e) => handleInput(e.target)} id="inputUsername" placeholder="Enter username" />
                </FormGroup>
              </Col>

              <Col>
                <FormGroup>
                  <Label> Status </Label>
                  <Dropdown isOpen={statusDropdownOpen} toggle={statusToggle}>
                    <DropdownToggle caret>
                      {statusSelected}
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
                        <DropdownItem header>Statuses</DropdownItem>
                          {displayStatuses}
                      </DropdownMenu>
                  </Dropdown>
                </FormGroup>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <FormGroup>
                  <Button color="primary" onClick={ filter }>Filter</Button> {' '}
                </FormGroup>
              </Col>

              <Col md={2}>
                <FormGroup>
                  <Button color="primary" onClick={ approve }>Approve</Button> {' '}
                </FormGroup>
              </Col>

              <Col md={4}>
                <FormGroup>
                  <Button color="primary" onClick={ decline }>Decline</Button> {' '}
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

export default ManageUser;