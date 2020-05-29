import React, { Component } from 'react';
import { SocialMediaContext } from './Contex';

class AlertChanges extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    static contextType = SocialMediaContext;
    render() {
        return (
            <div className="alert">
                <div className="alert-Red">
                    <h3>{this.props.titel}</h3>
                    <div className="alert-Question">

                        {this.context.ErrorMessage !== undefined ? <h3>{this.context.ErrorMessage}</h3> : ""}

                        {this.props.Mystate.PasswordPannel ?
                            <div>
                                <p>Please Wrire Your New Password</p>
                                <label for="field1">
                                    <span>Password: </span>
                                    <input type="password" name="password" id="DP_password" value={this.context.NewPassword} onChange={this.context.onchangeHandPassword} />
                                </label><br />
                                <label for="field1">
                                    <span>Confirm Password: </span>
                                    <input type="password" name="Confirmpassword" id="DP_Confirmpassword" value={this.context.ConfirmPassword} onChange={this.context.onchangeHandPassword} />
                                </label><br />
                            </div>
                            : ""}

                        {this.props.Mystate.DeleteAccountPannel ?
                        <div>
                            <h3>Are You Sure To Want Delete Your Account?</h3>
                        </div>
                        : ""}

                            <button onClick={this.props.Yes}>{this.props.Done}</button>
                            <button onClick={this.props.NO}>{this.props.Cancel}</button>
                    </div>
                </div>
            </div>);
    }
}

export default AlertChanges;

