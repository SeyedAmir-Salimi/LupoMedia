import React, { Component } from 'react';
import { SocialMediaContext } from './Contex';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";


import Logo from '../Images/Logo-3.png'

class LogeIn extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    static contextType = SocialMediaContext;

    render() {
        return (
            <div className="Loge-in">
                <form className="formStyle" onSubmit={this.context.LoginGet}>
                    <span>
                        <img src={Logo} alt="Logo" style={{ width: "4rem" }} />
                        <h2>Lupo Media</h2>
                    </span>
                    <span>
                        <input type="email" name="email" id="email" placeholder="Please Write Your Email" onChange={this.context.loginCHangeHandler} value={this.context.email} /><br />
                    </span>
                    <span>
                        <input type="password" name="password" id="password" placeholder="Please Enter Your PassWord" onChange={this.context.loginCHangeHandler} value={this.context.password} /><br />
                    </span>
                    <span>
                        <button className="button_Log">LogIn</button>
                        <button className="button_Log" onClick={this.context.LinkRegister}>Register</button>
                    </span>
                </form>
            </div>
        );
    }
}

export default LogeIn;
