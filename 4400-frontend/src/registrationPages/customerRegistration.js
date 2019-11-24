import React, { useState } from 'react';
import { Button, Form, FormGroup, Label, Input, Col, Row, Alert, ListGroup, ListGroupItem } from 'reactstrap';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

function CustomerRegistration() {
  let history = useHistory();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [creditCardNum, setCreditCardNum] = useState("");
  const [creditCards, setCreditCards] = useState([]);

  const [registerSuccess, setRegisterSuccess] = useState(false);
  const [registerFail, setRegisterFail] = useState(false);
  const [allFieldsPresent, setAllFieldsPresent] = useState(false);
  const [invalidCreditCardNums, setInvalidCreditCardNums] = useState(false);
  const [passwordShort, setPasswordShort] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState(false);
  const [badCardLength, setBadCardLength] = useState(false);

  const handleInput = (target) => {
    var id = target.id;
    var val = target.value;

    if (id === "inputFirstName") {
      setFirstName(val);

    } else if (id === "inputLastName") {
      setLastName(val);

    } else if (id === "inputUsername") {
      setUsername(val);

    } else if (id === "inputPassword") {
      setPassword(val);

    } else if (id === "inputConfirmPassword") {
      setConfirmPassword(val);

    } else if (id === "inputCreditCardNum") {
      setCreditCardNum(val);
    }
  }

  const goBack = () => {
    history.goBack();
  }

  const register = () => {
    setPasswordMatch(false);
    setPasswordShort(false);
    setAllFieldsPresent(false);
    setRegisterSuccess(false);
    setRegisterFail(false);
    setInvalidCreditCardNums(false);

    console.log(firstName, lastName, username, password, confirmPassword, creditCards);

    if (firstName === "" || firstName === "" || lastName === "" || username === "" || password === "" || confirmPassword === "") {
      setAllFieldsPresent(true);

    } else if (password.length < 7 || password !== confirmPassword) {
      if (password.length < 7) {
        setPasswordShort(true);
      }

      if (password !== confirmPassword ) {
        setPasswordMatch(true);
      }

    } else if (creditCards.length < 1 || creditCards.length > 5) {
      setInvalidCreditCardNums(true);

    } else {
      var cards = ""
      for(var i = 0; i < creditCards.length; i++) {
        cards += `/${creditCards[i]}`;
      }
      console.log(cards);  

      axios.get(`https://cs4400-api.herokuapp.com/register/customer/${firstName}/${lastName}/${username}/${password}/${confirmPassword}${cards}`)
        .then((response) => {
          console.log(response);
          setRegisterSuccess(true);
        })
        .catch((err) => {
          console.log(err);
          setRegisterFail(true);
      });
    }
  }

  const addCard = () => {
    setBadCardLength(false);

    if (creditCardNum.match(/^\d{16}$/)) {
      creditCards.push(creditCardNum);
      setCreditCardNum("");
      setCreditCards([...creditCards]);
    } else {
      setBadCardLength(true);
    }
  };

  const removeCard = (card) => {
    var indexToRemove = creditCards.indexOf(card);
    creditCards.splice(indexToRemove, 1);
    setCreditCards([...creditCards]);
  }

  const displayCreditCards = creditCards.map((card) => {
    return (
      <Row key={card.toString()}>
        <Col md={8}>
          <ListGroupItem> {card} </ListGroupItem>
        </Col>
        <Col>
          <FormGroup>
            <Button color="primary" onClick={() => removeCard(card) }>Remove</Button> {' '}
          </FormGroup>
        </Col>
      </Row>
    )
  });

  return (
      <div className="FullPage"> 
        <div className="LoginPage">
          <h2>Customer Registration</h2>
        </div>
        <div>
          <Form className="RegistrationForm">
            <Row>
              <Col md={6}>
                <FormGroup>
                  <Label for="inputFirstName"> First Name </Label>
                  <Input onChange={(e) => handleInput(e.target)} id="inputFirstName" placeholder="Enter username" />
                </FormGroup>
              </Col>

              <Col>
                <FormGroup>
                  <Label for="inputLastName"> Last Name </Label>
                  <Input onChange={(e) => handleInput(e.target)} id="inputLastName" placeholder="Enter password" />
                </FormGroup>
              </Col>
            </Row>

            <FormGroup>
              <Label for="inputUsername"> Username </Label>
              <Input onChange={(e) => handleInput(e.target)} id="inputUsername" placeholder="Enter username" />
            </FormGroup>

            <Row>
              <Col md={6}>
                <FormGroup>
                  <Label for="inputPassword"> Password </Label>
                  <Input type="password" onChange={(e) => handleInput(e.target)} id="inputPassword" placeholder="Enter password" />
                </FormGroup>
              </Col>

              <Col md={6}>
                <FormGroup>
                  <Label for="inputConfirmPassword"> Confirm Password </Label>
                  <Input type="password" onChange={(e) => handleInput(e.target)} id="inputConfirmPassword" placeholder="Enter password" />
                </FormGroup>
              </Col>
            </Row>

            <h5> Credit Card #s </h5>
            <ListGroup>
              {displayCreditCards}
            </ListGroup>

            <Row>
              <Col md={8}>
                <FormGroup>
                  <Input value={creditCardNum} onChange={(e) => handleInput(e.target)} id="inputCreditCardNum" placeholder="Enter number" />
                </FormGroup>
              </Col>

              <Col>
                <FormGroup>
                  <Button color="primary" onClick={ addCard }>Add</Button> {' '}
                </FormGroup>
              </Col>
            </Row>

            <Alert isOpen={allFieldsPresent} color="danger">
              All fields must have a value!
            </Alert>

            <Alert isOpen={passwordShort} color="danger">
              Password must be at least 8 characters!
            </Alert>

            <Alert isOpen={passwordMatch} color="danger">
              Passwords did not match!
            </Alert>

            <Alert isOpen={badCardLength} color="danger">
              Credit Card must be exactly 16 digits!
            </Alert>

            <Alert isOpen={invalidCreditCardNums} color="danger">
              Customers must have at least 1 card, and at most 5! 
            </Alert>

            <FormGroup className="LoginButton">
              <Button color="primary" onClick={ goBack }>Back</Button> {' '}
              <Button color="primary" onClick={ register }>Register</Button>
            </FormGroup>

            <Alert isOpen={registerSuccess} color="success">
              Registration Successful!
            </Alert>

            <Alert isOpen={registerFail} color="danger">
              Registration Failed! Entry already exists in the DB!
            </Alert>

          </Form>
        </div>
      </div>
  );
}

export default CustomerRegistration;