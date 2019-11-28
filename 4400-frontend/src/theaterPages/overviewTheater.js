import React, { useState, useEffect } from 'react';
import ReactTable from 'react-table';
import { Button, Form, FormGroup, Label, Input, Col, Row } from 'reactstrap';
import {useHistory} from 'react-router-dom';
import axios from 'axios';

import moment from 'moment';

import { SingleDatePicker } from 'react-dates';

function OverviewTheater() {
  let history = useHistory();
  var statePayload = history.location.state;
  var username = statePayload.username;
  // console.log(statePayload);

  const columns = [
    {
      Header: "Movie Name",
      accessor: 'movieName',
      width: 250,
      sortable: false,
      filterable: false
    }, 
    {
      Header: "Duration",
      accessor: "duration",
      sortable: false,
      filterable: false
    }, 
    {
      Header: "Release Date",
      accessor: "releaseDate",
      sortable: false,
      filterable: false
    }, 
    {
      Header: "Play Date",
      accessor: "playDate",
      sortable: false,
      filterable: false
    }
  ]

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
    axios.get(`https://cs4400-api.herokuapp.com/manager/filter_theater/${username}/%/%/%/%/%/%/%/false`)
      .then((response) => {
        // console.log(response.data);
        var movieList = response.data.movies;
        var movieData = [];

        for (var i = 0; i < movieList.length; i++) {
          var temp = {}
          temp.movieName = movieList[i][0];
          temp.duration = movieList[i][1];
          temp.releaseDate = movieList[i][2];
          temp.playDate = movieList[i][3];

          movieData.push(temp);

        }
        setData(movieData);

      })
      .catch((err) => {
        console.log(err);
    });
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
    history.goBack();
  }

  const handleCheckboxClick = () => {
    setSelected(!selected);
  }

  const filter = () => {
    console.log(movieName, movieDurationFrom, movieDurationTo, selected, movieReleaseDateFrom, movieReleaseDateTo, moviePlayDateFrom, moviePlayDateTo);

    var url = `https://cs4400-api.herokuapp.com/manager/filter_theater/${username}`;

    if (movieName === "") {
      url += "/%";
    } else {
      url += `/${movieName}`;
    }

    if (movieDurationFrom === "" || movieDurationTo === "") {
      url += "/%/%";
    } else {
      url += `/${movieDurationFrom}/${movieDurationTo}`;
    }

    if (movieReleaseDateFrom === undefined || movieReleaseDateTo === undefined || movieReleaseDateFrom === null || movieReleaseDateTo === null) {
      url += "/%/%";
    } else {
      var formattedReleaseDateFrom = movieReleaseDateFrom.format("YYYY-MM-DD");
      var formattedReleaseDateTo = movieReleaseDateTo.format("YYYY-MM-DD");

      url += `/${formattedReleaseDateFrom}/${formattedReleaseDateTo}`;
    }

    if (moviePlayDateFrom === undefined || moviePlayDateTo === undefined || moviePlayDateFrom === null || moviePlayDateTo === null) {
      url += "/%/%";
    } else {
      var formattedPlayDateFrom = moviePlayDateFrom.format("YYYY-MM-DD");
      var formattedPlayDateTo = moviePlayDateTo.format("YYYY-MM-DD");

      url += `/${formattedPlayDateFrom}/${formattedPlayDateTo}`;
    }

    url += `/${selected}`;

    axios.get(url)
      .then((response) => {
        console.log(response.data);
        var movieList = response.data.movies;
        var movieData = [];

        for (var i = 0; i < movieList.length; i++) {
          var temp = {}
          temp.movieName = movieList[i][0];
          temp.duration = movieList[i][1];
          temp.releaseDate = movieList[i][2];
          temp.playDate = movieList[i][3];

          movieData.push(temp);

        }
        setData(movieData);

      })
      .catch((err) => {
        console.log(err);
    });
  }

  return (
      <div className="FullPage"> 
        <div className="LoginPage">
          <h2>Theater Overview</h2>
        </div>
        <div>
          <Form className="MovieExploreForm">
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
                            isOutsideRange={() => false}
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
                            isOutsideRange={() => false}
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
              <input onClick={() => handleCheckboxClick()} type="checkbox"></input> Only Include Not Played Movies
            </FormGroup>

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

            <div className="LoginButton">
              <Button color="primary" onClick={ goBack }>Back</Button> {' '}
            </div>

          </Form>
        </div>
      </div>
  );
}

export default OverviewTheater;