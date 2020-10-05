import React, { Component } from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as comp from './components';
import Favicon from 'react-favicon';
import faviconImage from './content/img/favicon.png'


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      groups: [],
      services: [],
    }
  }
 

  disableClicks()
  {
    // it will disable right click.
    document.oncontextmenu = document.body.oncontextmenu = function() {return false;}
  }

   
  render() {
    
    return (
     
      <div onClick={() => this.disableClicks()}>
        <Favicon url={faviconImage} />
        <comp.Header /> 

        <div className="App">

          <Switch>

          <Route path="/" exact component={comp.Home} />          
          <Route path="/Login" component={comp.Login} />
          <Route path="/Menu/:Id" component={comp.Menu} />
          <Route path="/PaySuccessful" component={comp.PaySuccessful} />
          <Route path="*" component={comp.PageNotFound} />
          
          </Switch>
        
        </div>
        {/* <comp.Footer /> */}
      </div>
    );
  }
}


export default connect(null)(App);
