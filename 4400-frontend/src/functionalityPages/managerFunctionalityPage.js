import React, { useState, useEffect } from 'react';
import { Button } from 'reactstrap';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

function ManagerFunctionalityPage() {
  let history = useHistory();
  var statePayload = history.location.state;
  var username = statePayload.username;
  const [disableButton, setDisableButton] = useState(false);

  const overviewTheater = () => {
    history.push("/theater/overview", statePayload);
  }

  const exploreTheater = () => {
    history.push("/theater/explore", statePayload);
  }

  const visitHistory = () => {
    history.push("/history/visit", statePayload);
  }

  const scheduleMovie = () => {
    history.push("/movie/schedule", statePayload);
  }

  const goBack = () => {
    history.goBack();
  }

  useEffect(() => {
    axios.get(`https://cs4400-api.herokuapp.com/managers`)
      .then((response) => {
        var managers = response.data.managers;
        managers = [].concat.apply([], managers);
        if (!managers.includes(username)) {
          setDisableButton(true);
        }
      })
      .catch((err) => {
        console.log(err);
      })
  }, [])

  return (
    <div className="parent">
    <h2 className="myH2"> Manager-Only Functionality </h2>

    <div>
      <Button color="primary" onClick={ overviewTheater }> Theater Overview </Button>{' '}
      <Button color="primary" onClick={ exploreTheater }> Explore Theater </Button>{' '}
    </div>
    <br/>

    <div>
      <Button color="primary" disabled = {disableButton} onClick={ scheduleMovie }> Schedule Movie </Button>{' '}
      <Button color="primary" onClick={ visitHistory }> Visit History </Button>{' '}
    </div>
    <br/>

    <div>
      <Button color="primary" onClick={ goBack }> Back </Button>{' '}
    </div>
  </div>
  )
}

export default ManagerFunctionalityPage;