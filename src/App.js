import React, { Component } from 'react';
import './App.css';
import TitleBar from './TitleBar.js';
import MovieRow from './MovieRow.js';
import FooterBar from './FooterBar.js';
import $ from 'jquery';
import Genres from './genres.json';

// API key MUST be present within '.env' within root directory.
// Varaible MUST be named 'REACT_APP_MOVIEDB_API_KEY', value MUST be your API key.
// Regester free API key: https://developers.themoviedb.org/3/getting-started
const APIKey = process.env.REACT_APP_MOVIEDB_API_KEY;

class App extends Component {
  // State constructor.
  constructor(props) {
    super(props);
    this.state = {};
  }

  // Searches movie query and displays MovieRow class.
  performSearch(searchQuery) {
    // Creating MovieDB API URL endpoint.
    const urlString = "https://api.themoviedb.org/3/search/movie?api_key=" + APIKey + "&query=" + searchQuery;
    
    // Using AJAX to process GET API action.
    $.ajax({
      url: urlString,

      // Fetch Success
      success: (searchResults) => {
        // Storing results from API.
        const results = searchResults.results;
        
        // Developping rows for each movie from search query.
        var movieRows = [];

        // Creating each movie row using MovieRow.
        results.forEach((movie) => {
          // Setting endpoint for poster img.
          movie.poster_src = "https://image.tmdb.org/t/p/w185" + movie.poster_path;

          // Genre string holder.
          movie.genre_str = [];
          
          // Finding string value of genre IDs.
          movie.genre_ids.forEach((genreID) => {
            if(genreID.toString() in Genres){
              //console.log(Genres[genreID.toString()]);
              movie.genre_str.push(Genres[genreID.toString()]);
            }
          });

          // Creating movie row using MovieRow and pushing to movieRows for state.
          const movieRow = <MovieRow key={movie.id} movie={movie}/>
          movieRows.push(movieRow);
        });

        // Updating the render div component.
        this.setState({rows: movieRows});
      },

      // Fetch failure.
      error: (xhr, status, err) => {
        console.error("Search failed. Check 'urlString' endpoint or API key within '.env'");
      }
    });
  }

  // Search term event listener/updater.
  searchChangeHandler(event) {
    // Checking if input is empty.
    if(event.target.value === "") {
      // If input is empty: show blank screen, hide search.
      $(".emptySearch").show();
      $(".fullSearch").hide();
      $(".footerBar").css("position", "fixed");
    }
    else {
      // Else: hide blank screen, show search.
      $(".emptySearch").hide();
      $(".fullSearch").show();
      $(".footerBar").css("position", "relative");
      const searchTerm = event.target.value;
      this.performSearch(searchTerm);
    }
  }

  // JSX render.
  render() {
    return (
      <div>
        {/* Title Bar */}
        <TitleBar />

        {/* Search Bar */}
        <div className="container">
          <input className="form-control form-control-lg searchBar" onChange={this.searchChangeHandler.bind(this)} placeholder="Search Movies"/>

          {/* Empty Search */}
          <div className="emptySearch">
            <i className="fas fa-film"></i>
          </div>

          {/* Movie Rows */}
          <div className="fullSearch">  
            {this.state.rows}
          </div>
        </div>

        {/* Footer Bar */}
        <FooterBar />
      </div>
    );
  }
}

export default App;

