import React from 'react';
import { Button } from 'reactstrap';
import { useHistory } from 'react-router-dom';

function UserFunctionalityPage() {
  let history = useHistory();

  const exploreTheater = () => {
    history.push("/theater/explore");
  }

  const visitHistory = () => {
    history.push("/history/visit");
  }

  const goBack = () => {
    history.push("/");
  }

  return (
    <div className="parent">
    <h2 className="myH2"> User Functionality </h2>

    <div>
      <Button color="primary" onClick={ exploreTheater }> Explore Theater </Button>{' '}
    </div>
    <br/>

    <div>
      <Button color="primary" onClick={ visitHistory }> Visit History </Button>{' '}
    </div>
    <br/>

    <div>
      <Button color="primary" onClick={ goBack }> Back </Button>{' '}
    </div>
  </div>
  )
}

export default UserFunctionalityPage;