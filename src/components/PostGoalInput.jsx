import React, { useContext, useState } from 'react'
import { SocialMediaContext } from './Context'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import { AiFillCloseCircle } from 'react-icons/ai'
function PostGoalInput ({ hide }) {
  const [PostCaption, setPostCaption] = useState('')
  const [goalDate, setgoalDate] = useState('')
  const [error, setError] = useState('')
  const { id, addGoalCall } = useContext(SocialMediaContext)
  // const PostCaptionRef = useRef()
  const createYourGoal = e => {
    if (PostCaption && goalDate !== '') {
      e.preventDefault()
      addGoalCall(id, PostCaption, goalDate)
      hide()
    } else {
      setError("You should complete all fields")
      setTimeout(() => {
        setError("")
      }, 2000);
    }
  }
  const postCaptionOnchange = e => {
    setPostCaption(e.target.value)
  }
  const goalDatenOnchange = e => {
    setgoalDate(e.target.value)
  }

  return (
    <>
      <div className='PostInputWindow-wrapper'>
        <Container>
          <Row>
            <Col>
              <Form
                className='form-style-4'
                method='post'
                onSubmit={e => createYourGoal(e)}
              >
                <div className='PostInputWindow-text-close'>
                  <p className='PostInputWindow-closeButton hvr-buzz-out'>
                    <AiFillCloseCircle onClick={hide} />
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
                    value={PostCaption}
                    onChange={e => postCaptionOnchange(e)}
                    className='datiPersonali-Input'
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label className='datiPersonali-Label'>
                  I will reach my goal on:
                  </Form.Label>
                  <Form.Control
                    type='date'
                    name='BirthDate'
                    id='DP_BirthDate'
                    value={goalDate}
                    onChange={e => goalDatenOnchange(e)}
                    className='datiPersonali-date'
                  />
                </Form.Group>
                <Button
                  size='m'
                  className='m-2 button_Log font-weight-bold'
                  onClick={e => createYourGoal(e)}
                >
                  Publish
                </Button>
                {error && <h5>{error}</h5>}
              </Form>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  )
}

export default PostGoalInput
