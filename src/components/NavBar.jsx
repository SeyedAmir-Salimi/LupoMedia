import React, { useState ,useContext , useEffect} from 'react'
import { SocialMediaContext } from './Context';
import { BrowserRouter as Router, Switch, Route, Link, useHistory } from "react-router-dom";

import PM from '../Images/man.jpg'
import PW from '../Images/woman.jpg'
import SearchBar from './SearchBar'


const Navbar = () => {
    // const [linkPush , setlinkPush] = useState("")
    const { User_Name, ProfilePic, datiPersonali, LogeOut , token , ridirectFunction } = useContext(SocialMediaContext)

    let history = useHistory();
    useEffect(() => {
        if (token === undefined) {
            console.log("Authenticated logeout");
            history.push("/logein")
        }
    })

    const GoToLink = (link) =>{
        ridirectFunction(link)
        // setlinkPush(link)
        history.push(link)
    }

    return (
        <div>
            <div className="Nav">
                <SearchBar />
                <ul>
                    {ProfilePic === undefined && datiPersonali.sesso === "Man" ?
                        <img src={PM} alt={User_Name} className="ProfImage" onClick={()=> GoToLink("/datiPersonali")} />
                        : ""}
                    {ProfilePic === undefined && datiPersonali.sesso === "Woman" ?
                        <img src={PW} alt={User_Name} className="ProfImage" onClick={()=> GoToLink("/datiPersonali")} />
                        : ""}
                    {ProfilePic !== undefined ?
                        <img src={ProfilePic} alt={User_Name} className="ProfImage" onClick={()=> GoToLink("/datiPersonali")} />
                        : ""}
                    <li onClick={()=> GoToLink("/datiPersonali")} >{User_Name}</li>
                    <li onClick={()=> GoToLink("/home")} >Home</li>
                    <li onClick={LogeOut} >LogeOut</li>
                </ul>
            </div>
        </div>);
}

export default Navbar;