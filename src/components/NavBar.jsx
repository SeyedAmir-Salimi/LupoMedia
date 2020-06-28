import React, { useState , useContext , useEffect} from 'react'
import { SocialMediaContext } from './Context';
import { BrowserRouter as Router, Switch, Route, Link, useHistory } from "react-router-dom";
import SearchBar from './SearchBar'
import ProfilePicture from './ProfilePicture'
import Cookies from 'js-cookie'

const Navbar = () => {
    const [linkPush , setlinkPush] = useState(undefined)
    const {  User_Name, ProfilePic, datiPersonali, LogeOut , token , ridirectFunction ,ridirectToHome,ridirectToDatiPersonali} = useContext(SocialMediaContext)

    let history = useHistory();
    useEffect(() => {
        if (token === undefined) {
            console.log("Authenticated logeout");
            history.push("/")
        }
    })


    const GoToLink = (link) =>{
        ridirectFunction(link)
        history.push(link)
    }

    return (
        <div>
            <div className="Nav">
                <SearchBar />
                <ul>
                    <div className="ProfilePic_Wrapper" >
                    <ProfilePicture ProfilePic={ProfilePic} User_Name={User_Name} Size={"Medium"} onClick={()=> GoToLink("/datiPersonali")} />
                    </div>
                    <li onClick={()=> GoToLink("/datipersonali")} className="hvr-pulse" >{User_Name}</li>
                    <li onClick={()=> GoToLink("/home")} className="hvr-pulse" >Home</li>
                    <li onClick={LogeOut} className="hvr-buzz-out" >LogeOut</li>
                </ul>
            </div>
        </div>);
}

export default Navbar;