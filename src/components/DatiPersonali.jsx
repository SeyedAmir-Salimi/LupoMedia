import React, { Component } from 'react';
import { SocialMediaContext } from './Contex';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"

import NavBar from './NavBar'
import AlertChanges from './AlertChanges';

class DatiPersonali extends Component {
    constructor(props) {
        super(props);
        this.state = {
            PasswordPannel: false,
            DeleteAccountPannel: false,
        }
    }



    static contextType = SocialMediaContext;

    render() {
        return (
            <div>
                <NavBar />
                {this.state.PasswordPannel ?
                    <AlertChanges Mystate={{ ...this.state }} NO={() => this.setState({ PasswordPannel: false })} Yes={() => this.context.updatePasswrd()} Done="Save" Cancel="Cancel" />
                    : ""}
                {this.state.DeleteAccountPannel ?
                    <AlertChanges Mystate={{ ...this.state }} NO={() => this.setState({ DeleteAccountPannel: false })} Yes={() => this.context.deleteAccount()} Done="Yes" Cancel="No" />
                    : ""}
                <img className="profile_pic" src={this.context.ProfilePic} alt={this.context.datiPersonali.name} />
                
                <form className="form-style-4" method="post" onSubmit={this.context.UpdateDatiPersonali}>
                    <label htmlFor="field1">
                        <span>Name: </span>
                        <input type="text" name="name" id="DP_name" value={this.context.datiPersonali.name} onChange={(e)=> this.context.onchangeHandlerDatiPersonali(e)} />
                    </label><br />
                    <label htmlFor="field1">
                        <span>Email: </span>
                        <input type="email" name="email" id="DP_email" value={this.context.datiPersonali.email} onChange={(e)=> this.context.onchangeHandlerDatiPersonali(e)} />
                    </label><br />
                    <label htmlFor="field1">
                        <span>Birth date: </span>
                        <input type="date" name="BirthDate" id="DP_BirthDate" value={this.context.datiPersonali.BirthDate} onChange={(e)=> this.context.onchangeHandlerDatiPersonali(e)} />
                    </label><br />
                    <label>
                        <span>Situazine: </span>
                        {this.context.datiPersonali.Sentimentale === "Singel" ?
                            <select name="Sentimentale"  id="DP_Sentimentale" value={this.context.datiPersonali.Sentimentale} onChange={(e)=> this.context.onchangeHandlerDatiPersonali(e)}>
                                <option value="Singel">Singel</option>
                                <option value="Married">Married</option>
                            </select> :
                            <select name="Sentimentale" id="DP_Sentimentale"  value={this.context.datiPersonali.Sentimentale} onChange={(e)=> this.context.onchangeHandlerDatiPersonali(e)}>
                                <option value="Singel">Singel</option>
                                <option value="Married">Married</option>
                            </select>} <br />
                        <span>Sesso: </span>
                        {this.context.datiPersonali.sesso === "Man" ?
                            <select name="sesso" id="DP_sesso" value={this.context.datiPersonali.sesso} onChange={(e)=> this.context.onchangeHandlerDatiPersonali(e)}>
                                <option value="Man">Man</option>
                                <option value="Woman">Woman</option>
                            </select> :
                            <select name="sesso" id="DP_sesso" value={this.context.datiPersonali.sesso} onChange={(e)=> this.context.onchangeHandlerDatiPersonali(e)}>
                                <option value="Man">Man</option>
                                <option value="Woman">Woman</option>
                            </select>}
                    </label>
                    <label htmlFor="field1">
                        <span>Bio: </span>
                        <input type="text" id="DP_Bio" name="Bio" value={this.context.datiPersonali.Bio} onChange={(e)=> this.context.onchangeHandlerDatiPersonali(e)} />
                    </label><br />
                    <label htmlFor="field1">
                        <span>Profile Picture: </span>
                        <input type="file" name="ProfilePic" id="DP_ProfilePic" onChange={this.context.uploadPicprofile} />
                    </label><br />
                    <button className="button_Log">Save Changes</button>
                </form>
                <button className="button_Log" onClick={() => this.setState({ PasswordPannel: true })}>Change password</button>
                <button className="button_Log" onClick={() => this.setState({ DeleteAccountPannel: true })}>Delete Account</button>
            </div>
        );
    }
}

export default DatiPersonali;


