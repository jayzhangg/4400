import React, { useState, useEffect } from 'react';
import ReactTable from 'react-table';
import { Alert, Button, Form, FormGroup, Label, Input, Col, Row, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import {useHistory} from 'react-router-dom';
import axios from 'axios';

import moment from 'moment';

import { SingleDatePicker } from 'react-dates';

function ExploreTheater() {
  let history = useHistory();
  var statePayload = history.location.state;
  var username = statePayload.username;
  // console.log(statePayload);

  const columns = [
    {
      Header: "Theater",
      accessor: 'theater',
      Cell: props => (
        <div>
          <input checked={selected === props.index.toString()} id={props.index} onChange={(e) => handleCheckboxClick(e)} type="radio"></input> {props.row.theater} 
        </div>
      )
    },
    {
      Header: "Address",
      accessor: "address"
    }, 
    {
      Header: "Company",
      accessor: "company"
    }
]
  var states = ["AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL",
   "GA", "HI", "ID", "IL", "IN", "IA", "KS",
    "KY", "LA", "ME", "MD", "MA", "MI", "MN", "MS", "MO", "MT",
     "NE", "NV", "NH", "NJ", "NM", "NY", "NC", "ND", "OH", "OK",
      "OR", "PA", "RI", "SC", "SD", "TN", "TX", "UT", "VT", "VA",
       "WA", "WV", "WI", "WY"];
  
  const [theaters, setTheaters] = useState([]);     
  const [companies, setCompanies] = useState([]);    
  const [city, setCity] = useState("");

  const [theaterDropdownOpen, setTheaterDropdownOpen] = useState(false);
  const [companyDropdownOpen, setCompanyDropdownOpen] = useState(false);
  const [stateDropdownOpen, setStateDropdownOpen] = useState(false);

  const [companySelected, setCompanySelected] = useState("Choose Company");
  const [stateSelected, setStateSelected] = useState("Choose State");
  const [theaterSelected, setTheaterSelected] = useState("Choose Theater");

  const [data, setData] = useState([]);
  const [selected, setSelected] = useState("");

  const [movieVisitDate, setMovieVisitDate] = useState(moment.momentObj);
  const [movieVisitDateFocused, setMovieVisitDateFocused] = useState(false);

  const [notAllFieldsPresent, setNotAllFieldsPresent] = useState(false);
  const [visitSuccess, setVisitSuccess] = useState(false);
  const [visitFail, setVisitFail] = useState(false);

  const companyToggle = () => setCompanyDropdownOpen(prevState => !prevState);
  const stateToggle = () => setStateDropdownOpen(prevState => !prevState);
  const theaterToggle = () => setTheaterDropdownOpen(prevState => !prevState);

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

    axios.get(`https://cs4400-api.herokuapp.com/user/filter_theater/ALL/ALL`)
      .then((response) => {
        // console.log(response.data);
        var theaterList = response.data.theaters;
        var theaterData = [];
        var theaterNames = [];

        for (var i = 0; i < theaterList.length; i++) {
          var temp = {}
          temp.theater = theaterList[i][0];
          temp.address = `${theaterList[i][1]}, ${theaterList[i][2]}, ${theaterList[i][3]} ${theaterList[i][4]}`;
          temp.company = theaterList[i][5];
          theaterData.push(temp);

          if (!theaterNames.includes(theaterList[i][0])) {
            theaterNames.push(theaterList[i][0]);
          } 
        }
        setTheaters(theaterNames);
        setData(theaterData);
      })
      .catch((err) => {
        console.log(err);
    });
  }, [])

  const goBack = () => {
    history.goBack();
  }

  const filter = () => {
    var useTheater = theaterSelected;
    var useCompany = companySelected;

    // console.log(useTheater, useCompany, city, stateSelected);
    
    if (useTheater === "Choose Theater") {
      useTheater = "ALL";
    }

    if (useCompany === "Choose Company") {
      useCompany = "ALL";
    }

    var url = `https://cs4400-api.herokuapp.com/user/filter_theater/${useTheater}/${useCompany}`;

    if (city !== "" && stateSelected !== "Choose State") {
      url += `/${city}/${stateSelected}`;
    } else {
      axios.get(url)
        .then((response) => {
          console.log(response.data);
          var theaterList = response.data.theaters;
          var theaterData = [];
          var theaterNames = [];

          for (var i = 0; i < theaterList.length; i++) {
            var temp = {}
            temp.theater = theaterList[i][0];
            temp.address = `${theaterList[i][1]}, ${theaterList[i][2]}, ${theaterList[i][3]} ${theaterList[i][4]}`;
            temp.company = theaterList[i][5];
            theaterData.push(temp);

            if (!theaterNames.includes(theaterList[i][0])) {
              theaterNames.push(theaterList[i][0]);
            } 
          }
          setTheaters(theaterNames);
          setData(theaterData);
        })
        .catch((err) => {
          console.log(err);
      });
    }
  }

  const logVisit = () => {
    setNotAllFieldsPresent(false);
    setVisitSuccess(false);
    setVisitFail(false);

    var theater = data[parseInt(selected)];

    console.log(theater, movieVisitDate);

    if (theater === undefined || movieVisitDate === undefined) {
      setNotAllFieldsPresent(true);

    } else {
      var formattedVisitDate = movieVisitDate.format("YYYY-MM-DD");
      axios.get(`https://cs4400-api.herokuapp.com/user/visit_theater/${theater.theater}/${theater.company}/${formattedVisitDate}/${username}`)
        .then((response) => {
          // console.log(response.data);
          setVisitSuccess(true);

        })
        .catch((err) => {
          // console.log(err);
          setVisitFail(true);
      });
    }

  }

  const handleInput = (target) => {
    var id = target.id;
    var val = target.value;

    if (id === "inputCity") {
      setCity(val);
    }
  }

  const handleCheckboxClick = (e) => {
    var id = e.target.id;
    setSelected(id);
  }

  const handleCompanyClick = (company) => {
    setCompanySelected(company);
  }

  const handleStateClick = (state) => {
    setStateSelected(state);
  }

  const handleTheaterClick = (theater) => {
    setTheaterSelected(theater);
  }

  const displayTheater = theaters.map((theater) => {
    return (
      <DropdownItem key={theater} onClick={() => handleTheaterClick(theater)}>
        {theater}
      </DropdownItem>
    )
  });

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
          <h2>Explore Theater</h2>
        </div>
        <div>
          <Form className="RegistrationForm">
            <Row>
              <Col>
                <FormGroup>
                <Label> Theater Name </Label>
                  <Dropdown isOpen={theaterDropdownOpen} toggle={theaterToggle}>
                    <DropdownToggle caret>
                      {theaterSelected}
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
                        <DropdownItem header>Theaters</DropdownItem>
                          {displayTheater}
                    </DropdownMenu>
                  </Dropdown>
                </FormGroup>
              </Col>

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
              <Col md={6} >
                  <FormGroup>
                    <Label for="inputCity"> City </Label>
                    <Input onChange={(e) => handleInput(e.target)} id="inputCity" placeholder="Enter City" />
                  </FormGroup>
                </Col>

              <Col>
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

            <Row>
              <Col md={2}>
                <FormGroup>
                <Button color="primary" onClick={ goBack }>Back</Button> {' '}
                </FormGroup>
              </Col>

              <Col md={2} style={{paddingRight: "0px"}}>
                <FormGroup>
                  <Label> Visit Date </Label>                
                </FormGroup>
              </Col>

              <Col md={5} style={{paddingLeft: "0px"}}> 
                <FormGroup>
                  <SingleDatePicker
                    date={movieVisitDate}
                    onDateChange={(date) => setMovieVisitDate(date)}
                    focused={movieVisitDateFocused}
                    onFocusChange={({focused}) => setMovieVisitDateFocused(focused)}
                    isOutsideRange={() => false}
                    id="0"
                    numberOfMonths={1}
                    showDefaultInputIcon
                    inputIconPosition="after"  
                  />           
                </FormGroup>
              </Col>

              <Col md={3}>
                <FormGroup>
                <Button color="primary" onClick={ logVisit }>Log Visit</Button> {' '}
                </FormGroup>
              </Col>

            </Row>

            <Alert isOpen={notAllFieldsPresent} color="danger">
              All fields must have a value!
            </Alert>

            <Alert isOpen={visitSuccess} color="success">
              Visit Successful!
            </Alert>

            <Alert isOpen={visitFail} color="danger">
              Visit Failed!
            </Alert>

          </Form>
        </div>
      </div>
  );
}

export default ExploreTheater;