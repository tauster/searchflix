import React from 'react';

class FooterBar extends React.Component {
  // JSX render.
  render() {
    return (
      <div className="footerBar">
        {/* Searchflix Title */}
        <p className="searchflixTitle"><i className="fas fa-film searchflixLogo"></i> SEARCHFLIX</p>
        
        {/* Powered by TMDb */}
        <p>Powered by <a target="_blank" rel="noopener noreferrer" href="https://www.themoviedb.org/">The Movie Database (TMDb)</a></p>
        
        {/* Toasted.ai Branding */}
        <p className="toasted">made by <a target="_blank" rel="noopener noreferrer" href="http://www.toasted.ai/">toasted.ai</a></p>
      </div>
    );
  }
}

export default FooterBar;

