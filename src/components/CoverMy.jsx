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
    datiPersonali
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
            <div className='Cover-component'>
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
      {/* <div className='Cover-component'>
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
          <h4
            onClick={() => GoToLink(`/${User_Name}/following`)}
            className='hvr-pulse'
          >
            Following ({numberOfFollwingAccepted})
          </h4>
          <h4
            onClick={() => GoToLink(`/${User_Name}/Followers`)}
            className='hvr-pulse'
          >
            Followers ({numberOfFollwersAccepted})
          </h4>
          <h4
            onClick={() => GoToLink(`/${User_Name}/datiPersonali`)}
            className='hvr-pulse'
          >
            Edit Profile
          </h4>
        </div>
      </div>
      <span className='Cover-Name'>
        <h1>{User_Name}</h1>
      </span> */}
    </>
  )
}

export default CoverMy
