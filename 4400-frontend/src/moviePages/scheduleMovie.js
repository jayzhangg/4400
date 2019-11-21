import React, { useState } from 'react';
import { Button, Form, FormGroup, Label, Input, Col, Row } from 'reactstrap';
import {useHistory} from 'react-router-dom';
import moment from 'moment';

import { SingleDatePicker } from 'react-dates';

function ScheduleMovie() {
  let history = useHistory();

  const [name, setName] = useState("");
  const [duration, setDuration] = useState("");

  const [releaseDate, setReleaseDate] = useState(moment.momentObj);
  const [releaseDateFocused, setReleaseDateFocused] = useState(false);
  const [playDate, setPlayDate] = useState(moment.momentObj);
  const [playDateFocused, setPlayDateFocused] = useState(false);

  const handleInput = (target) => {
    var id = target.id;
    var val = target.value;

    if (id === "inputName") {
      setName(val);

    } else if (id === "inputDuration") {
      setDuration(val);
  
    } 
  }

  const goBack = () => {
    history.push("/register");
  }

  const create = () => {
    // Add create logic 
    console.log(name, releaseDate, playDate);

  }

  return (
      <div className="FullPage"> 
        <div className="LoginPage">
          <h2>Schedule Movie</h2>
        </div>
        <div>
          <Form className="RegistrationForm">
            <Row>
              <Col md={4}>
                <FormGroup>
                  <Label for="inputFirstName"> Name </Label>
                  <Input onChange={(e) => handleInput(e.target)} id="inputName" placeholder="Enter name" />
                </FormGroup>
              </Col>

              <Col md={3} style={{marginTop: '25px', textAlign: 'right', paddingRight: '1px'}}>
                <FormGroup>
                  <Label> Release Date </Label>        
                </FormGroup>
              </Col>

              <Col md={5} style={{marginTop: '15px'}}>
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