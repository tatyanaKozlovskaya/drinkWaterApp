import React, { Component } from 'react'
import './App.css';
import Header from './components/header/header.js'
import Main from './components/main/main.js'
import Calendar from './components/calendar/calendar.js'
import { Route } from 'react-router'

class App extends Component {
  
  render() {
    
    return (
      <div className="App">
        <Route exact path="/" component={Main} />
        <Route path="/calendar" component={Calendar} />
        <Header title={'water is life, think about it'}/>
      </div>
    );
  }
}


export default App;
