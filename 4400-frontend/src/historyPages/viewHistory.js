import React, { useState, useEffect } from 'react';
import ReactTable from 'react-table';
import { Button, Form, FormGroup } from 'reactstrap';
import {useHistory} from 'react-router-dom';

function ViewHistory() {
  let history = useHistory();
  // console.log(history.location.state);

  const columns = [
    {
      Header: "Movie",
      accessor: 'movie'
    }, 
    {
      Header: "Theater",
      accessor: "theater"
    }, 
    {
      Header: "Company",
      accessor: "company"
    },
    {
      Header: "Card #",
      accessor: "cardNumber"
    }, 
    {
      Header: "View Date",
      accessor: "viewDate"
    }
]

  const [data, setData] = useState([]);

  useEffect(() => {
    // Get initial Data via API call
    const initialData = [
      {
        movie: "J",
        theater: "fooooasd",
        company: "AA",
        cardNumber: "asdagsdas",
        viewDate: "11/19/2019"
      }, 
      {
        movie: "Jasdasfsa",
        theater: "agsaf",
        company: "J",
        cardNumber: "bdagerasd",
        viewDate: "11/20/2019"
      }
    ]
    setData(initialData);
  }, [])

  const goBack = () => {
    history.push("/");
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
                    minRows={5}
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