import React, { useState, useContext, useEffect, useCallback} from 'react'
import { SocialMediaContext } from './Context'
// import { useHistory } from 'react-router-dom'
import DefaulCover from '../Images/Wallpaper.jpg'
import ProfilePicture from './ProfilePicture'

const Cover = () => {
  const [ExistFollowing, setExistFollowing] = useState('')
  const [ExistFollowingAwaiting, setExistFollowingAwaiting] = useState('')
  const {
    UserPageData,
    id,
    SendFriendRequestCall,
    IdFollowingChek,
    IdAwaitingingChekFollowing
  } = useContext(SocialMediaContext)



  const FollowingChekID = useCallback(() => {
    if (IdFollowingChek(UserPageData._id)) {
      setExistFollowing(true)
    }
  },[IdFollowingChek, UserPageData._id])

  const AwaitingingChekID = useCallback(() => {
    if (IdAwaitingingChekFollowing(UserPageData._id)) {
      setExistFollowingAwaiting(true)
    }
  },[IdAwaitingingChekFollowing, UserPageData._id])

  useEffect(() => {
    FollowingChekID()
    AwaitingingChekID()
  }, [AwaitingingChekID, FollowingChekID])

  const SendFOllowingRequest = () => {
    SendFriendRequestCall(
      UserPageData._id,
      UserPageData.User_Name,
      UserPageData.ProfilePic
    )
    setExistFollowingAwaiting(true)
  }

  return (
    <div>
      <div className='Cover-component'>
        <img
          src={DefaulCover}
          alt='DefaulCover'
          className='Cover-DefaulCovert'
        />
        <div className='Cover-info'>
          <ProfilePicture
            ProfilePic={UserPageData.ProfilePic}
            User_Name={UserPageData.User_Name}
            Size={'Big'}
          />
          <div className='Cover-Texts'>
            {/* <h4 className="hvr-pulse">Allready following</h4> */}
            {UserPageData._id !== id ? (
              <span className='hvr-pulse Cover-info-following'>
                {ExistFollowing === true ? (
                  'Allready followig'
                ) : ExistFollowingAwaiting === true ? (
                  'Awaiting for response'
                ) : (
                  <p onClick={() => SendFOllowingRequest()}>
                    Send Following Request
                  </p>
                )}
              </span>
            ) : (
              ''
            )}
          </div>
        </div>
      </div>
      <span className='Cover-Name'>
        <h1>{UserPageData.User_Name}</h1>
      </span>
    </div>
  )
}

export default Cover
