import React from 'react';

class MovieRow extends React.Component {
  // Opens new tab to movie details.
  viewMore() {
      const url = "https://www.themoviedb.org/movie/" + this.props.movie.id;
      window.open(url, "_blank");
  }

  // Opens new tab to movie trailers.
  viewTrailers() {
    const url = "https://www.themoviedb.org/movie/" + this.props.movie.id + "/videos";
    window.open(url, "_blank");
  }

  // JSX render.
  render() {
    // Each movie row.
    return (
      <div className="well">
        <table key={this.props.movie.id}>
          <tbody>
            <tr>
              {/* Movie Poster Cell */}
              <td>
                <img alt="poster" width="100" src={this.props.movie.poster_src}/>
              
              </td>
              {/* Spacer Cell */}
              <td width="20"/>
              
              {/* Movie Details Cell */}
              <td>
                {/* Title */}
                <h3>{this.props.movie.title}</h3>

                {/* Rating */}
                <div>
                  <h4 className="rating">{this.props.movie.vote_average}</h4>
                  <p className="rating">/10</p>
                </div>
                <br/>

                {/* Genres */}
                <div>
                {this.props.movie.genre_str.map(function(genre, i){
                  return <div className="panel genres" key={i}>{genre}</div>;
                })}
                </div>
                <br/>

                {/* Overview */}
                <p>{this.props.movie.overview}</p>
                <br/>

                {/* Trailer and More Buttons */}
                <input type="button" onClick={this.viewTrailers.bind(this)} value="Trailers" className="btn btn-success"/>
                <input type="button" onClick={this.viewMore.bind(this)} value="More" className="btn btn-default"/>
              
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default MovieRow;

