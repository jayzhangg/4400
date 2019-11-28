import React from 'react';
import { Button } from 'reactstrap';
import { useHistory } from 'react-router-dom';

function AdminCustomerFunctionalityPage() {
  let history = useHistory();
  var statePayload = history.location.state;
  console.log(statePayload);

  const manageUser = () => {
    history.push("/manage/user", statePayload);
  }

  const exploreMovie = () => {
    history.push("/movie/explore", statePayload);
  }

  const manageCompany = () => {
    history.push("/manage/company", statePayload);
  }

  const exploreTheater = () => {
    history.push("/theater/explore", statePayload);
  }

  const createMovie = () => {
    history.push("/movie/create", statePayload);
  }

  const viewHistory = () => {
    history.push("/history/view", statePayload);
  }

  const visitHistory = () => {
    history.push("/history/visit", statePayload);
  }

  const goBack = () => {
    history.push("/");
  }

  return (
    <div className="parent">
    <h2 className="myH2"> Admin-Customer Functionality </h2>

    <div>
      <Button color="primary" onClick={ manageUser }> Manage User </Button>{' '}
      <Button color="primary" onClick={ exploreMovie }> Explore Movie </Button>{' '}
    </div>
    <br/>

    <div>
      <Button color="primary" onClick={ manageCompany }> Manage Company </Button>{' '}
      <Button color="primary" onClick={ exploreTheater }> Explore Theater </Button>{' '}
    </div>
    <br/>

    <div>
      <Button color="primary" onClick={ createMovie }> Create Movie </Button>{' '}
      <Button color="primary" onClick={ viewHistory }> View History </Button>{' '}
    </div>
    <br/>

    <div>
      <Button color="primary" onClick={ visitHistory }> Visit History </Button>{' '}
      <Button color="primary" onClick={ goBack }> Back </Button>{' '}
    </div>
  </div>
  )
}

export default AdminCustomerFunctionalityPage;