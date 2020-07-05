import React, { useState, useContext ,useEffect } from 'react'
import { SocialMediaContext } from './Context';
import NavBar from './NavBar'
import AlertChanges from './AlertChanges';
import ProfilePicture from './ProfilePicture';
import { BrowserRouter as Router, Switch, Route, Link, useHistory } from "react-router-dom";
import ImageCropper from './ImageCropper'
import testimage from '../Images/Wallpaper.jpg'

const DatiPersonali = () => {
    const [Pannel, setPannel] = useState({
        PasswordPannel: false,
        DeleteAccount: false,
    });
    const {deleteAccountCall,cancelUpdatePassword, LogeOut, token, updatePasswordCall , deleteAccount , ProfilePic , datiPersonali , UpdateDatiPersonali , onchangeHandlerDatiPersonali, uploadPicprofile,ridirectFunction} = useContext(SocialMediaContext)
    
    let history = useHistory();
    useEffect(() => {
        if (token === undefined) {
            console.log("Authenticated logeout");
            history.push("/")
        }
    })

    const PasswordPannel = ()=> {
        setPannel({PasswordPannel: !PasswordPannel})
    }
    const DeleteAccount = ()=>{
        deleteAccountCall();
        setPannel({DeleteAccount: !DeleteAccount})
    }

    return ( 
        <div>
                <NavBar />
                {Pannel.PasswordPannel ?
                    <AlertChanges Mystate={{ ...Pannel }} NO={() => {PasswordPannel();cancelUpdatePassword()}} Yes={() => updatePasswordCall()} Done="Save" Cancel="Cancel" />
                    : ""}
                {Pannel.DeleteAccount ?
                    <AlertChanges Mystate={{ ...Pannel }} NO={() => DeleteAccount()} Yes={() => {deleteAccount();LogeOut()}} Done="Yes" Cancel="No" />
                    : ""}

                <ProfilePicture
					ProfilePic={ProfilePic}
					User_Name={datiPersonali.name}
					Size={'Big'}
				/>
                
                <form className="form-style-4" method="post" onSubmit={UpdateDatiPersonali}>
                    <label htmlFor="field1">
                        <span>Name: </span>
                        <input type="text" name="name" id="DP_name" value={datiPersonali.name} onChange={(e)=> onchangeHandlerDatiPersonali(e)} />
                    </label><br />
                    <label htmlFor="field1">
                        <span>Email: </span>
                        <input type="email" name="email" id="DP_email" value={datiPersonali.email} onChange={(e)=> onchangeHandlerDatiPersonali(e)} />
                    </label><br />
                    <label htmlFor="field1">
                        <span>Birth date: </span>
                        <input type="date" name="BirthDate" id="DP_BirthDate" value={datiPersonali.BirthDate} onChange={(e)=> onchangeHandlerDatiPersonali(e)} />
                    </label><br />
                    <label>
                        <span>Situazine: </span>
                        {datiPersonali.Sentimentale === "Singel" ?
                            <select name="Sentimentale"  id="DP_Sentimentale" value={datiPersonali.Sentimentale} onChange={(e)=> onchangeHandlerDatiPersonali(e)}>
                                <option value="Singel">Singel</option>
                                <option value="Married">Married</option>
                            </select> :
                            <select name="Sentimentale" id="DP_Sentimentale"  value={datiPersonali.Sentimentale} onChange={(e)=> onchangeHandlerDatiPersonali(e)}>
                                <option value="Singel">Singel</option>
                                <option value="Married">Married</option>
                            </select>} <br />
                        <span>Sesso: </span>
                        {datiPersonali.sesso === "Man" ?
                            <select name="sesso" id="DP_sesso" value={datiPersonali.sesso} onChange={(e)=> onchangeHandlerDatiPersonali(e)}>
                                <option value="Man">Man</option>
                                <option value="Woman">Woman</option>
                            </select> :
                            <select name="sesso" id="DP_sesso" value={datiPersonali.sesso} onChange={(e)=> onchangeHandlerDatiPersonali(e)}>
                                <option value="Man">Man</option>
                                <option value="Woman">Woman</option>
                            </select>}
                    </label>
                    <label htmlFor="field1">
                        <span>Bio: </span>
                        <input type="text" id="DP_Bio" name="Bio" maxLength="45" value={datiPersonali.Bio} onChange={(e)=> onchangeHandlerDatiPersonali(e)} />
                    </label><br />
                    <label htmlFor="field1">
                        <span>Profile Picture: </span>
                        <input type="file" name="ProfilePic" id="DP_ProfilePic" onChange={uploadPicprofile} />

                    </label><br />
                    <button className="button_Log">Save Changes</button>
                </form>
                <button className="button_Log" onClick={() => setPannel({PasswordPannel: true})}>Change password</button>
                <button className="button_Log" onClick={() => setPannel({DeleteAccount: true})}>Delete Account</button>
            </div>
     );
}
 
export default DatiPersonali;

