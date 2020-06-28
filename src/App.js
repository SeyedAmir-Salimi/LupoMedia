import React, { useContext, useHistory, useEffect } from 'react'
import './App.css';
import { SocialMediaContext } from './components/Context';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";
import LogeIn from './components/LogeIn'
import Register from './components/Register'
import home from './components/home'
import DatiPersonali from './components/DatiPersonali'
import Search from './components/Search'


const App = () => {

  // const { token } = useContext(SocialMediaContext)


  return (
    <div className="App">
      <Switch>
        {/* <Route exact path="/">
          <div>
            <LogeIn />
          </div>
        </Route> */}
        <Route exact path="/" component={LogeIn} />
        <Route exact path="/register" component={Register} />
        <Route exact strict path="/home" component={home} />
        <Route exact path="/datiPersonali" component={DatiPersonali} />
        <Route exact path="/search" component={Search} />
      </Switch>
    </div>
  );
}

export default App;



