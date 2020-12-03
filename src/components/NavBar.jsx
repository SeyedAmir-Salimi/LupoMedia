import React, {
  useContext,
  useEffect,
  useRef,
} from 'react'
import { SocialMediaContext } from './Context'
import { useHistory } from 'react-router-dom'
import SearchBar from './SearchBar'
import ProfilePicture from './ProfilePicture'
import { FaUserFriends } from 'react-icons/fa'
import { Navbar as NavbarBootStrap, Nav, Form, Image } from 'react-bootstrap'
import Logo from '../Images/Logo-3.png'
const Navbar = () => {
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


  return (
    <>
      <NavbarBootStrap
        expand='lg'
        className='NavbarBootStrap'
        sticky="top"
      >
        <NavbarBootStrap.Brand href='/home' className='float-left'>
          <Image src={Logo} alt='Logo' rounded className='Navbar-logo' />
        </NavbarBootStrap.Brand>
        <NavbarBootStrap.Toggle aria-controls='basic-navbar-nav' />
        <NavbarBootStrap.Collapse id='basic-navbar-nav'>
          <Nav className='mr-auto'>
            <SearchBar ref={inputRef} />
          </Nav>
          <Form inline>
            <ProfilePicture
              ProfilePic={ProfilePic}
              User_Name={User_Name}
              Size={'Medium'}
              onClick={() => GoToLink(`/myPage`)}
              sesso={datiPersonali.sesso}
            />
            <Nav.Link href='/myPage' className='hvr-pulse Navbar-Link'>
              {User_Name}
            </Nav.Link>
            <Nav.Link href='/home' className='hvr-pulse Navbar-Link'>
              Home
            </Nav.Link>
            <Nav.Link
              href={`/${User_Name}/awaitaningList`}
              className='hvr-pulse Navbar-Link'
            >
              {' '}
              <FaUserFriends
                style={{ fontSize: '1.5rem' }}
                className='hvr-pulse Navbar-Link'
              />
              {awaitingSum >= 1 ? awaitingSum : ''}
            </Nav.Link>
            <Nav.Link onClick={LogeOut} className='hvr-buzz-out Navbar-Link'>
              LogeOut
            </Nav.Link>
          </Form>
        </NavbarBootStrap.Collapse>
      </NavbarBootStrap>
    </>
  )
}

export default Navbar
