import React, {useContext}from 'react'
import { GrMail } from 'react-icons/gr'
import { CgDanger } from 'react-icons/cg'
import { SocialMediaContext } from './Context'
function Assistenza ({hide}) {
    const {toggleShowAssistanec} = useContext(SocialMediaContext)
  return (
    <div className='Notifications' id='style-3'>
      <div>
        <div classNameì="assistance">
            <p onClick={()=> {toggleShowAssistanec(true); hide()}} className="assistance-text"><span style={{marginRight: "10px"}}><GrMail/></span> Assistance message</p>
            <p onClick={()=> {toggleShowAssistanec(true); hide()}} className="assistance-text"><span style={{marginRight: "10px", marginLeft: "-20px"}}><CgDanger/></span>Report a problem</p>
        </div>
      </div>
    </div>
  )
}

export default Assistenza
