import React, { useState, useContext} from 'react'
import { AiFillCloseCircle } from 'react-icons/ai'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import { SocialMediaContext } from './Context'
function AssistenzaMessage () {
    const [reportCaption, setReportCaption] = useState('')
    const {toggleShowAssistanec} = useContext(SocialMediaContext)
    const reportOnchange = e => {
    setReportCaption(e.target.value)
    }
    
  const createReport = e => {
    e.preventDefault()
    toggleShowAssistanec(false)
  }
  return (
    <>
      <div className='PostInputWindow-wrapper'>
        <Container>
          <Row>
            <Col>
              <Form
                className='form-style-4 assistanceWrapper'
                method='post'
                onSubmit={e => createReport(e)}
              >
                <div className='PostInputWindow-text-close'>
                  <p className='PostInputWindow-closeButton hvr-buzz-out'>
                    <AiFillCloseCircle onClick={()=> toggleShowAssistanec(false)} />
                  </p>
                  <h3>Please sign your report</h3>
                </div>
                <Form.Group>
                  <Form.Control
                    as='textarea'
                    rows={3}
                    type='text'
                    id='DP_Bio'
                    name='Bio'
                    maxLength='198'
                    placeholder={'your report'}
                    value={reportCaption}
                    onChange={e => reportOnchange(e)}
                    className='datiPersonali-Input'
                  />
                </Form.Group>
                <Button
                  size='m'
                  className='m-2 button_Log font-weight-bold'
                  disabled={reportCaption === ""}
                  onClick={e => createReport(e)}
                >
                  Send
                </Button>
              </Form>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  )
}

export default AssistenzaMessage
