import React from 'react'
import './App.css';
// import { SocialMediaContext } from './components/Context';
import {Switch, Route } from "react-router-dom";
import LogeIn from './components/LogeIn'
import Register from './components/Register'
import Home from './components/Home'
import DatiPersonali from './components/DatiPersonali'
import Search from './components/Search'
import UserPage from './components/UserPage' 
import FollowingAcc from './components/Friends/FollowingAcc'
import FollowersAcc from './components/Friends/FollowersAcc'
import AwaitaningList from './components/Friends/AwaitaningList'
import MyPage from './components/MyPage'
import ResetPassword from './components/ResetPassword' 
import ForgetPassword from './components/ForgetPassword'

const App = () => {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={LogeIn} />
        <Route exact path="/register" component={Register} />
        <Route exact strict path="/home" component={Home} />
        <Route exact path="/search" component={Search} />
        <Route exact path="/myPage" component={MyPage} />
        <Route exact path="/forgetPassword" component={ForgetPassword} />
        <Route exact path="/resetPassword/:slug" component={ResetPassword} />
        <Route exact path="/:slug" component={UserPage} />
        <Route exact path="/:slug/datiPersonali" component={DatiPersonali} />
        <Route exact path="/:slug/following" component={FollowingAcc} />
        <Route exact path="/:slug/followers" component={FollowersAcc} />
        <Route exact path="/:slug/awaitaningList" component={AwaitaningList} />
      </Switch>
    </div>
  );
}

export default App;



