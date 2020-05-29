import React, { Component } from 'react';
import { SocialMediaContext } from './Contex';
import { BrowserRouter as Router, Switch, Route, Link , useHistory} from "react-router-dom";
import Axios from 'axios'
import Logo from '../Images/Logo-3.png'
import PM from '../Images/man.jpg'
import PW from '../Images/woman.jpg'

class NavBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchInput:"",
        }
    }
    onChangeHandlerSearch = (e) =>{
        this.setState({
            searchInput: e.target.value
        })
    }

    static contextType = SocialMediaContext;
    render() {
        // const history = useHistory();
        // history.push("/home");
        return (
            <div className="Nav">
                <div className="Nav-LogoSearch">
                    <img src={Logo} alt="Logo" style={{ width: "4rem" }} />
                    <form onSubmit={(e)=> {e.preventDefault();this.context.SearchUserCALL(this.state.searchInput)}} >
                        <input type="text" placeholder="Search..." onClick={()=> this.context.SearchUserCALL(this.state.searchInput)} onChange={(e) => this.onChangeHandlerSearch(e)} value={this.state.searchInput}/>
                    </form>
                </div>
                <ul>
                    {this.context.ProfilePic === undefined && this.context.datiPersonali.sesso === "Man" ?
                        <img src={PM} alt={this.context.User_Name} className="ProfImage" onClick={this.context.LinkDatiPersonali} />
                        : ""}
                    {this.context.ProfilePic === undefined && this.context.datiPersonali.sesso === "Woman" ?
                        <img src={PW} alt={this.context.User_Name} className="ProfImage" onClick={this.context.LinkDatiPersonali} />
                        : ""}
                    {this.context.ProfilePic !== undefined ?
                        <img src={this.context.ProfilePic} alt={this.context.User_Name} className="ProfImage" onClick={this.context.LinkDatiPersonali} />
                        : ""}
                    <li onClick={this.context.LinkDatiPersonali}>{this.context.User_Name}</li>
                    <li onClick={this.context.LinkHome}>Home</li>
                    <li onClick={this.context.LogeOut} >LogeOut</li>

                </ul>
            </div>
        );
    }
}

export default NavBar;