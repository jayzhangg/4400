import React, { useState, useEffect } from 'react';
import ReactTable from 'react-table';
import { Button, Form, FormGroup, Label, Input, Col, Row, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Alert } from 'reactstrap';
import {useHistory} from 'react-router-dom';
import axios from 'axios';

function ManageUser() {
  let history = useHistory();

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
  var statuses = ["ALL", "PENDING", "DECLINED", "APPROVED"];
  var selected = [];

  const [username, setUsername] = useState("");

  const [statusDropdownOpen, setStatusDropdownOpen] = useState(false);
  const [statusSelected, setStatusSelected] = useState("Choose Status");
  const [data, setData] = useState([]);

  const [cannotDeclineApproved, setCannotDeclineApproved] = useState(false);

  useEffect(() => {
    axios.get(`https://cs4400-api.herokuapp.com/admin/filter_user/ALL/user_name/DES`)
      .then((response) => {
        // console.log(response.data.users);

        var initialData = [];
        var userList = response.data.users;

        for (var i=0; i < userList.length; i++) {
          var temp = {}
          temp.username = userList[i][0];
          temp.creditCardCount = userList[i][1];
          temp.userType = userList[i][2];
          temp.status = userList[i][3];
          initialData.push(temp);
        }
        setData(initialData);
      })
      .catch((err) => {
        console.log(err);
    });
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
    history.goBack();
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
    setCannotDeclineApproved(false);

    if (selected.length > 0) {
      for (var i= 0; i<selected.length; i++) {
        var username = data[selected[i]].username;
        axios.get(`https://cs4400-api.herokuapp.com/admin/approve/${username}`)
          .then((response) => {
            var newData = []
            if (selected.length > 0) {
              for (var i= 0; i< data.length; i++) {
                var newObj = {};
                newObj.username = data[i].username;
                newObj.creditCardCount = data[i].creditCardCount;
                newObj.userType = data[i].userType;
                newObj.status = data[i].status;
        
                if (selected.includes(i.toString())) {
                  newObj.status = "APPROVED";
                }
                newData.push(newObj);
              }
              setData(newData);
            }
          })
          .catch((err) => {
            console.log(err);
        });
      }
    }
  }

  const decline = () => {
    setCannotDeclineApproved(false);

    if (selected.length > 0) {
      for (var i= 0; i<selected.length; i++) {
        var username = data[selected[i]].username;
        axios.get(`https://cs4400-api.herokuapp.com/admin/decline/${username}`)
          .then((response) => {
            var newData = []
            if (selected.length > 0) {
              for (var i= 0; i< data.length; i++) {
                var newObj = {};
                newObj.username = data[i].username;
                newObj.creditCardCount = data[i].creditCardCount;
                newObj.userType = data[i].userType;
                newObj.status = data[i].status;
        
                if (selected.includes(i.toString())) {
                  newObj.status = "DECLINED";
                }
                newData.push(newObj);
              }
              setData(newData);
            }
          })
          .catch((err) => {
            setCannotDeclineApproved(true);
            // console.log(err);
        });
      }
    }
  }

  const filter = () => {
    // console.log(username, statusSelected);
    setCannotDeclineApproved(false);
    var url = `https://cs4400-api.herokuapp.com/admin/filter_user`;

    if (statusSelected === "Choose Status") {
      url += "/ALL";
    }

    url += "/user_name/DES";

    if (username !== "") {
      url += `/${username}`;
    }

    axios.get(url)
      .then((response) => {
        // console.log(response);
        var newData = [];
        var userList = response.data.users;

        for (var i=0; i < userList.length; i++) {
          var temp = {}
          temp.username = userList[i][0];
          temp.creditCardCount = userList[i][1];
          temp.userType = userList[i][2];
          temp.status = userList[i][3];
          newData.push(temp);
        }
        setData(newData);
      })
      .catch((err) => {
        console.log(err);
    });
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
                    defaultPageSize={5}
                    />
            </FormGroup>

            <Alert isOpen={cannotDeclineApproved} color="danger">
              Cannot decline approved users!
            </Alert>

            <div className="LoginButton">
              <Button color="primary" onClick={ goBack }>Back</Button> {' '}
            </div>

          </Form>
        </div>
      </div>
  );
}

export default ManageUser;