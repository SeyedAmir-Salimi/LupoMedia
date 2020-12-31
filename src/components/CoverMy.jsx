import React, { useContext } from 'react'
import { SocialMediaContext } from './Context'
import { useHistory } from 'react-router-dom'
import DefaulCover from '../Images/Wallpaper.jpg'
import ProfilePicture from './ProfilePicture'
import { Container, Row, Col } from 'react-bootstrap'
const CoverMy = () => {
  const {
    numberOfFollwingAccepted,
    numberOfFollwersAccepted,
    User_Name,
    ProfilePic,
    datiPersonali,
    setshowNotificationsMenu
  } = useContext(SocialMediaContext)

  let history = useHistory()
  const GoToLink = link => {
    history.push(link)
  }

  return (
    <>
      <Container>
        <Row>
          <Col>
            <div className='Cover-component' onClick={()=> setshowNotificationsMenu(false)}>
              <img
                src={DefaulCover}
                alt='DefaulCover'
                className='Cover-DefaulCovert'
              />
              <div className='Cover-profilePic'>
                <ProfilePicture
                  ProfilePic={ProfilePic}
                  User_Name={User_Name}
                  Size={'Big'}
                  sesso={datiPersonali.sesso}
                />
              </div>
              <div className='Cover-Texts'>
                <h6
                  onClick={() => GoToLink(`/${User_Name}/following`)}
                  className='hvr-pulse'
                >
                  Following ({numberOfFollwingAccepted})
                </h6>
                <h6
                  onClick={() => GoToLink(`/${User_Name}/Followers`)}
                  className='hvr-pulse'
                >
                  Followers ({numberOfFollwersAccepted})
                </h6>
                <h6
                  onClick={() => GoToLink(`/${User_Name}/datiPersonali`)}
                  className='hvr-pulse'
                >
                  Edit Profile
                </h6>
              </div>
              <h2 className='Cover-Name'>{User_Name}</h2>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default CoverMy
