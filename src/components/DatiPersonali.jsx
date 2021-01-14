import React, { useState, useContext, useEffect } from 'react'
import { SocialMediaContext } from './Context'
import NavBar from './NavBar'
import AlertChanges from './AlertChanges'
import ProfilePicture from './ProfilePicture'
import { useHistory } from 'react-router-dom'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import DarkModeButton from './DarkModeButton'
const DatiPersonali = () => {
  const [Pannel, setPannel] = useState({
    PasswordPannel: false,
    DeleteAccount: false
  })
  const [showEditPic, setShowEditPic] = useState(false)
  const {
    deleteAccountCall,
    cancelUpdatePassword,
    LogeOut,
    token,
    updatePasswordCall,
    // deleteAccount,
    ProfilePic,
    datiPersonali,
    UpdateDatiPersonali,
    onchangeHandlerDatiPersonali,
    uploadPicprofile,
  } = useContext(SocialMediaContext)

  let history = useHistory()
  useEffect(() => {
    if (token === undefined) {
      history.push('/')
    }
  })

  const PasswordPannel = () => {
    setPannel({ PasswordPannel: !PasswordPannel })
  }
  const DeleteAccount = () => {
    deleteAccountCall()
    setPannel({ DeleteAccount: false })
  }
  const changPassword = async () => {
    const result = await updatePasswordCall()
    if (result.statusText === 'OK') {
      setPannel({ PasswordPannel: false })
    }
  }
  const editPicStyle = showEditPic ? '1' : '0'
  const PO_Pic = document.getElementById('DP_ProfilePic')
  const triggerInputFile = () => {
    PO_Pic.click()
  }
  return (
    <>
      <NavBar />
      <Container>
        <Row>
          <Col>
            {Pannel.PasswordPannel ? (
              <AlertChanges
                Mystate={{ ...Pannel }}
                NO={() => {
                  PasswordPannel()
                  cancelUpdatePassword()
                }}
                Yes={() => changPassword()}
                Done='Save'
                Cancel='Cancel'
              />
            ) : (
              ''
            )}
            {Pannel.DeleteAccount ? (
              <AlertChanges
                Mystate={{ ...Pannel }}
                NO={() => setPannel({ DeleteAccount: false })}
                Yes={() => {
                  DeleteAccount()
                  LogeOut()
                }}
                Done='Yes'
                Cancel='No'
              />
            ) : (
              ''
            )}
            <span
              className='datipersonali-pic'
              onMouseEnter={() => setShowEditPic(true)}
              onMouseLeave={() => setShowEditPic(false)}
              onClick={() => triggerInputFile()}
            >
              <ProfilePicture
                ProfilePic={ProfilePic}
                User_Name={datiPersonali.name}
                Size={'Big'}
              />
              <h4 style={{ opacity: editPicStyle }}>Edit</h4>
            </span>
            <Form
              className='form-style-4'
              method='post'
              onSubmit={UpdateDatiPersonali}
            >
              <Form.Group>
                <Form.Label className='datiPersonali-Label'>Name:</Form.Label>
                <Form.Control
                  type='text'
                  name='name'
                  id='DP_name'
                  value={datiPersonali.name}
                  onChange={e => onchangeHandlerDatiPersonali(e)}
                  className='datiPersonali-Input'
                />
              </Form.Group>
              <Form.Group>
                <Form.Label className='datiPersonali-Label'>Email:</Form.Label>
                <Form.Control
                  type='email'
                  name='email'
                  id='DP_email'
                  value={datiPersonali.email}
                  onChange={e => onchangeHandlerDatiPersonali(e)}
                  className='datiPersonali-Input'
                />
              </Form.Group>
              <Form.Group>
                <Form.Label className='datiPersonali-Label'>
                  Birth date:
                </Form.Label>
                <Form.Control
                  type='date'
                  name='BirthDate'
                  id='DP_BirthDate'
                  value={datiPersonali.BirthDate}
                  onChange={e => onchangeHandlerDatiPersonali(e)}
                  className='datiPersonali-date'
                />
              </Form.Group>

              <Form.Group>
                <Form.Label className='datiPersonali-Label'>
                  Relationship status:
                </Form.Label>
                {datiPersonali.Sentimentale === 'Singel' ? (
                  <Form.Control
                    as='select'
                    name='Sentimentale'
                    id='DP_Sentimentale'
                    value={datiPersonali.Sentimentale}
                    onChange={e => onchangeHandlerDatiPersonali(e)}
                  >
                    <option value='Singel'>Singel</option>
                    <option value='Married'>Married</option>
                  </Form.Control>
                ) : (
                  <Form.Control
                    as='select'
                    name='Sentimentale'
                    id='DP_Sentimentale'
                    value={datiPersonali.Sentimentale}
                    onChange={e => onchangeHandlerDatiPersonali(e)}
                  >
                    <option value='Singel'>Singel</option>
                    <option value='Married'>Married</option>
                  </Form.Control>
                )}{' '}
              </Form.Group>

              <Form.Group>
                <Form.Label className='datiPersonali-Label'>Sex:</Form.Label>
                {datiPersonali.sesso === 'Man' ? (
                  <Form.Control
                    as='select'
                    name='sesso'
                    id='DP_sesso'
                    value={datiPersonali.sesso}
                    onChange={e => onchangeHandlerDatiPersonali(e)}
                  >
                    <option value='Man'>Man</option>
                    <option value='Woman'>Woman</option>
                  </Form.Control>
                ) : (
                  <Form.Control
                    as='select'
                    name='sesso'
                    id='DP_sesso'
                    value={datiPersonali.sesso}
                    onChange={e => onchangeHandlerDatiPersonali(e)}
                  >
                    <option value='Man'>Man</option>
                    <option value='Woman'>Woman</option>
                  </Form.Control>
                )}{' '}
              </Form.Group>

              <Form.Group>
                <Form.Label className='datiPersonali-Label'>Bio:</Form.Label>
                <Form.Control
                  as='textarea'
                  rows={3}
                  type='text'
                  id='DP_Bio'
                  name='Bio'
                  maxLength='198'
                  value={datiPersonali.Bio}
                  onChange={e => onchangeHandlerDatiPersonali(e)}
                  className='datiPersonali-Input'
                />
              </Form.Group>
              <span className="DarkModeButton">
                <DarkModeButton />
              </span>
              <Form.Group>
                <Form.Control
                  type='file'
                  name='ProfilePic'
                  id='DP_ProfilePic'
                  onChange={uploadPicprofile}
                  style={{ visibility: 'hidden' }}
                />
              </Form.Group>
              <Button
                size='m'
                className='m-2 button_Log font-weight-bold'
                onClick={() => setPannel({ PasswordPannel: true })}
              >
                Change password
              </Button>

              <Button
                size='m'
                className='m-2 button_Log font-weight-bold'
                onClick={UpdateDatiPersonali}
              >
                Save Changes
              </Button>
            </Form>
            <Button
              size='s'
              className='button_Log font-weight-bold'
              style={{ width: '15rem' }}
              onClick={() => setPannel({ DeleteAccount: true })}
            >
              Delete Account
            </Button>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default DatiPersonali
