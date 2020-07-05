import React, { useState , useContext , useEffect, useRef} from 'react'
import { SocialMediaContext } from './Context';
import { BrowserRouter as Router, Switch, Route, Link, useHistory } from "react-router-dom";
import DefaulCover from "../Images/Wallpaper.jpg"
import ProfilePicture from './ProfilePicture';

const Cover = ()=> {
    const {numberOfFollwingAccepted, numberOfFollwersAccepted , User_Name ,ProfilePic , datiPersonali , getFriendsListCall} = useContext(SocialMediaContext);

    let history = useHistory();
    const GoToLink = (link) =>{
        history.push(link)
    }
    return (
        <div className="Cover-component">
            <img src={DefaulCover} alt="DefaulCover" className="Cover-DefaulCovert"/>
            <div className="Cover-info">
            <ProfilePicture
					ProfilePic={ProfilePic}
					User_Name={datiPersonali.name}
					Size={'Big'}
				/>
                <div className="Cover-Texts">
                <h4 onClick={()=> GoToLink(`/${User_Name}/following`)} className="hvr-pulse" >Following ({numberOfFollwingAccepted})</h4>
                <h4 onClick={()=> GoToLink(`/${User_Name}/Followers`)} className="hvr-pulse" >Followers ({numberOfFollwersAccepted})</h4>
                <h4 onClick={()=> GoToLink(`/${User_Name}/datiPersonali`)} className="hvr-pulse" >Edit Profile</h4>
                </div>
            </div>
        </div>
    )
}

export default Cover
