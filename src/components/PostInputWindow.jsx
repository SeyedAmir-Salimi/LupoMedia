import React from 'react'
// import { SocialMediaContext } from './Context'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import { AiFillCloseCircle } from 'react-icons/ai'
function PostInputWindow ({hide}) {
  // const [PostCaption, setPostCaption] = useState('')
  // const { User_Name, id, AddPostCall } = useContext(SocialMediaContext)
  // const PostCaptionRef = useRef()
  return (
    <>
      <div className='PostInputWindow-wrapper'>
        <Container>
          <Row>
            <Col>
              <Form
                className='form-style-4'
                method='post'
                onSubmit={'UpdateDatiPersonali'}
              >
                <div className="PostInputWindow-text-close">
                  <p className='PostInputWindow-closeButton hvr-buzz-out'>
                    <AiFillCloseCircle onClick={hide}/>
                  </p>
                  <h3>Create your goal</h3>
                </div>
                <Form.Group>
                  <Form.Control
                    as='textarea'
                    rows={3}
                    type='text'
                    id='DP_Bio'
                    name='Bio'
                    maxLength='198'
                    placeholder={'Write your goal to achieve'}
                    value={''}
                    onChange={''}
                    className='datiPersonali-Input'
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label className='datiPersonali-Label'>
                    Set your achievement date:
                  </Form.Label>
                  <Form.Control
                    type='date'
                    name='BirthDate'
                    id='DP_BirthDate'
                    value={''}
                    onChange={''}
                    className='datiPersonali-date'
                  />
                </Form.Group>
                <Button size='m' className='m-2 button_Log font-weight-bold'>
                  Public
                </Button>
              </Form>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  )
}

export default PostInputWindow
