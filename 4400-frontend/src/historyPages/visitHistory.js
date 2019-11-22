import React, { useState, useEffect } from 'react';
import ReactTable from 'react-table';
import { Button, Form, FormGroup, Label, Col, Row, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import {useHistory} from 'react-router-dom';

import moment from 'moment';

import { SingleDatePicker } from 'react-dates';

function VisitHistory() {
  let history = useHistory();

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

  var companies = ["J", "AA"];
  
  const [companyDropdownOpen, setCompanyDropdownOpen] = useState(false);
  const [companySelected, setCompanySelected] = useState("Choose Company");

  const [data, setData] = useState([]);

  const [moviePlayDateFrom, setMoviePlayDateFrom] = useState(moment.momentObj);
  const [moviePlayDateFromFocused, setMoviePlayDateFromFocused] = useState(false);
  const [moviePlayDateTo, setMoviePlayDateTo] = useState(moment.momentObj);
  const [moviePlayDateToFocused, setMoviePlayDateToFocused] = useState(false);

  const companyToggle = () => setCompanyDropdownOpen(prevState => !prevState);

  useEffect(() => {
    // Get initial Data via API call
    const initialData = [
      {
        theater: "fooooasd",
        address: "ABC ST AAAAAAA",
        company: "AA",
        visitDate: "11/19/2019"
      }, 
      {
        theater: "asfasgasd",
        address: "ABC ST BBBB",
        company: "J",
        visitDate: "11/29/2019"
      }
    ]
    setData(initialData);
  }, [])

  const goBack = () => {
    history.push("/");
  }

  const filter = () => {
    console.log(companySelected, moviePlayDateFrom, moviePlayDateTo);
    // Do a DB read with the given constraints and repopulate the data, its way too hard to filter through all the data in the way this app is structured and using react table 
    const newData = [
      {
        theater: "ADFA",
        address: "ADS BB AAAAAAA",
        company: "J",
        visitDate: "9/5/2019"
      }, 
      {
        theater: "bfsdf",
        address: "tha ST BBBB",
        company: "AA",
        visitDate: "4/20/2019"
      }
    ]
    setData(newData);
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

export default VisitHistory;