import React, { useState, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { SocialMediaContext } from './Context'

import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai'
import Logo from '../Images/Logo-3.png'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
const ResetPassword = () => {
  const [TypeHandel, setTypeHandel] = useState('password')
  const [PassInput, setPassInput] = useState('')
  const [ConfirmPassInput, setConfirmPassInput] = useState('')
  const [message, setmessage] = useState('')
  const { resetPasswordCall } = useContext(SocialMediaContext)

  const PassTypeHandel = type => {
    setTypeHandel(type)
  }

  const inputOnchangePass = e => {
    setPassInput(e.target.value)
  }
  const inputOnchangeConfirmPass = e => {
    setConfirmPassInput(e.target.value)
  }
  let history = useHistory()
  const resetPasswordSubmit = e => {
    e.preventDefault()
    if (PassInput === ConfirmPassInput) {
      const LINK = window.location.pathname
      const secondSplit = LINK.slice(15, 187)
      const PASSWORD = PassInput
      resetPasswordCall(secondSplit, PASSWORD)
      setmessage('The password is change')
      setTimeout(() => {
        history.push('/')
      }, 2000)
    } else {
      setmessage('The passwords are not the same')
      setTimeout(() => {
        setmessage('')
      }, 2000)
    }
  }

  return (
    <div className='Loge-in'>
      <Container>
        <Row>
          <Col md={{ span: 6, offset: 3 }}>
            <Form onSubmit={e => resetPasswordSubmit(e)}>
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
                    type={TypeHandel}
                    name='email'
                    id='email'
                    placeholder='Please write your new password'
                    value={PassInput}
                    onChange={e => inputOnchangePass(e)}
                />
              </Form.Group>
			  <Form.Group>
                <span className='rounded logein-password'>
                  <Form.Control
                    type={TypeHandel}
                    name='password'
                    id='password'
                    placeholder='Please confirm your passWord'
                    value={ConfirmPassInput}
                    onChange={e => inputOnchangeConfirmPass(e)}
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
				  onClick={e => resetPasswordSubmit(e)}
                >
                  Save Password
                </Button>
              </Col>
                {message !== null ? (
                  <h6 className='RedError'>{message}</h6>
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

export default ResetPassword
