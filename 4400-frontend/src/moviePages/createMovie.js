import React, { useState } from 'react';
import { Button, Form, FormGroup, Label, Input, Col, Row } from 'reactstrap';
import {useHistory} from 'react-router-dom';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';

import moment from 'moment';

import { SingleDatePicker } from 'react-dates';

function CreateMovie() {
  let history = useHistory();

  const [date, setDate] = useState(moment.momentObj);
  const [name, setName] = useState("");
  const [duration, setDuration] = useState("");

  const [focused, setFocused] = useState(false);

  const handleInput = (target) => {
    var id = target.id;
    var val = target.value;

    if (id === "inputName") {
      setName(val);

    } else if (id === "inputDuration") {
      setDuration(val);
    } 
  }

  const handleDateChange = (date) => {  
    setDate(date);
  }

  const goBack = () => {
    history.push("/register");
  }

  const create = () => {
    // Add create logic 
    console.log(name, duration, date);

  }

  return (
      <div className="FullPage"> 
        <div className="LoginPage">
          <h2>Create Movie</h2>
        </div>
        <div>
          <Form className="RegistrationForm">
            <Row>
              <Col md={6}>
                <FormGroup>
                  <Label for="inputFirstName"> Name </Label>
                  <Input onChange={(e) => handleInput(e.target)} id="inputName" placeholder="Enter name" />
                </FormGroup>
              </Col>

              <Col md={6}>
                <FormGroup>
                  <Label for="inputCity"> Duration </Label>
                  <Input onChange={(e) => handleInput(e.target)} id="inputDuration" placeholder="Enter duration" />
                </FormGroup>
              </Col>

            </Row>

            <Row>
              <Col style={{textAlign: 'right'}} md={5}>
                <FormGroup>
                  <Label style={{marginTop: '10px'}}> Release Date </Label>        
                </FormGroup>
              </Col>

              <Col md={6}>
                <FormGroup>
                  <SingleDatePicker
                          date={date}
                          onDateChange={(date) => handleDateChange(date)}
                          focused={focused}
                          onFocusChange={({focused}) => setFocused(focused)}
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

export default CreateMovie;