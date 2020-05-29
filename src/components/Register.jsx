import React, { Component } from 'react';
import { SocialMediaContext } from './Contex';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Axios from 'axios'
import Logo from '../Images/Logo-3.png'

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: undefined,
            email: undefined,
            sesso: undefined,
            password: undefined,
            ConfirmPassWord: undefined,
            err: undefined,
        }
    }

    RegisterFunct = async (e) => {
        e.preventDefault();
        if (this.state.password === this.state.ConfirmPassWord) {
            await Axios.post(`http://localhost:3000/enter/signup`, {
                name: this.state.name,
                email: this.state.email,
                sesso: this.state.sesso,
                password: this.state.password,
            })
                .then(res => {
                    console.log(res.data);
                    window.location.reload();
                })
                .catch(err => {
                    this.setState({
                        err: err.response.data
                    })
                    alert(this.state.err)
                    console.log({ message: err })
                })
        } else {
            alert('The Passwords Are Not The Same')
        }
    }

    onchangeHandler = (e) => {
        const sesso = document.querySelector("#RG_Sesso").value
        this.setState({
            sesso,
            [e.target.name]: e.target.value
        })
    }

    static contextType = SocialMediaContext;
    render() {
        return (
            <div className="Loge-in">
                <form className="formStyle" onSubmit={this.RegisterFunct} >
                    <span>
                        <img src={Logo} alt="Logo" style={{ width: "4rem" }} />
                        <h2 className="span">Lupo Media</h2>
                    </span>
                    <span>
                        <input type="text" name="name" id="name" placeholder="Please Write Your Name and Family" onChange={this.onchangeHandler} value={this.state.name} /><br />
                    </span>
                    <span>
                        <input type="email" name="email" id="email" placeholder="Please Write Your Email" onChange={this.onchangeHandler} value={this.state.email} /><br />
                    </span>
                    <select name="Sesso" id="RG_Sesso" value={this.state.sesso} onChange={this.onchangeHandler}>
                        <option selected value="Man">Man</option>
                        <option value="Woman">Woman</option>
                    </select>
                    <span>
                        <input type="password" name="password" id="password" placeholder="Please Enter Your PassWord" onChange={this.onchangeHandler} value={this.state.password} /><br />
                    </span>
                    <span>
                        <input type="password" name="ConfirmPassWord" id="ConfirmPassWord" placeholder="Please Confirm Your PassWord" onChange={this.onchangeHandler} value={this.state.ConfirmPassWord} /><br />
                    </span>
                    <span>
                        <button className="button_Log"  >Register</button>
                    </span>
                </form>
            </div>
        );
    }
}

export default Register;