import React, { useContext, useEffect, useRef, useState } from 'react'
import { SocialMediaContext } from './Context'
import { useHistory } from 'react-router-dom'
import SearchBar from './SearchBar'
import ProfilePicture from './ProfilePicture'
import { FaUserFriends } from 'react-icons/fa'
import { ImExit } from 'react-icons/im'
import { AiFillHome } from 'react-icons/ai'
import { IoMdNotifications } from "react-icons/io";
import {
  Navbar as NavbarBootStrap,
  Nav,
  Form,
  Image,
  Overlay,
  Popover
} from 'react-bootstrap'
import Logo from '../Images/Logo-3.png'
const Navbar = () => {
  const [showHomeNot, setShowHomeNot] = useState(false)
  const [showAwaitingNot, setShowAwaitingNot] = useState(false)
  const [showNotificationNot, setShowNotificationNot] = useState(false)
  const [showExitNot, setShowExitNot] = useState(false)
  const {
    User_Name,
    ProfilePic,
    LogeOut,
    token,
    ridirectFunction,
    numberOfFollwingawaiting,
    numberOfFollwersAwaiting,
    datiPersonali
  } = useContext(SocialMediaContext)
  const awaitingSum = numberOfFollwingawaiting + numberOfFollwersAwaiting

  let history = useHistory()
  useEffect(() => {
    if (token === undefined) {
      history.push('/')
    }
  })

  const GoToLink = link => {
    ridirectFunction(link)
    history.push(link)
  }

  const inputRef = useRef()
  useEffect(() => {
    if (history.location.pathname === '/search') {
      inputRef.current.focus()
    }
  }, [history.location.pathname])

  const targetHome = useRef(null)
  const targetAwaiting = useRef(null)
  const targetNotification = useRef(null)
  const targetExit = useRef(null)

  return (
    <>
      <NavbarBootStrap expand='lg' className='NavbarBootStrap' sticky='top'>
        <NavbarBootStrap.Brand href='/home' className='float-left'>
          <Image src={Logo} alt='Logo' rounded className='Navbar-logo' />
        </NavbarBootStrap.Brand>
        <NavbarBootStrap.Toggle aria-controls='basic-navbar-nav' />
        <NavbarBootStrap.Collapse id='basic-navbar-nav'>
          <Nav className='mr-auto'>
            <SearchBar ref={inputRef} />
          </Nav>

          <Form className='form-inline'>
            <div className='Navbar-Link-ProfileAndName'>
              <ProfilePicture
                ProfilePic={ProfilePic}
                User_Name={User_Name}
                Size={'Medium'}
                onClick={() => GoToLink(`/myPage`)}
                sesso={datiPersonali.sesso}
              />
              <Nav.Link href='/myPage' className='hvr-pulse Navbar-username'>
                {User_Name}
              </Nav.Link>
            </div>

            <Nav.Link
              href='/home'
              className='hvr-pulse Navbar-Link'
              ref={targetHome}
              onMouseEnter={() => setShowHomeNot(true)}
              onMouseLeave={() => setShowHomeNot(false)}
            >
              {/* Home */}
              <AiFillHome style={{ fontSize: '1.3rem' }} />
            </Nav.Link>
            <Nav.Link
              href={`/${User_Name}/awaitaningList`}
              className='hvr-pulse Navbar-Link'
              ref={targetAwaiting}
              onMouseEnter={() => setShowAwaitingNot(true)}
              onMouseLeave={() => setShowAwaitingNot(false)}
            >
              {' '}
              <FaUserFriends
                style={{ fontSize: '1.5rem' }}
                className='hvr-pulse Navbar-Link'
              />
              {awaitingSum >= 1 ? awaitingSum : ''}
            </Nav.Link>
            <Nav.Link
              className='hvr-buzz-out Navbar-Link'
              ref={targetNotification}
              onMouseEnter={() => setShowNotificationNot(true)}
              onMouseLeave={() => setShowNotificationNot(false)}
            >
              <IoMdNotifications style={{ fontSize: '1.3rem' }} />
              {/* Notification */}
            </Nav.Link>
            <Nav.Link
              className='hvr-buzz-out Navbar-Link'
              onClick={LogeOut}
              ref={targetExit}
              onMouseEnter={() => setShowExitNot(true)}
              onMouseLeave={() => setShowExitNot(false)}
            >
              <ImExit style={{ fontSize: '1.3rem' }} />
              {/* Logout */}
            </Nav.Link>
            <Overlay
              target={targetHome.current}
              show={showHomeNot}
              placement='bottom'
            >
              {props => (
                <Popover className='popover-nav' {...props}>
                  <p>Home</p>
                </Popover>
              )}
            </Overlay>
            <Overlay
              target={targetAwaiting.current}
              show={showAwaitingNot}
              placement='bottom'
            >
              {props => (
                <Popover className='popover-nav' {...props}>
                  <p>Awaiting list</p>
                </Popover>
              )}
            </Overlay>
            <Overlay
              target={targetNotification.current}
              show={showNotificationNot}
              placement='bottom'
            >
              {props => (
                <Popover className='popover-nav' {...props}>
                  <p>Notifications</p>
                </Popover>
              )}
            </Overlay>
            <Overlay
              target={targetExit.current}
              show={showExitNot}
              placement='bottom'
            >
              {props => (
                <Popover className='popover-nav' {...props}>
                  <p>Exit</p>
                </Popover>
              )}
            </Overlay>
          </Form>
        </NavbarBootStrap.Collapse>
      </NavbarBootStrap>
    </>
  )
}

export default Navbar
