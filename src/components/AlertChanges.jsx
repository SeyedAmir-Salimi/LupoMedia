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
                            <table>
                            <tr>
                                <th colspan="2"><p>Please Write Your New Password</p></th>
                            </tr>
                            <tr>
                                <td><span>Password: </span></td>
                                <td><input type="password" name="password" id="DP_password" value={NewPassword} onChange={onchangeHandPassword} /></td>
                            </tr>
                            <tr>
                                <td><span>Confirm Password: </span></td>
                                <td> <input type="password" name="Confirmpassword" id="DP_Confirmpassword" value={ConfirmPassword} onChange={onchangeHandPassword} /></td>
                            </tr>
                               
                               

                            </table>
                        </div>
                        : ""}

                    {Mystate.DeleteAccount ?
                        <div>
                            <h3>Are You Sure To Want Delete Your Account?</h3>
                        </div>
                        : ""}

                    <button className="button_Alert"onClick={Yes}>{Done}</button>
                    <button className="button_Alert" onClick={NO}>{Cancel}</button>
                </div>
            </div>
        </div>)
}

export default AlertChanges;