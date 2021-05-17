import React, { useContext } from 'react'
import { SocialMediaContext } from './Context'
import spinner from '../Images/loading.gif'
import spinner2 from '../Images/loading2.gif'
function Spinner () {
  const {
    darkMode
  } = useContext(SocialMediaContext)
  return (
    <div>
      <img
        src={darkMode ? spinner : spinner2}
        alt="Spinner"
        className="Spinner"
      />
    </div>
  )
}

export default Spinner
