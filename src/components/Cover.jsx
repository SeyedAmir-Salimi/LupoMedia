import React, { useState, useContext, useEffect, useCallback } from 'react'
import { SocialMediaContext } from './Context'
// import { useHistory } from 'react-router-dom'
import DefaulCover from '../Images/Wallpaper.jpg'
import ProfilePicture from './ProfilePicture'
import { Container, Row, Col } from 'react-bootstrap'
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
  }, [IdFollowingChek, UserPageData._id])

  const AwaitingingChekID = useCallback(() => {
    if (IdAwaitingingChekFollowing(UserPageData._id)) {
      setExistFollowingAwaiting(true)
    }
  }, [IdAwaitingingChekFollowing, UserPageData._id])

  useEffect(() => {
    FollowingChekID()
    AwaitingingChekID()
  }, [AwaitingingChekID, FollowingChekID])

  const picture = {
    picture: UserPageData.ProfilePic
  }
  const SendFOllowingRequest = () => {
    SendFriendRequestCall(UserPageData._id, UserPageData.User_Name, picture)
    setExistFollowingAwaiting(true)
  }
  return (
    <>
      <Container>
        <Row>
          <Col>
            <div className='Cover-component'>
              <img
                src={DefaulCover}
                alt='DefaulCover'
                className='Cover-DefaulCovert'
              />
              <div className='Cover-profilePic'>
                <ProfilePicture
                  ProfilePic={picture}
                  User_Name={UserPageData.User_Name}
                  Size={'Big'}
                  sesso={UserPageData.sesso}
                />
              </div>
              {UserPageData._id !== id ? (
                <span className='Cover-info-following'>
                  {ExistFollowing === true ? (
                    'Allready followig'
                  ) : ExistFollowingAwaiting === true ? (
                    'Awaiting for response'
                  ) : (
                    <p
                      onClick={() => SendFOllowingRequest()}
                      className='Cover-text'
                    >
                      Send Following Request
                    </p>
                  )}
                </span>
              ) : (
                ''
              )}
            </div>
            <span className='Cover-Name'>
              <h1>{UserPageData.User_Name}</h1>
            </span>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default Cover
