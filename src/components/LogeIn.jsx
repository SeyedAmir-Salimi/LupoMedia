import React, { useContext, useEffect, useState, useRef } from 'react'
import { SocialMediaContext } from './Context'
import { useHistory } from 'react-router-dom'
import Logo from '../Images/Logo-3.png'
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
const LogeIn = () => {
  const {
    LoginGetCall,
    loginError,
    loginCHangeHandler,
    email,
    password,
    token
  } = useContext(SocialMediaContext)
  const [TypeHandel, setTypeHandel] = useState('password')

  const PassTypeHandel = type => {
    setTypeHandel(type)
  }

  let history = useHistory()

  useEffect(() => {
    if (token !== undefined) {
      history.push('/home')
    }
  })

  const AuthLogin = async e => {
    e.preventDefault()
    await LoginGetCall()
  }

  const GoToLink = link => {
    history.push(link)
  }

  useEffect(() => {
    emailRef.current.focus()
  }, [])
  const emailRef = useRef(null)

  return (
    <div className='Loge-in'>
      <Container>
        <Row>
          <Col md={{ span: 6, offset: 3 }}>
            <Form onSubmit={e => AuthLogin(e)}>
              <span className='Loge-lupomedia'>
                <img
                  src={Logo}
                  alt='Logo'
                  style={{ width: '6rem', height: '6rem' }}
                />
                <h4>Lupo Media</h4>
              </span>
              <Form.Group>
                <Form.Control
                  type='email'
                  name='email'
                  id='email'
                  placeholder='Please write your email'
                  onChange={loginCHangeHandler}
                  value={email}
                  ref={emailRef}
                />
              </Form.Group>
              <Form.Group>
                <span className='rounded logein-password'>
                  <Form.Control
                    type={TypeHandel}
                    name='password'
                    id='password'
                    placeholder='Please enter your password'
                    onChange={loginCHangeHandler}
                    value={password}
                  />
                  {TypeHandel === 'password' ? (
                    <AiFillEye
                      className='PasswordEye'
                      onClick={() => PassTypeHandel('text')}
                    />
                  ) : (
                    <AiFillEyeInvisible
                      className='PasswordEye'
                      onClick={() => PassTypeHandel('password')}
                    />
                  )}
                </span>
              </Form.Group>

              <Col>
                <Button
                  size='m'
                  className='m-2 button_Log font-weight-bold'
                  type='submit'
                  onClick={e => AuthLogin(e)}
                >
                  LogIn
                </Button>
                <Button
                  size='m'
                  className='m-2 button_Log font-weight-bold'
                  onClick={() => GoToLink('/register')}
                >
                  Register
                </Button>
              </Col>

              <h6
                className='Forget-password mt-2'
                onClick={() => GoToLink('/forgetPassword')}
              >
                Forget password
              </h6>
              {loginError !== null ? (
                <h6 className='RedError'>{loginError}</h6>
              ) : (
                ''
              )}
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default LogeIn
