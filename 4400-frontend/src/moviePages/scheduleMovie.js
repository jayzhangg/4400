import React, { useState, useEffect } from 'react';
import { Alert, Button, Form, FormGroup, Label, Col, Row, Dropdown, DropdownMenu, DropdownItem, DropdownToggle } from 'reactstrap';
import {useHistory} from 'react-router-dom';
import moment from 'moment';
import axios from 'axios';

import { SingleDatePicker } from 'react-dates';

function ScheduleMovie() {
  let history = useHistory();
  var statePayload = history.location.state;
  var username = statePayload.username;
  console.log(statePayload);

  const [movies, setMovies] = useState([]);
  const [movieSelected, setMovieSelected] = useState("Choose Movie");
  const [movieDropdownOpen, setMovieDropdownOpen] = useState(false);

  const [releaseDate, setReleaseDate] = useState(moment.momentObj);
  const [releaseDateFocused, setReleaseDateFocused] = useState(false);
  const [playDate, setPlayDate] = useState(moment.momentObj);
  const [playDateFocused, setPlayDateFocused] = useState(false);

  const [registerSuccess, setRegisterSuccess] = useState(false);
  const [registerFail, setRegisterFail] = useState(false);
  const [notAllFieldsPresent, setNotAllFieldsPresent] = useState(false);

  const movieToggle = () => setMovieDropdownOpen(prevState => !prevState);

  useEffect(() => {
    axios.get(`https://cs4400-api.herokuapp.com/movies`)
      .then((response) => {
        // console.log(response.data);
        var movieList = response.data.movies;
        var movies = [];

        for (var i = 0; i < movieList.length; i++) {
          movies.push(movieList[i][0]);
        }
        
        setMovies(movies);
      })
      .catch((err) => {
        console.log(err);
    });
  }, [])

  const goBack = () => {
    history.push("/register");
  }

  const schedule = () => {
    setNotAllFieldsPresent(false);
    setRegisterSuccess(false);
    setRegisterFail(false);

    // Add create logic 
    if (movieSelected === "Choose Movie" || releaseDate === undefined || playDate === undefined) {
      setNotAllFieldsPresent(true);

    } else {
      var formattedReleaseDate = releaseDate.format("YYYY-MM-DD"); 
      var formattedPlayDate = playDate.format("YYYY-MM-DD"); 
      console.log(formattedPlayDate, formattedReleaseDate, username, movieSelected.toString());

      axios.get(`https://cs4400-api.herokuapp.com/manager/schedule_movie/${username}/${movieSelected.toString()}/${formattedReleaseDate}/${formattedPlayDate}`)
        .then((response) => {
          // console.log(response.data);
          setRegisterSuccess(true);
        })
        .catch((err) => {
          // console.log(err);
          setRegisterFail(true);
      });
    }
  }

  const handleMovieClick = (movie) => {
    setMovieSelected(movie);
  }

  const displayMovies = movies.map((movie) => {
    return (
      <DropdownItem key={movie} onClick={() => handleMovieClick(movie)}>
        {movie}
      </DropdownItem>
    )
  });

  return (
      <div className="FullPage"> 
        <div className="LoginPage">
          <h2>Schedule Movie</h2>
        </div>
        <div>
          <Form className="RegistrationForm">
            <Row style={{marginBottom: "25px"}}>
              <Col md={6}>
                <FormGroup style={{marginTop: "10px"}}>
                  <Label> Name </Label>
                  <Dropdown isOpen={movieDropdownOpen} toggle={movieToggle}>
                      <DropdownToggle caret>
                        {movieSelected}
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
                          <DropdownItem header>Movies</DropdownItem>
                            {displayMovies}
                        </DropdownMenu>
                    </Dropdown>
                </FormGroup>
              </Col>

              <Col md={6} >
                <FormGroup>
                <Label> Release Date </Label>        
                  <SingleDatePicker
                          date={releaseDate}
                          onDateChange={(date) => setReleaseDate(date)}
                          focused={releaseDateFocused}
                          onFocusChange={({focused}) => setReleaseDateFocused(focused)}
                          isOutsideRange={() => false}
                          id="0"
                          numberOfMonths={1}
                          showDefaultInputIcon
                          inputIconPosition="after"  
                        />                     
                </FormGroup>              
              </Col>
            </Row>

            <Row>
              <Col style={{textAlign: 'right'}} md={5}>
                <FormGroup>
                  <Label style={{marginTop: '10px'}}> Play Date </Label>        
                </FormGroup>
              </Col>

              <Col md={6}>
                <FormGroup>
                  <SingleDatePicker
                          date={playDate}
                          onDateChange={(date) => setPlayDate(date)}
                          focused={playDateFocused}
                          onFocusChange={({focused}) => setPlayDateFocused(focused)}
                          isOutsideRange={() => false}
                          id="1"
                          numberOfMonths={1}
                          showDefaultInputIcon
                          inputIconPosition="after"
                        />                     
                </FormGroup>              
              </Col>
            </Row>

            <Alert isOpen={notAllFieldsPresent} color="danger">
              All fields must have a value!
            </Alert>

            <FormGroup className="LoginButton">
              <Button color="primary" onClick={ goBack }>Back</Button> {' '}
              <Button color="primary" onClick={ schedule }>Schedule</Button>
            </FormGroup>

            <Alert isOpen={registerSuccess} color="success">
              Register Successful!
            </Alert>

            <Alert isOpen={registerFail} color="danger">
              Register Failed!
            </Alert>

          </Form>
        </div>
      </div>
  );
}

export default ScheduleMovie;