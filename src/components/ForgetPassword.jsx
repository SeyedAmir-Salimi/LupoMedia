import React, { useContext, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { SocialMediaContext } from './Context'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import Logo from '../Images/Logo-3.png'

const ForgetPassword = () => {
  const [EmailInput, setEmailInput] = useState('')
  const {
    forgetPasswordCall,
    resetPasswordMessage,
    resetPasswordMessageError
  } = useContext(SocialMediaContext)
  const inputOnchange = e => {
    setEmailInput(e.target.value)
  }
  let history = useHistory()

  const forgetPasswordSubmit = e => {
    e.preventDefault()
    forgetPasswordCall(EmailInput)
    if (resetPasswordMessageError !== '') {
      setTimeout(() => {
        history.push('/')
      }, 2000)
    }
  }
  return (
    <div className='Loge-in'>
      <Container>
        <Row>
          <Col md={{ span: 6, offset: 3 }}>
            <Form onSubmit={e => forgetPasswordSubmit(e)}>
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
                    value={EmailInput}
                    onChange={e => inputOnchange(e)}
                />
              </Form.Group>
			  <Col>
                <Button
                  size='m'
                  className='m-2 button_Log_Login font-weight-bold'
                  type='submit'
                  onClick={e => forgetPasswordSubmit(e)}
                >
                  Reset password
                </Button>
              </Col>
            </Form>
                {resetPasswordMessage !== '' ? (
                  <div className='Forget-password-message'>
                    <h5>Dear</h5>
                    <h3>{resetPasswordMessage}</h3>
                    <h5>email has been sent to your email address</h5>
                    <h5>You just have one hour to use this link</h5>
                  </div>
                ) : (
                  ''
                )}
                {resetPasswordMessageError !== '' ? (
                  <h6 className='RedError'>{resetPasswordMessageError}</h6>
                ) : (
                  ''
                )}
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default ForgetPassword
