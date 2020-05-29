import React, { Component } from 'react';
import './App.css';
import { SocialMediaContext } from './components/Contex';
import { BrowserRouter as Router, Switch, Route, Link, Redirect , useHistory} from "react-router-dom";
import LogeIn from './components/LogeIn'
import Register from './components/Register'
import home from './components/home'
import DatiPersonali from './components/DatiPersonali'
import Search from './components/Search'

import apiTest from './components/apiTest'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  static contextType = SocialMediaContext;
  render() {

    return (
      <div className="App">

        {this.context.redirectTF === false ?
          <Redirect to="/Logein" /> :
          <Redirect to={this.context.redirect} />
        }

        <Switch>
          <Route exact path="/Logein">
            <div>
              <LogeIn />
            </div>
          </Route>
          <Route exact path="/apiTest" component={apiTest} />
          <Route exact path="/register" component={Register} />
          <Route exact strict path="/home" component={home} />
          <Route exact path="/datiPersonali" component={DatiPersonali} />
          <Route exact path="/search" component={Search} />
        </Switch>
      </div>
    );
  }
}


export default App;
