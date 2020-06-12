import React, { useContext } from 'react'
import { SocialMediaContext } from './Context';



const AlertChanges = ({ Mystate, NO , Yes , Done , Cancel}) => {
    const { ErrorMessage , NewPassword , onchangeHandPassword , ConfirmPassword} = useContext(SocialMediaContext)

    return (
        <div className="alert">
            <div className="alert-Red">
                <div className="alert-Question">
                    {ErrorMessage !== undefined ? <h3>{ErrorMessage}</h3> : ""}

                    {Mystate.PasswordPannel ?
                        <div>
                            <p>Please Wrire Your New Password</p>
                            <label htmlFor="field1">
                                <span>Password: </span>
                                <input type="password" name="password" id="DP_password" value={NewPassword} onChange={onchangeHandPassword} />
                            </label><br />
                            <label htmlFor="field1">
                                <span>Confirm Password: </span>
                                <input type="password" name="Confirmpassword" id="DP_Confirmpassword" value={ConfirmPassword} onChange={onchangeHandPassword} />
                            </label><br />
                        </div>
                        : ""}

                    {Mystate.DeleteAccount ?
                        <div>
                            <h3>Are You Sure To Want Delete Your Account?</h3>
                        </div>
                        : ""}

                    <button onClick={Yes}>{Done}</button>
                    <button onClick={NO}>{Cancel}</button>
                </div>
            </div>
        </div>)
}

export default AlertChanges;