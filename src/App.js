import React from 'react';
import './App.scss';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      searchResults: [],
      isSearchOpen: false,
      selectedMovie: undefined,
      timeout: null,
      isLoading: false,
      errorMessage: '',
    };
  }
  handleChange = (event) => {
    this.setState({ value: event.target.value });
    if (event.target.value && event.target.value.length >= 3) {
      this.debounceSearch(event.target.value);
    } else {
      this.setState({ searchResults: [] });
    }
  };

  handleSubmit = (event) => {
    alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
  };
  openAutoSuggest = () => {
    this.setState({ isSearchOpen: true });
  };
  selectMovie = (movie) => {
    this.setState({ selectedMovie: movie });
    this.setState({ isSearchOpen: false });
  };
  debounceSearch = (query) => {
    clearTimeout(this.state.timeout);
    const timeout = setTimeout(() => {
      this.getSearchOptions(query);
    }, 1000);
    this.setState({ timeout });
  };
  getSearchOptions = (query) => {
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${'d1ec5e658afc08e9a0262107d6581ada'}&language=en-US&query=${query}`;
    this.setState({ isLoading: true });
    fetch(url, {
      method: 'GET',
    })
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          searchResults: data.results.slice(0, 8),
        });
        console.log(data);
        this.setState({ isLoading: false });
      })
      .catch((error) => {
        this.setState({ isLoading: false });
        this.setState({ errorMessage: 'Could not find films' });
      });
  };
  render() {
    return (
      <div className="App">
        <div className="Header">
          <div className="Search">
            <div className="SearchBar">
              <img className="MovieIcon" src="/movieWhite.svg" />
              <button className="MovieName" onClick={this.openAutoSuggest}>
                {this.state.selectedMovie
                  ? this.state.selectedMovie.title
                  : 'Enter movie name'}
              </button>
            </div>
            <button className="SearchButton">
              <img src="/search.svg" />
            </button>
            {this.state.isSearchOpen && (
              <form className="AutoSuggestForm">
                <div className="AutoSuggest">
                  <img className="MovieIconBlack" src="/movieBlack.svg" />
                  <label className="AutoSuggestLabel">
                    <input
                      autoComplete="off"
                      className="Input"
                      type="text"
                      name="name"
                      autoFocus
                      value={this.state.value}
                      onChange={this.handleChange}
                    />
                    Enter a movie name
                  </label>
                </div>
                <div className="AutocompleteResults">
                  {this.state.isLoading && <div>Loading...</div>}
                  {this.state.searchResults.map((result) => {
                    return (
                      <div
                        className="Results"
                        key={result.id}
                        onClick={() => this.selectMovie(result)}
                      >
                        <div className="Title">{result.title}</div>
                        <div className="AutocompleteInfo">
                          {result.vote_average} Rating,{' '}
                          {result.release_date.slice(0, 4)}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
