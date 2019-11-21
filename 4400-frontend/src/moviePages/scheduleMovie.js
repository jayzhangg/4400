import React, { useState } from 'react';
import { Button, Form, FormGroup, Label, Col, Row, Dropdown, DropdownMenu, DropdownItem, DropdownToggle } from 'reactstrap';
import {useHistory} from 'react-router-dom';
import moment from 'moment';

import { SingleDatePicker } from 'react-dates';

function ScheduleMovie() {
  let history = useHistory();

  var movies = ["J", "A", "Y", "Z"];

  const [movieDropdownOpen, setMovieDropdownOpen] = useState(false);
  const [movieSelected, setMovieSelected] = useState("Choose Movie");

  const [releaseDate, setReleaseDate] = useState(moment.momentObj);
  const [releaseDateFocused, setReleaseDateFocused] = useState(false);
  const [playDate, setPlayDate] = useState(moment.momentObj);
  const [playDateFocused, setPlayDateFocused] = useState(false);

  const movieToggle = () => setMovieDropdownOpen(prevState => !prevState);

  const goBack = () => {
    history.push("/register");
  }

  const create = () => {
    // Add create logic 
    console.log(movieSelected, releaseDate, playDate);

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
            <Row>
              <Col md={4} style={{marginTop: '5px'}}>
                <FormGroup>
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

              <Col md={3} style={{marginTop: '10px', textAlign: 'right', paddingRight: '1px'}}>
                <FormGroup>
                  <Label> Release Date </Label>        
                </FormGroup>
              </Col>

              <Col md={5} >
                <FormGroup>
                  <SingleDatePicker
                          date={releaseDate}
                          onDateChange={(date) => setReleaseDate(date)}
                          focused={releaseDateFocused}
                          onFocusChange={({focused}) => setReleaseDateFocused(focused)}
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
                          id="0"
                          numberOfMonths={1}
                          showDefaultInputIcon
                          inputIconPosition="after"
                        />                     
                </FormGroup>              
              </Col>
            </Row>

            <div className="LoginButton">
              <Button color="primary" onClick={ goBack }>Back</Button> {' '}
              <Button color="primary" onClick={ create }>Create</Button>
            </div>

          </Form>
        </div>
      </div>
  );
}

export default ScheduleMovie;