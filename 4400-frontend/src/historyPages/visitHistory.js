import React, { useState, useEffect } from 'react';
import ReactTable from 'react-table';
import { Alert, Button, Form, FormGroup, Label, Col, Row, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import {useHistory} from 'react-router-dom';
import axios from 'axios';

import moment from 'moment';

import { SingleDatePicker } from 'react-dates';

function VisitHistory() {
  let history = useHistory();
  var statePayload = history.location.state;
  var username = statePayload.username;
  // console.log(statePayload);

  const columns = [
    {
      Header: "Theater",
      accessor: "theater"
    }, 
    {
      Header: "Address",
      accessor: "address"
    }, 
    {
      Header: "Company",
      accessor: "company"
    },
    {
      Header: "Visit Date",
      accessor: "visitDate"
    }
]

  const [companies, setCompanies] = useState([]);
  const [companyDropdownOpen, setCompanyDropdownOpen] = useState(false);
  const [companySelected, setCompanySelected] = useState("Choose Company");

  const [data, setData] = useState([]);

  const [moviePlayDateFrom, setMoviePlayDateFrom] = useState(moment.momentObj);
  const [moviePlayDateFromFocused, setMoviePlayDateFromFocused] = useState(false);
  const [moviePlayDateTo, setMoviePlayDateTo] = useState(moment.momentObj);
  const [moviePlayDateToFocused, setMoviePlayDateToFocused] = useState(false);

  const [notAllFieldsPresent, setNotAllFieldsPresent] = useState(false);

  const companyToggle = () => setCompanyDropdownOpen(prevState => !prevState);

  useEffect(() => {
    axios.get(`https://cs4400-api.herokuapp.com/companies`)
      .then((response) => {
        // console.log(response.data);
        var companyList = response.data.companies;

        setCompanies(companyList);
      })
      .catch((err) => {
        console.log(err);
    });

    axios.get(`https://cs4400-api.herokuapp.com/user/visit_history/ALL/${username}/%/%`)
      .then((response) => {
        // console.log(response.data);
        var visitList = response.data.visits;
        var visits = [];

        for (var i = 0; i < visitList.length; i++) {
          var temp = {};
          temp.theater = visitList[i][0];
          temp.address = `${visitList[i][1]}, ${visitList[i][2]}, ${visitList[i][3]} ${visitList[i][4]}`;
          temp.company = visitList[i][5];
          temp.visitDate = visitList[i][6];
          visits.push(temp);
        }

        setData(visits);
      })
      .catch((err) => {
        console.log(err);
    });
  }, [])

  const goBack = () => {
    history.goBack();
  }

  const filter = () => {
    setNotAllFieldsPresent(false);
    // console.log(companySelected, moviePlayDateFrom, moviePlayDateTo);
    var url = `https://cs4400-api.herokuapp.com/user/visit_history`;

    if (companySelected === "Choose Company") {
      url += "/ALL";

    } else {
      url += `/${companySelected.toString()}`;
    }

    url += `/${username}`;

    if (moviePlayDateFrom === undefined || moviePlayDateTo === undefined) {
      url += "/%/%";

    } else {
      var formattedDateFrom = moviePlayDateFrom.format("YYYY-MM-DD");
      var formattedDateTo = moviePlayDateTo.format("YYYY-MM-DD");
      url += `/${formattedDateFrom}/${formattedDateTo}`;
    }
    
    axios.get(url)
      .then((response) => {
        // console.log(response.data);
        var visitList = response.data.visits;
        var visits = [];

        for (var i = 0; i < visitList.length; i++) {
          var temp = {};
          temp.theater = visitList[i][0];
          temp.address = `${visitList[i][1]}, ${visitList[i][2]}, ${visitList[i][3]} ${visitList[i][4]}`;
          temp.company = visitList[i][5];
          temp.visitDate = visitList[i][6];
          visits.push(temp);
        }

        setData(visits);
      })
      .catch((err) => {
        console.log(err);
    });
  }
  
  const handleCompanyClick = (company) => {
    setCompanySelected(company);
  }

  const displayCompanies = companies.map((company) => {
    return (
      <DropdownItem key={company} onClick={() => handleCompanyClick(company)}>
        {company}
      </DropdownItem>
    )
  });

  return (
      <div className="FullPage"> 
        <div className="LoginPage">
          <h2>Visit History</h2>
        </div>
        <div>
          <Form className="RegistrationForm">
            <Row>
              <Col>
                <FormGroup>
                <Label> Company Name </Label>
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
              <Col md={3}>
                <FormGroup>
                  <Label> Movie Play Date </Label>                
                </FormGroup>
              </Col>
              <Col md={9}>
                <FormGroup>
                <SingleDatePicker
                          date={moviePlayDateFrom}
                          onDateChange={(date) => setMoviePlayDateFrom(date)}
                          focused={moviePlayDateFromFocused}
                          onFocusChange={({focused}) => setMoviePlayDateFromFocused(focused)}
                          isOutsideRange={() => false}
                          id="2"
                          numberOfMonths={1}
                          showDefaultInputIcon
                          inputIconPosition="after"  
                        />
                        {" -- "}      
                        <SingleDatePicker
                          date={moviePlayDateTo}
                          onDateChange={(date) => setMoviePlayDateTo(date)}
                          focused={moviePlayDateToFocused}
                          onFocusChange={({focused}) => setMoviePlayDateToFocused(focused)}
                          isOutsideRange={() => false}
                          id="3"
                          numberOfMonths={1}
                          showDefaultInputIcon
                          inputIconPosition="after"  
                        />           
                </FormGroup>
              </Col>
            </Row>

            <FormGroup style={{textAlign:'center'}}>
              <Button color="primary" onClick={ filter }>Filter</Button> {' '}
            </FormGroup>

            <FormGroup>
              <ReactTable
                    data={data}
                    columns={columns}
                    defaultPageSize={5}
                    />
            </FormGroup>

            <Alert isOpen={notAllFieldsPresent} color="danger">
              All fields must have a value!
            </Alert>
            
            <div className="LoginButton">
              <Button color="primary" onClick={ goBack }>Back</Button> {' '}
            </div>

          </Form>
        </div>
      </div>
  );
}

export default VisitHistory;