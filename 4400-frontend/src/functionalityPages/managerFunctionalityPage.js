import React from 'react';
import { Button } from 'reactstrap';
import { useHistory } from 'react-router-dom';

function ManagerFunctionalityPage() {
  let history = useHistory();

  const overviewTheater = () => {
    history.push("/theater/overview");
  }

  const exploreTheater = () => {
    history.push("/theater/explore");
  }

  const visitHistory = () => {
    history.push("/history/visit");
  }

  const scheduleMovie = () => {
    history.push("/movie/schedule");
  }

  const goBack = () => {
    history.push("/");
  }

  return (
    <div className="parent">
    <h2 className="myH2"> Manager-Only Functionality </h2>

    <div>
      <Button color="primary" onClick={ overviewTheater }> Theater Overview </Button>{' '}
      <Button color="primary" onClick={ exploreTheater }> Explore Theater </Button>{' '}
    </div>
    <br/>

    <div>
      <Button color="primary" onClick={ scheduleMovie }> Schedule Movie </Button>{' '}
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