import React from 'react';
import { Button } from 'reactstrap';
import { useHistory } from 'react-router-dom';

function CustomerFunctionalityPage() {
  let history = useHistory();
  var statePayload = history.location.state;
  console.log(statePayload);

  const exploreTheater = () => {
    history.push("/theater/explore", statePayload);
  }

  const visitHistory = () => {
    history.push("/history/visit", statePayload);
  }

  const exploreMovie = () => {
    history.push("/movie/explore", statePayload);
  }

  const viewHistory = () => {
    history.push("/history/view", statePayload);
  }

  const goBack = () => {
    history.push("/");
  }

  return (
    <div className="parent">
    <h2 className="myH2"> Customer Functionality </h2>

    <div>
      <Button color="primary" onClick={ exploreMovie }> Explore Movie </Button>{' '}
      <Button color="primary" onClick={ viewHistory }> View History </Button>{' '}
    </div>
    <br/>

    <div>
      <Button color="primary" onClick={ exploreTheater }> Explore Theater </Button>{' '}
      <Button color="primary" onClick={ visitHistory }> Visit History </Button>{' '}
    </div>
    <br/>

    <div>
      <Button color="primary" onClick={ goBack }> Back </Button>{' '}
    </div>
  </div>
  )
}

export default CustomerFunctionalityPage;