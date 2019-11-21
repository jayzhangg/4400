import React, { useState, useEffect } from 'react';
import ReactTable from 'react-table';
import { Button, Form, FormGroup, Label, Input, Col, Row, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import {useHistory} from 'react-router-dom';

import moment from 'moment';

import { SingleDatePicker } from 'react-dates';

function ExploreMovie() {
  let history = useHistory();

  const columns = [
    {
      Header: "Movie",
      accessor: 'movie',
      Cell: props => (
        <div>
          <input checked={selected === props.index.toString()} id={props.index} onChange={(e) => handleCheckboxClick(e)} type="radio"></input> {props.row.movie} 
        </div>
      )
    }, 
    {
      Header: "Theater",
      accessor: "theater"
    }, 
    {
      Header: "Address",
      accessor: "address"
    }, 
    {
      Header: "Company",
      accessor: "company"
    },
    {
      Header: "Play Date",
      accessor: "playDate"
    }
]

  var movies = ["J", "A", "Y", "Z"];
  var companies = ["J", "AA"];
  var states = ["AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL",
   "GA", "HI", "ID", "IL", "IN", "IA", "KS",
    "KY", "LA", "ME", "MD", "MA", "MI", "MN", "MS", "MO", "MT",
     "NE", "NV", "NH", "NJ", "NM", "NY", "NC", "ND", "OH", "OK",
      "OR", "PA", "RI", "SC", "SD", "TN", "TX", "UT", "VT", "VA",
       "WA", "WV", "WI", "WY"];
  var cards = ["abcdfegs", "bcdafsas"];
  
  const [city, setCity] = useState("");

  const [movieDropdownOpen, setMovieDropdownOpen] = useState(false);
  const [companyDropdownOpen, setCompanyDropdownOpen] = useState(false);
  const [stateDropdownOpen, setStateDropdownOpen] = useState(false);
  const [cardDropdownOpen, setCardDropdownOpen] = useState(false);

  const [companySelected, setCompanySelected] = useState("Choose Company");
  const [stateSelected, setStateSelected] = useState("Choose State");
  const [movieSelected, setMovieSelected] = useState("Choose Movie");
  const [cardSelected, setCardSelected] = useState("Choose Card");

  const [data, setData] = useState([]);
  const [selected, setSelected] = useState("");

  const [moviePlayDateFrom, setMoviePlayDateFrom] = useState(moment.momentObj);
  const [moviePlayDateFromFocused, setMoviePlayDateFromFocused] = useState(false);
  const [moviePlayDateTo, setMoviePlayDateTo] = useState(moment.momentObj);
  const [moviePlayDateToFocused, setMoviePlayDateToFocused] = useState(false);

  const companyToggle = () => setCompanyDropdownOpen(prevState => !prevState);
  const stateToggle = () => setStateDropdownOpen(prevState => !prevState);
  const movieToggle = () => setMovieDropdownOpen(prevState => !prevState);
  const cardToggle = () => setCardDropdownOpen(prevState => !prevState);

  useEffect(() => {
    // Get initial Data via API call
    const initialData = [
      {
        movie: "J",
        theater: "fooooasd",
        address: "ABC ST AAAAAAA",
        company: "AA",
        playDate: "11/19/2019"
      }, 
      {
        movie: "JADFSA",
        theater: "asfasgasd",
        address: "ABC ST BBBB",
        company: "J",
        playDate: "11/29/2019"
      }
    ]
    setData(initialData);
  }, [])

  const goBack = () => {
    history.push("/");
  }

  const filter = () => {
    console.log(movieSelected, companySelected, city, stateSelected, moviePlayDateFrom, moviePlayDateTo);
    // Do a DB read with the given constraints and repopulate the data, its way too hard to filter through all the data in the way this app is structured and using react table 
    const newData = [
      {
        movie: "bbbb",
        theater: "ADFA",
        address: "ADS BB AAAAAAA",
        company: "J",
        playDate: "9/5/2019"
      }, 
      {
        movie: "AAF",
        theater: "bfsdf",
        address: "tha ST BBBB",
        company: "AA",
        playDate: "4/20/2019"
      }
    ]
    setData(newData);
  }

  const view = () => {
    var movie = data[parseInt(selected)];
    console.log(movie);

  }

  const handleInput = (target) => {
    var id = target.id;
    var val = target.value;

    if (id === "inputCity") {
      setCity(val);
    }
  }

  const handleCheckboxClick = (e) => {
    var id = e.target.id;
    setSelected(id);
  }

  const handleCompanyClick = (company) => {
    setCompanySelected(company);
  }

  const handleStateClick = (state) => {
    setStateSelected(state);
  }

  const handleMovieClick = (movie) => {
    setMovieSelected(movie);
  }

  const handleCardClick = (card) => {
    setCardSelected(card);
  }

  const displayMovies = movies.map((movie) => {
    return (
      <DropdownItem key={movie} onClick={() => handleMovieClick(movie)}>
        {movie}
      </DropdownItem>
    )
  });

  const displayCompanies = companies.map((company) => {
    return (
      <DropdownItem key={company} onClick={() => handleCompanyClick(company)}>
        {company}
      </DropdownItem>
    )
  });

  const displayStates = states.map((state) => {
    return (
      <DropdownItem key={state} onClick={() => handleStateClick(state)}>
        {state}
      </DropdownItem>
    )
  });

  const displayCards = cards.map((card) => {
    return (
      <DropdownItem key={card} onClick={() => handleCardClick(card)}>
        {card}
      </DropdownItem>
    )
  });

  return (
      <div className="FullPage"> 
        <div className="LoginPage">
          <h2>Movie Explore</h2>
        </div>
        <div>
          <Form className="MovieExploreForm">
            <Row>
              <Col>
                <FormGroup>
                <Label> Movie Name </Label>
                  <Dropdown isOpen={movieDropdownOpen} toggle={movieToggle}>
                    <DropdownToggle caret>
                      {movieSelected}
                    </DropdownToggle>
                    <DropdownMenu modifiers={{
                                    setMaxHeight: {
                                      enabled: true,
                                      order: 890,
                                      fn: (data) => {
                                        return {
                                          ...data,
                                          styles: {
                                            ...data.styles,
                                            overflow: 'auto',
                                            maxHeight: 110,
                                          },
                                        };
                                      },
                                    },
                                  }}>
                        <DropdownItem header>Movies</DropdownItem>
                          {displayMovies}
                    </DropdownMenu>
                  </Dropdown>
                </FormGroup>
              </Col>

              <Col>
                <FormGroup>
                <Label> Company Name </Label>
                  <Dropdown isOpen={companyDropdownOpen} toggle={companyToggle}>
                      <DropdownToggle caret>
                        {companySelected}
                      </DropdownToggle>
                      <DropdownMenu modifiers={{
                                      setMaxHeight: {
                                        enabled: true,
                                        order: 890,
                                        fn: (data) => {
                                          return {
                                            ...data,
                                            styles: {
                                              ...data.styles,
                                              overflow: 'auto',
                                              maxHeight: 110,
                                            },
                                          };
                                        },
                                      },
                                    }}>
                          <DropdownItem header>Companies</DropdownItem>
                            {displayCompanies}
                      </DropdownMenu>
                    </Dropdown>                
                  </FormGroup>
              </Col>
            </Row>

            <Row>
              <Col md={6} >
                  <FormGroup>
                    <Label for="inputCity"> City </Label>
                    <Input onChange={(e) => handleInput(e.target)} id="inputCity" placeholder="Enter City" />
                  </FormGroup>
                </Col>

              <Col>
                <FormGroup>
                <Label> State </Label>
                  <Dropdown isOpen={stateDropdownOpen} toggle={stateToggle}>
                    <DropdownToggle caret>
                      {stateSelected}
                    </DropdownToggle>
                    <DropdownMenu modifiers={{
                                    setMaxHeight: {
                                      enabled: true,
                                      order: 890,
                                      fn: (data) => {
                                        return {
                                          ...data,
                                          styles: {
                                            ...data.styles,
                                            overflow: 'auto',
                                            maxHeight: 110,
                                          },
                                        };
                                      },
                                    },
                                  }}>
                      <DropdownItem header>States</DropdownItem>
                        {displayStates}
                    </DropdownMenu>
                  </Dropdown>          
                </FormGroup>
              </Col>
            </Row>

            <Row>
              <Col md={3}>
                <FormGroup>
                  <Label> Movie Play Date </Label>                
                </FormGroup>
              </Col>
              <Col md={9}>
                <FormGroup>
                <SingleDatePicker
                          date={moviePlayDateFrom}
                          onDateChange={(date) => setMoviePlayDateFrom(date)}
                          focused={moviePlayDateFromFocused}
                          onFocusChange={({focused}) => setMoviePlayDateFromFocused(focused)}
                          id="2"
                          numberOfMonths={1}
                          showDefaultInputIcon
                          inputIconPosition="after"  
                        />
                        {" -- "}      
                        <SingleDatePicker
                          date={moviePlayDateTo}
                          onDateChange={(date) => setMoviePlayDateTo(date)}
                          focused={moviePlayDateToFocused}
                          onFocusChange={({focused}) => setMoviePlayDateToFocused(focused)}
                          id="3"
                          numberOfMonths={1}
                          showDefaultInputIcon
                          inputIconPosition="after"  
                        />           
                </FormGroup>
              </Col>
            </Row>

            <FormGroup style={{textAlign:'center'}}>
              <Button color="primary" onClick={ filter }>Filter</Button> {' '}
            </FormGroup>

            <FormGroup>
              <ReactTable
                    data={data}
                    columns={columns}
                    minRows={5}
                    />
            </FormGroup>

            <Row>
              <Col md={4} style={{marginTop: '30px'}}>
                <FormGroup>
                  <Button color="primary" onClick={ goBack }>Back</Button> {' '}
                </FormGroup>
              </Col>
              
              <Col>
                <FormGroup>
                <Label> Card Number </Label>
                  <Dropdown isOpen={cardDropdownOpen} toggle={cardToggle}>
                    <DropdownToggle caret>
                      {cardSelected}
                    </DropdownToggle>
                    <DropdownMenu modifiers={{
                                    setMaxHeight: {
                                      enabled: true,
                                      order: 890,
                                      fn: (data) => {
                                        return {
                                          ...data,
                                          styles: {
                                            ...data.styles,
                                            overflow: 'auto',
                                            maxHeight: 110,
                                          },
                                        };
                                      },
                                    },
                                  }}>
                        <DropdownItem header>Cards</DropdownItem>
                          {displayCards}
                    </DropdownMenu>
                  </Dropdown>
                </FormGroup>
              </Col>

              <Col md={4} style={{marginTop: '30px'}}>
                <FormGroup>
                  <Button color="primary" onClick={ view }>View</Button> {' '}
                </FormGroup>
              </Col>

            </Row>

          </Form>
        </div>
      </div>
  );
}

export default ExploreMovie;