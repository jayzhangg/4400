import React, { useState } from 'react';
import { Alert, Button, Form, FormGroup, Label, Input, Col, Row } from 'reactstrap';
import {useHistory} from 'react-router-dom';
import moment from 'moment';
import axios from 'axios';

import { SingleDatePicker } from 'react-dates';

function CreateMovie() {
  let history = useHistory();

  const [date, setDate] = useState(moment.momentObj);
  const [name, setName] = useState("");
  const [duration, setDuration] = useState("");

  const [focused, setFocused] = useState(false);

  const [notAllFieldsPresent, setNotAllFieldsPresent] = useState(false);
  const [createSuccess, setCreateSuccess] = useState(false);
  const [createFail, setCreateFail] = useState(false);
  const [badDuration, setBadDuration] = useState(false);

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
    history.goBack();
  }

  const create = () => {
    setBadDuration(false);
    setCreateFail(false);
    setCreateSuccess(false);
    setNotAllFieldsPresent(false);

    // Add create logic 
    // console.log(formattedDate, name, date); 

    if (name === "" || duration === "" || date === undefined) {
      setNotAllFieldsPresent(true);

    } else if (!duration.match(/^[0-9]*$/)) {
      setBadDuration(true);

    } else {
      var formattedDate = date.format('YYYY-MM-DD');
      axios.get(`https://cs4400-api.herokuapp.com/admin/create_movie/${name.toString()}/${duration}/${formattedDate}`)
        .then((response) => {
          // console.log(response);
          setName("");
          setDuration("");
          setDate(moment.momentObj);
          setCreateSuccess(true);
        })
        .catch((err) => {
          // console.log(err);
          setCreateFail(true);
      });
    }
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
                  <Input value={name} onChange={(e) => handleInput(e.target)} id="inputName" placeholder="Enter name" />
                </FormGroup>
              </Col>

              <Col md={6}>
                <FormGroup>
                  <Label for="inputCity"> Duration </Label>
                  <Input value={duration} onChange={(e) => handleInput(e.target)} id="inputDuration" placeholder="Enter duration" />
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
                          isOutsideRange={() => false}
                          id="0"
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

            <Alert isOpen={badDuration} color="danger">
              Duration must be a digit
            </Alert>

            <FormGroup className="LoginButton">
              <Button color="primary" onClick={ goBack }>Back</Button> {' '}
              <Button color="primary" onClick={ create }>Create</Button>
            </FormGroup>

            <Alert isOpen={createSuccess} color="success">
              Create Successful!
            </Alert>

            <Alert isOpen={createFail} color="danger">
              Create Failed! Entry already exists in the DB. 
            </Alert>

          </Form>
        </div>
      </div>
  );
}

export default CreateMovie;