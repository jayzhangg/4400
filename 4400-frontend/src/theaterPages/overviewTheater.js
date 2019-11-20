import React, { useState, useEffect } from 'react';
import ReactTable from 'react-table';
import { Button, Form, FormGroup, Label, Input, Col, Row, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import {useHistory} from 'react-router-dom';

import moment from 'moment';

import { SingleDatePicker } from 'react-dates';

function OverviewTheater() {
  let history = useHistory();

  const columns = [{
    Header: "Movie Name",
    accessor: 'movieName'
    }, {
      Header: "Duration",
      accessor: "duration"
    }, {
      Header: "Release Date",
      accessor: "releaseDate"
    }, {
      Header: "Play Date",
      accessor: "playDate"
  }]

  const [movieName, setMovieName] = useState("");
  const [movieDurationFrom, setMovieDurationFrom] = useState("");
  const [movieDurationTo, setMovieDurationTo] = useState("");

  const [data, setData] = useState([]);
  const [selected, setSelected] = useState(false);

  const [movieReleaseDateFrom, setMovieReleaseDateFrom] = useState(moment.momentObj);
  const [movieReleaseDateFromFocused, setMovieReleaseDateFromFocused] = useState(false);
  const [movieReleaseDateTo, setMovieReleaseDateTo] = useState(moment.momentObj);
  const [movieReleaseDateToFocused, setMovieReleaseDateToFocused] = useState(false);

  const [moviePlayDateFrom, setMoviePlayDateFrom] = useState(moment.momentObj);
  const [moviePlayDateFromFocused, setMoviePlayDateFromFocused] = useState(false);
  const [moviePlayDateTo, setMoviePlayDateTo] = useState(moment.momentObj);
  const [moviePlayDateToFocused, setMoviePlayDateToFocused] = useState(false);

  useEffect(() => {
    // Get initial Data via API call
    const initialData = [
      {
        movieName: "J",
        duration: "120",
        releaseDate: "11/18/2019",
        playDate: "11/19/2019"
      }, 
      {
        movieName: "AA",
        duration: "130",
        releaseDate: "11/20/2019",
        playDate: "11/27/2019"
      }
    ]
    setData(initialData);
  }, [])

  const handleInput = (target) => {
    var id = target.id;
    var val = target.value;

    if (id === "inputMovieName") {
      setMovieName(val);

    } else if (id === "inputMovieDurationFrom") {
      setMovieDurationFrom(val);

    } else if (id === "inputMovieDurationTo") {
      setMovieDurationTo(val);
    }
  }

  const goBack = () => {
    history.push("/");
  }

  const handleCheckboxClick = () => {
    setSelected(!selected);
  }

  const filter = () => {
    console.log(movieName, movieDurationFrom, movieDurationTo, selected, movieReleaseDateFrom, movieReleaseDateTo, moviePlayDateFrom, moviePlayDateTo);

    // Do a DB read with the given constraints and repopulate the data, its way too hard to filter through all the data in the way this app is structured and using react table 
    const newData = [
      {
        movieName: "JAJASJ",
        duration: "140",
        releaseDate: "11/20/2019",
        playDate: "11/29/2019"
      }, 
      {
        movieName: "AFADAD",
        duration: "140",
        releaseDate: "11/20/2019",
        playDate: "11/27/2019"
      }
    ]
    setData(newData);
  }

  return (
      <div className="FullPage"> 
        <div className="LoginPage">
          <h2>Theater Overview</h2>
        </div>
        <div>
          <Form className="RegistrationForm">
            <Row>
              <Col md={5}>
                <FormGroup>
                  <Label for="inputUsername"> Movie Name </Label>
                  <Input onChange={(e) => handleInput(e.target)} id="inputMovieName" placeholder="Enter name" />
                </FormGroup>
              </Col>

              <Col md={2} style={{paddingTop: '15px'}}>
                <FormGroup>
                  <Label for="inputUsername"> Movie Duration </Label>
                </FormGroup>
              </Col>

              <Col md={2} style={{paddingTop: '20px'}}>
                <FormGroup>
                  <Input onChange={(e) => handleInput(e.target)} id="inputMovieDurationFrom" placeholder="From" />
                </FormGroup>
              </Col>
              <div style={{paddingTop: '25px'}}>
              {" -- "}
              </div>
              <Col md={2} style={{paddingTop: '20px'}}>
                <FormGroup>
                  <Input onChange={(e) => handleInput(e.target)} id="inputMovieDurationTo" placeholder="To" />
                </FormGroup>
              </Col>
            </Row>

            <Row>
              <Col md={3}>
                <FormGroup>
                  <Label> Movie Release Date </Label>                
                </FormGroup>
              </Col>

              <Col md={9}>
                <FormGroup>
                  <SingleDatePicker
                            date={movieReleaseDateFrom}
                            onDateChange={(date) => setMovieReleaseDateFrom(date)}
                            focused={movieReleaseDateFromFocused}
                            onFocusChange={({focused}) => setMovieReleaseDateFromFocused(focused)}
                            id="0"
                            numberOfMonths={1}
                            showDefaultInputIcon
                            inputIconPosition="after"  
                          />
                          {" -- "}      
                          <SingleDatePicker
                            date={movieReleaseDateTo}
                            onDateChange={(date) => setMovieReleaseDateTo(date)}
                            focused={movieReleaseDateToFocused}
                            onFocusChange={({focused}) => setMovieReleaseDateToFocused(focused)}
                            id="1"
                            numberOfMonths={1}
                            showDefaultInputIcon
                            inputIconPosition="after"  
                          />           
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
              <input onClick={() => handleCheckboxClick()} type="checkbox"></input> Only Include Not Played Movies
            </FormGroup>

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

export default OverviewTheater;