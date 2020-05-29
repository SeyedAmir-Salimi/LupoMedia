import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { SocialMediaContext } from './Contex';
import PM from '../Images/man.jpg'
import PW from '../Images/woman.jpg'
import { FcNeutralDecision , FcApprove , FcDecision , FcDisapprove } from "react-icons/fc";


class SearchedPageMap extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    static contextType = SocialMediaContext;
    render() {
        const { _id, name, picture, Bio, Sentimentale, BirthDate } = this.props.item
        return (
            <div key={_id} className="Searched_page">
                <span className="Searched_page_info">
                    <div>
                        {picture === undefined && this.context.datiPersonali.sesso === "Man" ?
                            <img src={PM} alt={this.context.User_Name} />
                            : ""}
                        {picture === undefined && this.context.datiPersonali.sesso === "Woman" ?
                            <img src={PW} alt={this.context.User_Name} />
                            : ""}
                        {picture !== undefined ?
                            <img src={picture} alt={this.context.User_Name} />
                            : ""}
                    </div>
                    <div>
                        <h4 >{name}</h4>
                        <h4 >{Bio}</h4>
                        <h4 >{Sentimentale}</h4>
                        <h4 >{BirthDate}</h4>
                    </div>
                </span>
                {_id !== this.context.id ?
                <span className="Searched_page_button">
                    <FcNeutralDecision/>
                    <FcDecision/>
                    <FcDisapprove/>
                    <FcApprove/>
                </span> : "" }
            </div>
        );
    }
}

export default SearchedPageMap;