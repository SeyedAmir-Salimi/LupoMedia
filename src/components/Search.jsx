import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { SocialMediaContext } from './Contex';
import SearchedPageMap from './SearchedPageMap'
import NavBar from './NavBar'
class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    static contextType = SocialMediaContext;
    render() {
        let Searched = this.context.userSearched.map(item => {
            return <SearchedPageMap key={item._id} item={item} />
        })
        return (
            <div>
                <NavBar />
                {Searched}
            </div>
        );
    }
}

export default Search;
