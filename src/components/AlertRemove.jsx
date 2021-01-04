import React from 'react'
import { Button } from 'react-bootstrap'

const AlertRemove = ({ displayText, yes, no }) => {
  return (
    <div className='alert'>
      <div className='alert-Red'>
        <div className='alert-RemoveFriend'>
          <div>
            <h5>{displayText}</h5>
          </div>
          {yes && no && (
            <span className='alertRemoveFriend-buttonWrapper'>
              <Button
                size='sm'
                className='m-2 button_Log2 font-weight-bold'
                onClick={yes}
              >
                Yes
              </Button>
              <Button
                size='sm'
                className='m-2 button_Log2 font-weight-bold'
                onClick={no}
              >
                No
              </Button>
            </span>
          )}
        </div>
      </div>
    </div>
  )
}

export default AlertRemove
