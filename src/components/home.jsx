import React, { Component } from 'react';
import { SocialMediaContext } from './Contex';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import NavBar from './NavBar'
import Postpage from './Postpage'
import PostInput from './PostInput'

class home extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    static contextType = SocialMediaContext;
    render() { 

        return ( 
            <div className="homepage">
                <NavBar/>
                <PostInput/>
                <Postpage/>
            </div>
         );
    }
}
 
export default home;
