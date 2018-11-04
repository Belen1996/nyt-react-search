import React, { Component } from 'react';
import './App.css';
import NytArticles from './NytArticles.js';
import SavedNytArticles from './SavedNytArticles.js';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      savedNews: false
    }
  }

  render() {
    const savedArticles = this.state.savedNews;
    let articles;
    if(savedArticles) {
      articles = <SavedNytArticles />;
    } else {
      articles = <NytArticles />;
    }

    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
    <a className="navbar-brand" href="/">Belen's News Scraper</a>
    <button className="navbar-toggler" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false"
      aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>

    <div className="collapse navbar-collapse" id="navbarColor01">
      <ul className="navbar-nav mr-auto">
        <li className="nav-item active">
          <a className="nav-link" href="#" onClick={() => this.setState({savedNews: false})}>Home
            <span className="sr-only">(current)</span>
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#" onClick={() => this.setState({savedNews: true})}>Saved Articles</a>
        </li>
      </ul>
    </div>
  </nav>

  <div className="jumbotron text-center">
    <div className="overlay">
    </div>
    <div className="background-image">
    </div>
    <div className="caption">
      <h1>Belen's News Scraper</h1>
      <p>The Guardian US Edition</p>
    </div>
  </div>
  {articles}
    <footer className="footer">
    <div className="container">
      <p>Belen's The Guardian US Edition News Scraper</p>
    </div>
  </footer>

      </div>
    );
  }
}

export default App;
