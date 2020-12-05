import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

const Alert = ({ alertText }) => {
  return (
    <div className='alert'>
      <Container>
        <Row>
          <Col>
            <div className='alert-Red'>
              <div className='alert-Question'>
                <h4>{alertText}</h4>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Alert
