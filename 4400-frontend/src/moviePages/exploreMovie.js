import React, { useState, useEffect } from 'react';
import ReactTable from 'react-table';
import { Alert, Button, Form, FormGroup, Label, Input, Col, Row, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import {useHistory} from 'react-router-dom';
import axios from 'axios';

import moment from 'moment';

import { SingleDatePicker } from 'react-dates';

function ExploreMovie() {
  let history = useHistory();
  var statePayload = history.location.state;
  var username = statePayload.username;
  // console.log(statePayload);

  const columns = [
    {
      Header: "Movie",
      accessor: 'movie',
      width: 250,
      sortable: false,
      filterable: false,
      Cell: props => (
        <div>
          <input checked={selected === props.index.toString()} id={props.index} onChange={(e) => handleCheckboxClick(e)} type="radio"></input> {props.row.movie} 
        </div>
      )
    }, 
    {
      Header: "Theater",
      accessor: "theater",
      sortable: false,
      filterable: false
    }, 
    {
      Header: "Address",
      accessor: "address",
      width: 250,
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
      Header: "Play Date",
      accessor: "playDate",
      sortable: false,
      filterable: false
    }
]

  var states = ["ALL", "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL",
   "GA", "HI", "ID", "IL", "IN", "IA", "KS",
    "KY", "LA", "ME", "MD", "MA", "MI", "MN", "MS", "MO", "MT",
     "NE", "NV", "NH", "NJ", "NM", "NY", "NC", "ND", "OH", "OK",
      "OR", "PA", "RI", "SC", "SD", "TN", "TX", "UT", "VT", "VA",
       "WA", "WV", "WI", "WY"];
  
  const [movies, setMovies] = useState([]);     
  const [companies, setCompanies] = useState([]);     
  const [cards, setCards] = useState([]);
  const [city, setCity] = useState("");
  const [seenMovies, setSeenMovies] = useState({});

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

  const [notAllFieldsPresent, setNotAllFieldsPresent] = useState(false);
  const [tooManyMovies, setTooManyMovies] = useState(false);
  const [viewSuccess, setViewSuccess] = useState(false);
  const [viewFail, setViewFail] = useState(false);

  const companyToggle = () => setCompanyDropdownOpen(prevState => !prevState);
  const stateToggle = () => setStateDropdownOpen(prevState => !prevState);
  const movieToggle = () => setMovieDropdownOpen(prevState => !prevState);
  const cardToggle = () => setCardDropdownOpen(prevState => !prevState);

  useEffect(() => {
    axios.get(`https://cs4400-api.herokuapp.com/movies`)
      .then((response) => {
        // console.log(response.data);
        var movieList = response.data.movies;
        var movies = ["ALL"];

        for (var i = 0; i < movieList.length; i++) {
          movies.push(movieList[i][0]);
        }
        setMovies(movies);
      })
      .catch((err) => {
        console.log(err);
    });

    axios.get(`https://cs4400-api.herokuapp.com/companies`)
      .then((response) => {
        // console.log(response.data);
        var companyList = response.data.companies;
        var companies = ["ALL"];

        for (var i = 0; i < companyList.length; i++) {
          companies.push(companyList[i][0]);
        }

        setCompanies(companies);
      })
      .catch((err) => {
        console.log(err);
    });

    axios.get(`https://cs4400-api.herokuapp.com/customer/filter_movie/ALL/ALL/%/%`)
      .then((response) => {
        // console.log(response.data);
        var movieList = response.data.movies;
        var movieData = [];

        for (var i = 0; i < movieList.length; i++) {
          var temp = {};
          temp.movie = movieList[i][0];
          temp.theater = movieList[i][1];
          temp.address = `${movieList[i][2]}, ${movieList[i][3]}, ${movieList[i][4]} ${movieList[i][5]}`;
          temp.company = movieList[i][6];
          temp.playDate = movieList[i][7];
          temp.releaseDate = movieList[i][8];
          movieData.push(temp);
        }
        setData(movieData);

      })
      .catch((err) => {
        console.log(err);
    });

    axios.get(`https://cs4400-api.herokuapp.com/creditcards/${username}`)
      .then((response) => {
        // console.log(response.data);
        var creditCardList = response.data.creditcards;
        var creditCardData = [];

        for (var i = 0; i < creditCardList.length; i++) {
          creditCardData.push(creditCardList[i][0]);
        }
        setCards(creditCardData);
      })
      .catch((err) => {
        console.log(err);
    });

    axios.get(`https://cs4400-api.herokuapp.com/customer/view_history/${username}`)
    .then((response) => {
      // console.log(response.data);
      var historyList = response.data.history;
      var viewHistory = {};

      for (var i = 0; i < historyList.length; i++) {
        var playDate = historyList[i][4];
        if (viewHistory[playDate] == undefined) {
          viewHistory[playDate] = 1;
        } else {
          viewHistory[playDate] += 1;
        }
      }
      // console.log(viewHistory);
      setSeenMovies(viewHistory);
    })
    .catch((err) => {
      console.log(err);
  });
  }, [])

  const goBack = () => {
    history.goBack();
  }

  const filter = () => {
    setNotAllFieldsPresent(false);
    setViewSuccess(false);
    setViewFail(false);
    setTooManyMovies(false);
    
    var url = `https://cs4400-api.herokuapp.com/customer/filter_movie`;
    
    if (movieSelected === "Choose Movie") {
      url += "/ALL";
    } else {
      url += `/${movieSelected.toString()}`;
    }

    if (companySelected === "Choose Company") {
      url += "/ALL";
    } else {
      url += `/${companySelected.toString()}`;
    }

    if (city === "") {
      url += "/%";
    } else {
      url += `/${city}`;
    }

    if (stateSelected === "Choose State" || stateSelected === "ALL") {
      url += "/%";
    } else {
      url += `/${stateSelected.toString()}`;
    }

    if (moviePlayDateFrom !== undefined && moviePlayDateTo !== undefined) {
      var formattedMovieFrom = moviePlayDateFrom.format("YYYY-MM-DD");
      var formattedMovieTo = moviePlayDateTo.format("YYYY-MM-DD");

      url += `/${formattedMovieFrom}/${formattedMovieTo}`;
    }

    // console.log(movieSelected, companySelected, city, stateSelected, formattedMovieFrom, formattedMovieTo);
    // console.log(url);

    axios.get(url)
      .then((response) => {
        // console.log(response.data);
        var movieList = response.data.movies;
        var movieData = [];

        for (var i = 0; i < movieList.length; i++) {
          var temp = {};
          temp.movie = movieList[i][0];
          temp.theater = movieList[i][1];
          temp.address = `${movieList[i][2]}, ${movieList[i][3]}, ${movieList[i][4]} ${movieList[i][5]}`;
          temp.company = movieList[i][6];
          temp.playDate = movieList[i][7];
          temp.releaseDate = movieList[i][8];
          movieData.push(temp);
        }
        setData(movieData);

      })
      .catch((err) => {
        console.log(err);
    });
  }

  const view = () => {
    setNotAllFieldsPresent(false);
    setViewSuccess(false);
    setViewFail(false);
    setTooManyMovies(false);

    var movie = data[parseInt(selected)];
    // console.log(movie, cardSelected);
    if (movie !== undefined) {
      var moviePlayDate = movie.playDate;
    }

    if (movie === undefined || cardSelected === "Choose Card") {
      setNotAllFieldsPresent(true);

    } else if (seenMovies[moviePlayDate] >= 3) {
      setTooManyMovies(true);

    } else {
      axios.get(`https://cs4400-api.herokuapp.com/customer/view_movie/${username}/${cardSelected}/${movie.movie}/${movie.releaseDate}/${movie.playDate}/${movie.theater}/${movie.company}`)
        .then((response) => {
          // console.log(response.data);
          // console.log("before", seenMovies);
          if (seenMovies[moviePlayDate] === undefined) {
            seenMovies[moviePlayDate] = 1;
    
          } else {
            seenMovies[moviePlayDate] += 1;
          }
          // console.log("after", seenMovies);
          setViewSuccess(true);
        })
        .catch((err) => {
          // console.log(err);
          setViewFail(true);
      });
    }
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
          <h2>Explore Movie</h2>
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
                          isOutsideRange={() => false}
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
                          isOutsideRange={() => false}
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
                    defaultPageSize={5}
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

            <Alert isOpen={notAllFieldsPresent} color="danger">
              You must pick a movie and a card!
            </Alert>

            <Alert isOpen={viewSuccess} color="success">
              Viewing Successful!
            </Alert>

            <Alert isOpen={tooManyMovies} color="danger">
              You can only watch 3 movies per day!
            </Alert>

            <Alert isOpen={viewFail} color="danger">
              Viewing Failed! You already viewed this!
            </Alert>

          </Form>
        </div>
      </div>
  );
}

export default ExploreMovie;