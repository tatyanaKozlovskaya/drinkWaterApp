import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Settings from './../settings/settings.js'
class Header extends Component {
    render() {
        return <header className="App-header">
            <h1 className='App-title'>{this.props.title}</h1>
            <Settings/>
            <nav>            
                <Link to="/">Main</Link>
                <Link to="/calendar">Calendar</Link>
            </nav>

        </header>
    }
}

export default Header