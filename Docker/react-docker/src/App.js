import React, { Component } from 'react';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header>
        <img
          src={'https://raw.githubusercontent.com/debabrata100/react-docker/master/src/docker.png'}
          alt={'Docker Img'}
        />
              </header>
        <p className="App-intro">
          This project explains how to run a react application in docker.
        </p>
      </div>
    );
  }
}

export default App;
