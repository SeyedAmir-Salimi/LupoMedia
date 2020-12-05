import React, { useState, useContext, useEffect, useRef } from 'react'
import { SocialMediaContext } from './Context'
import { useHistory } from 'react-router-dom'
import Logo from '../Images/Logo-3.png'
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
const Register = () => {
  const {
    redirect,
    RegisterFunctCALL,
    RegisterError,
    nameError,
    emailError,
    passwordError,
    ConfirmPassWordError
  } = useContext(SocialMediaContext)
  const [Register, setRegister] = useState({
    information: {
      name: '',
      email: '',
      sesso: 'Man',
      password: '',
      ConfirmPassWord: '',
      err: ''
    }
  })
  const [TypeHandel, setTypeHandel] = useState('password')

  const PassTypeHandel = type => {
    setTypeHandel(type)
  }

  const onchangeHandler = e => {
    let copy = { ...Register.information }
    copy[e.target.name] = e.target.value
    setRegister({ information: copy })
  }

  const Registration = (
    e,
    Registername,
    Registeremail,
    Registersesso,
    Registerpassword,
    RegisterConfirmPassWord
  ) => {
    e.preventDefault()
    RegisterFunctCALL(
      Registername,
      Registeremail,
      Registersesso,
      Registerpassword,
      RegisterConfirmPassWord
    )
  }
  let history = useHistory()

  useEffect(() => {
    if (redirect === '/') {
      history.push('/')
    }
  })

  useEffect(() => {
    nameRef.current.focus()
  }, [])
  const nameRef = useRef(null)

  return (
    <div className='Loge-in'>
      <Container>
        <Row>
          <Col md={{ span: 6, offset: 3 }}>
            <Form
              onSubmit={e =>
                Registration(
                  e,
                  Register.information.name,
                  Register.information.email,
                  Register.information.sesso,
                  Register.information.password,
                  Register.information.ConfirmPassWord
                )
              }
            >
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
                  type='text'
                  name='name'
                  id='name'
                  placeholder='Please Write Your Name and Family'
                  ref={nameRef}
                  onChange={onchangeHandler}
                  value={Register.information.name}
                />
              </Form.Group>

              <Form.Group>
                <Form.Control
                  type='email'
                  name='email'
                  id='email'
                  placeholder='Please Write Your Email'
                  onChange={onchangeHandler}
                  value={Register.information.email}
                />
              </Form.Group>

              <Form.Group>
                <Form.Control
                  as='select'
                  name='sesso'
                  id='RG_Sesso'
                  value={Register.information.sesso}
                  onChange={onchangeHandler}
                >
                  <option value='Man'>Man</option>
                  <option value='Woman'>Woman</option>
                </Form.Control>
              </Form.Group>

              <Form.Group>
                <span className='rounded logein-password'>
                  <Form.Control
                    type={TypeHandel}
                    name='password'
                    id='password'
                    placeholder='Please Enter Your PassWord'
                    onChange={onchangeHandler}
                    value={Register.information.password}
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

              <Form.Group>
                <Form.Control
                  type={TypeHandel}
                  name='ConfirmPassWord'
                  id='ConfirmPassWord'
                  placeholder='Please Confirm Your PassWord'
                  onChange={onchangeHandler}
                  value={Register.information.ConfirmPassWord}
                />
              </Form.Group>

              <Button
                size='m'
                className='m-2 button_Log font-weight-bold'
                onClick={e =>
                  Registration(
                    e,
                    Register.information.name,
                    Register.information.email,
                    Register.information.sesso,
                    Register.information.password,
                    Register.information.ConfirmPassWord
                  )
                }
              >
                Register
              </Button>

            </Form>
            {RegisterError !== null ? (
              <h5 className='RedError'>{RegisterError}</h5>
            ) : (
              ''
            )}
            {nameError !== null ? (
              <h5 className='RedError'>{nameError}</h5>
            ) : (
              ''
            )}
            {emailError !== null ? (
              <h5 className='RedError'>{emailError}</h5>
            ) : (
              ''
            )}
            {passwordError !== null ? (
              <h5 className='RedError'>{passwordError}</h5>
            ) : (
              ''
            )}
            {ConfirmPassWordError !== null ? (
              <h5 className='RedError'>{ConfirmPassWordError}</h5>
            ) : (
              ''
            )}
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Register
