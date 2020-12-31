import React from 'react'
import spinner from '../Images/loading.gif'
function Spinner () {
  return (
    <div>
      <img
        src={spinner}
        alt="Spinner"
        className="Spinner"
      />
    </div>
  )
}

export default Spinner
