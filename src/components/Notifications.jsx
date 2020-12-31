import React, { useState, useContext, useRef } from 'react'
import { SocialMediaContext } from './Context'
import NotificationMap from './NotificationMap'
import { Overlay, Popover } from 'react-bootstrap'
function Notifications () {
  const [showPopover, setshowPopover] = useState(false)
  const { notifications, allNoficicationReadCall } = useContext(
    SocialMediaContext
  )
  const notificationMap = notifications.map(x => {
    return <NotificationMap item={x} key={x._id} />
  })
  const target = useRef(null)
  const markAllRead = () => {
    setshowPopover(false)
    allNoficicationReadCall()
  }

  return (
    <div className='Notifications' id='style-3'>
      <div className='Notifications-titel'>
        <h5>Notifications</h5>
        <h4
          ref={target}
          onMouseEnter={() => setshowPopover(true)}
          onMouseLeave={() => setshowPopover(false)}
        >
          ...
        </h4>
        <Overlay target={target.current} show={showPopover} placement='left'>
          <Popover className='popover-Notification' id='style-3'>
            <div
              onMouseEnter={() => setshowPopover(true)}
              onMouseLeave={() => setshowPopover(false)}
            >
              <h6 onClick={() => markAllRead()}>Mark all as read</h6>
            </div>
          </Popover>
        </Overlay>
      </div>
      {notificationMap}
    </div>
  )
}

export default Notifications
