import React, { useState, useEffect } from 'react';
import ReactTable from 'react-table';
import { Button, Form, FormGroup } from 'reactstrap';
import {useHistory} from 'react-router-dom';
import axios from 'axios';

function ViewHistory() {
  let history = useHistory();
  var statePayload = history.location.state;
  var username = statePayload.username;

  const columns = [
    {
      Header: "Movie",
      accessor: 'movie',
      sortable: false,
      filterable: false
    }, 
    {
      Header: "Theater",
      accessor: "theater",
      sortable: false,
      filterable: false
    }, 
    {
      Header: "Company",
      accessor: "company",
      sortable: false,
      filterable: false
    },
    {
      Header: "Card #",
      accessor: "cardNumber",
      sortable: false,
      filterable: false
    }, 
    {
      Header: "View Date",
      accessor: "viewDate",
      sortable: false,
      filterable: false
    }
]

  const [data, setData] = useState([]);

  useEffect(() => {
    // console.log(username);
    axios.get(`https://cs4400-api.herokuapp.com/customer/view_history/${username}`)
      .then((response) => {
        // console.log(response.data);
        var historyList = response.data.history;
        var viewHistory = [];

        for (var i = 0; i < historyList.length; i++) {
          var temp = {}
          temp.movie = historyList[i][0];
          temp.theater = historyList[i][1];
          temp.company = historyList[i][2];
          temp.cardNumber = historyList[i][3];
          temp.viewDate = historyList[i][4];
          viewHistory.push(temp);
        }

        setData(viewHistory);
      })
      .catch((err) => {
        console.log(err);
    });
  }, [])

  const goBack = () => {
    history.goBack();
  }

  return (
      <div className="FullPage"> 
        <div className="LoginPage">
          <h2>View History</h2>
        </div>
        <div>
          <Form className="RegistrationForm">
            <FormGroup>
              <ReactTable
                    data={data}
                    columns={columns}
                    defaultPageSize={5}
                    />
            </FormGroup>

            <div className="LoginButton">
              <Button color="primary" onClick={ goBack }>Back</Button> {' '}
            </div>

          </Form>
        </div>
      </div>
  );
}

export default ViewHistory;