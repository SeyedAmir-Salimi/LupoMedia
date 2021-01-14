import React, { useContext} from 'react'
import { SocialMediaContext } from './Context'
// import { useHistory } from 'react-router-dom'
import DefaulCover from '../Images/Wallpaper.gif'
import ProfilePicture from './ProfilePicture'
import { Container, Row, Col } from 'react-bootstrap'
const Cover = () => {
  const {
    UserPageData,
    id,
    SendFriendRequestCall,
    IdFollowingChek,
    IdAwaitingingChekFollowing,
    setshowNotificationsMenu,
    setshowSearchMenu
  } = useContext(SocialMediaContext)

  const ExistFollowing = IdFollowingChek(UserPageData._id)
  const ExistFollowingAwaiting = IdAwaitingingChekFollowing(UserPageData._id) 


  const picture = {
    picture: UserPageData.ProfilePic
  }
  const SendFOllowingRequest = () => {
    SendFriendRequestCall(UserPageData._id, UserPageData.User_Name, picture)
  }
  const setMenusFalse = () =>{
    setshowNotificationsMenu(false)
    setshowSearchMenu(false)
  }
  return (
    <>
      <Container>
        <Row>
          <Col>
            <div
              className='Cover-component'
              onClick={() => setMenusFalse()}
            >
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
                  {ExistFollowing && <p>Allready followig</p>}
                  {ExistFollowingAwaiting && <p>Awaiting for response</p>}
                  {!ExistFollowing && !ExistFollowingAwaiting && (
                    <p onClick={() => SendFOllowingRequest()}>
                      Send following request
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
