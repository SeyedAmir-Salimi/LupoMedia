import React, { useContext, useEffect , useRef} from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { SocialMediaContext } from './Context';
import SearchedPageMap from './SearchedPageMap'
import NavBar from './NavBar'

const Search = () => {
    const {userSearched} = useContext(SocialMediaContext)
    
    let Searched = userSearched.map(item => {
        return <SearchedPageMap key={item._id} item={item} />
    })



    return (
        <div>
            <NavBar />
            {Searched}
        </div>
    );
}

export default Search;
