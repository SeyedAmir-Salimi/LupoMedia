import React,{useContext } from 'react'
import { FiMoon, FiSun } from "react-icons/fi";
import { BsFillCircleFill } from "react-icons/bs";
import { SocialMediaContext } from './Context'
function DarkModeButton() {
    const {toggleDarkMode, darkMode} = useContext(SocialMediaContext)
    const buttonToggle = darkMode ? "darkModeButton-Ci darkModeButton-CiTrue" : "darkModeButton-Ci"
    return (
        <div className="darkModeButton-wrapper" onClick={()=> toggleDarkMode()}>
            <div className="darkModeButton-SM"><FiSun className="FiSun"/><FiMoon className="FiMoon"/></div>
            <div className={buttonToggle}><BsFillCircleFill/></div>
        </div>
    )
}

export default DarkModeButton
