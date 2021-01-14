import React, { useContext } from 'react'
import { SocialMediaContext } from './Context'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'

const AlertChanges = ({ Mystate, NO, Yes, Done, Cancel }) => {
  const {
    ErrorMessage,
    NewPassword,
    onchangeHandPassword,
    ConfirmPassword
  } = useContext(SocialMediaContext)

  return (
    <div className='alert'>
      <Container>
        <Row>
          <Col>
            <div className='alert-Red'>
              <div className='alert-Question'>
                <Form
                  className='form-style-4'
                  method='post'
                  onSubmit={e => e.preventDefault(e)}
                >
                  {Mystate.PasswordPannel ? (
                    <div>
                      <h5>Please Write Your New Password</h5>
                      <p>Password: </p>
                      <Form.Group>
                        <Form.Control
                          type='password'
                          name='password'
                          id='DP_password'
                          value={NewPassword}
                          onChange={onchangeHandPassword}
                          className='AlertChange-Input'
                        />
                      </Form.Group>
                      <p>Confirm Password: </p>{' '}
                      <Form.Group>
                        <Form.Control
                          type='password'
                          name='Confirmpassword'
                          id='DP_Confirmpassword'
                          value={ConfirmPassword}
                          onChange={onchangeHandPassword}
                          className='AlertChange-Input'
                        />
                      </Form.Group>
                    </div>
                  ) : (
                    ''
                  )}

                  {Mystate.DeleteAccount ? (
                    <div>
                      <h5>Are you sure you want to delete your account?</h5>
                    </div>
                  ) : (
                    ''
                  )}
                  <span className="alertChange-buttonWrapper">
                    <Button
                      size='sm'
                      className='m-2 button_Log2 font-weight-bold'
                      onClick={Yes}
                    >
                      {Done}
                    </Button>
                    <Button
                      size='sm'
                      className='m-2 button_Log2 font-weight-bold'
                      onClick={NO}
                    >
                      {Cancel}
                    </Button>
                  </span>
                  {ErrorMessage && (
                    <h6 className='AlertChanges-error'>{ErrorMessage}</h6>
                  )}
                </Form>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default AlertChanges
