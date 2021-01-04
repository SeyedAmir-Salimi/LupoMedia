import React, { useState, useContext, useRef } from 'react'
import { useHistory } from 'react-router-dom'
import { SocialMediaContext } from './Context'
import ProfilePicture from './ProfilePicture'
import LastSeen from './LastSeen'
import { Overlay, Popover } from 'react-bootstrap'
import Emojies from './Emojies'
import { Button } from 'react-bootstrap'
function NotificationMap ({ item }) {
  const [showPopover, setshowPopover] = useState(false)
  const {
    changeNotification,
    GetUSerPageData,
    ridirectFunction,
    deleteNotificationCall,
    setshowNotificationsMenu,
    respondFriendRequestCall,
    deleteFollowersAwaiting,
    FollowersAwaiting
  } = useContext(SocialMediaContext)
  const GoTo = () => {
    GetUSerPageData(
      item.mainUser._id,
      item.mainUser.ProfilePic.picture,
      item.mainUser.name,
      item.mainUser.sesso
    )
    GoToLink(`/${item.mainUser.name}`)
  }
  let history = useHistory()
  const GoToLink = link => {
    ridirectFunction(link)
    history.push(link)
  }
  const target = useRef(null)

  const markAsRead = () => {
    setshowPopover(false)
    changeNotification(item._id, true)
  }
  const deleteNotif = () => {
    setshowPopover(false)
    deleteNotificationCall(item._id)
  }
  const markAsUnread = () => {
    setshowPopover(false)
    changeNotification(item._id, false)
  }
  const dotCOlor = !item.read ? 'rgb(0, 255, 34)' : 'white'
  const text = item.postref.caption
  const textLength = text.length
  const sliceText = text.slice(0, 15)
  let caption
  if (textLength > 15) {
    caption = `${sliceText}...`
  } else if (text === 'undefined') {
    caption = null
  } else {
    caption = text
  }
  const goToLink = () => {
    if (item.postref.caption === 'undefined') {
      GoTo()
    } else {
      GoToLink(`/post/${item.postref._id}`)
    }
    setshowNotificationsMenu(false)
  }

  const findreq = FollowersAwaiting.filter(
    x =>
      x._id === item.friendRequestId
  )

  const AcceptReq = () => {
    if (findreq.length > 0) {
      respondFriendRequestCall(
        findreq[0]._id,
        item.mainUser.name,
        item.mainUser.ProfilePic,
        item.mainUser.Bio,
        item.mainUser.Sentimentale,
        item.mainUser.BirthDate,
        item.mainUser._id
      )
    }
  }
  const deleteReq = () => {
    if (findreq.length > 0) {
      deleteFollowersAwaiting(findreq[0]._id, item.mainUser._id)
    }
  }
  return (
    <div className='NotificationMap'>
      <div className='NotificationMap-ProfilePic'>
        <ProfilePicture
          ProfilePic={item.mainUser.ProfilePic}
          User_Name={item.mainUser.name}
          Size={'Small'}
          sesso={item.mainUser.sesso}
          onClick={() => GoTo()}
        />
      </div>
      <h4
        className='NotificationMap-dot'
        ref={target}
        onMouseEnter={() => setshowPopover(true)}
        onMouseLeave={() => setshowPopover(false)}
        style={{ color: dotCOlor }}
      >
        ...
      </h4>
      <div className='NotificationMap-texts'>
        <h5>{item.mainUser.name}</h5>
        <h6>
          <LastSeen date={item.date} />
        </h6>
        {item.explanation === 'Made a reaction to your post:' ? (
          <div className='NotificationMap-emoji'  onClick={() => goToLink()}>
            <p>{item.explanation}</p>
            <p>{caption}</p>
            <Emojies likeType={item.caption} />
          </div>
        ) : (
          <div className='NotificationMap-emoji'>
            <p  onClick={() => goToLink()}>{item.explanation}</p>
            {item.explanation === 'Sent you a friend request' && findreq.length > 0 && (
              <div>
                <Button
                  size='sm'
                  className='m-2 button_Log2 font-weight-bold'
                  onClick={() => AcceptReq()}
                >
                  Accept it
                </Button>

                <Button
                  size='sm'
                  className='m-2 button_Log2 font-weight-bold'
                  onClick={() => deleteReq()}
                >
                  Deny it
                </Button>
              </div>
            )}
            {caption ? <p onClick={() => goToLink()}>({caption}) </p> : ' '}
            <p  onClick={() => goToLink()}>{item.caption}</p>
          </div>
        )}
      </div>
      <Overlay target={target.current} show={showPopover} placement='left'>
        <Popover className='popover-Notification' id='style-3'>
          <div
            onMouseEnter={() => setshowPopover(true)}
            onMouseLeave={() => setshowPopover(false)}
          >
            {!item.read && <h6 onClick={() => markAsRead()}>Mark as read</h6>}
            {item.read && (
              <h6 onClick={() => markAsUnread()}>Mark as unread</h6>
            )}
            <h6 onClick={() => deleteNotif()}>Delete notification</h6>
          </div>
        </Popover>
      </Overlay>
    </div>
  )
}

export default NotificationMap
