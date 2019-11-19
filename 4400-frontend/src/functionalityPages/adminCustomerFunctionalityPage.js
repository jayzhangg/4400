import React from 'react';
import { Button } from 'reactstrap';
import { useHistory } from 'react-router-dom';

function AdminCustomerFunctionalityPage() {
  let history = useHistory();

  const manageUser = () => {
    history.push("/manage/user");
  }

  const exploreMovie = () => {
    history.push("/movie/explore");
  }

  const manageCompany = () => {
    history.push("/manage/company");
  }

  const exploreTheater = () => {
    history.push("/theater/explore");
  }

  const createMovie = () => {
    history.push("/movie/create");
  }

  const viewHistory = () => {
    history.push("/history/view");
  }

  const visitHistory = () => {
    history.push("/history/visit");
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