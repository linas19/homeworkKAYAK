import logo from "./logo.svg";
import "./App.css";
import React from 'react';
import './App.scss'
// import { useForm } from "react-hook-form";
import { useState } from 'react'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: '', searchResults: []};
  }
  handleChange = (event) => {
    this.setState({value: event.target.value});
    this.getSearchOptions(event.target.value);
  }
  handleSubmit = (event) => {
    alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
  }
  getSearchOptions = (query) => {
    // process.env.MOVIEDB_KEY
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${'d1ec5e658afc08e9a0262107d6581ada'}&language=en-US&query=${query}`
    fetch(url,{
      method:'GET'
  }).then(response => response.json()).then(data => {
    this.setState({
      searchResults: data.results
    })
    
    console.log(data)
  })
  }
  render() {
    console.log(process.env.MOVIEDB_KEY)
    return (
    <div className="App">
      <div className="Header">
        <form>
          <label>
            <input type="text" name="name" value={this.state.value} onChange={this.handleChange} />
          </label>
        </form>
      </div>

      <div>
        {this.state.searchResults.map(result => {
          return (
            <div>
              <div className='Title'>{result.title}</div>
              <div className='Rating'>{result.vote_average}</div>
              <div className='Date'>{result.release_date.slice(0, 4)}</div>
            </div>
            )
          })}
        </div>
      {/* <div>{this.state.searchResults.map(x => x.vote_average)}</div> */}
      <p>This pragraph</p>
    </div>
    );
  }
}

export default App;
