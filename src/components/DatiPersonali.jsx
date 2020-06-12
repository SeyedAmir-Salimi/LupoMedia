import React, { useState, useContext } from 'react'
import { SocialMediaContext } from './Context';
import NavBar from './NavBar'
import AlertChanges from './AlertChanges';

const DatiPersonali = () => {
    const [Pannel, setPannel] = useState({
        PasswordPannel: false,
        DeleteAccount: false,
    });

    const { updatePasswrd , deleteAccount , ProfilePic , datiPersonali , UpdateDatiPersonali , onchangeHandlerDatiPersonali, uploadPicprofile} = useContext(SocialMediaContext)
    return ( 
        <div>
                <NavBar />
                {Pannel.PasswordPannel ?
                    <AlertChanges Mystate={{ ...Pannel }} NO={() => setPannel({PasswordPannel: false})} Yes={() => updatePasswrd()} Done="Save" Cancel="Cancel" />
                    : ""}
                {Pannel.DeleteAccount ?
                    <AlertChanges Mystate={{ ...Pannel }} NO={() => setPannel({DeleteAccount: false})} Yes={() => deleteAccount()} Done="Yes" Cancel="No" />
                    : ""}
                <img className="profile_pic" src={ProfilePic} alt={datiPersonali.name} />
                
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
                        <input type="text" id="DP_Bio" name="Bio" value={datiPersonali.Bio} onChange={(e)=> onchangeHandlerDatiPersonali(e)} />
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

