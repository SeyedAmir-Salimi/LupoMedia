import React, { useState, useContext, useRef, useEffect } from 'react'
import { SocialMediaContext } from './Context'
import { FcCamera, FcInternal } from 'react-icons/fc'
import {
  Container,
  Row,
  Col,
  Form,
  Tooltip,
  Overlay
} from 'react-bootstrap'
import Alert from './Alert'

const PostInput = () => {
  const [PostCaption, setPostCaption] = useState('')
  const [InputValue, setInputValue] = useState('')
  const [sizeAlert, setSizeAlert] = useState(false)
  const [postInputAlert, setpostInputAlert] = useState(false)
  const { User_Name, id, AddPostCall } = useContext(SocialMediaContext)
  const PO_Pic = document.getElementById('PO_Pic')
  const triggerInputFile = () => {
    PO_Pic.click()
  }
  const InputFileName = () => {
    // eslint-disable-next-line no-useless-escape
    setInputValue(PO_Pic.value.match(/[\/\\]([\w\d\s\.\-\(\)]+)$/)[1])
  }
  // 1mb 1,048,576
  const limitUploadSize = () => {
    setSizeAlert(true)
    setTimeout(() => {
      setSizeAlert(false)
      setInputValue('')
    }, 3000)
  }
  const postInpuAlarm = () => {
    setpostInputAlert(true)
    setTimeout(() => {
      setpostInputAlert(false)
      setInputValue('')
    }, 3000)
  }
  const WritePost = e => {
    const extension = PO_Pic.value.split('.').pop()
    const element = document.querySelector('#PO_Pic').files[0]
    e.preventDefault()
    if (PostCaption === '') postInpuAlarm()
    if (PostCaption !== '') {
      if (element?.size > 10485760 && element) {
        limitUploadSize()
        setInputValue('')
        PO_Pic.value = ''
      } else {
        AddPostCall(id, PostCaption, extension)
        setPostCaption('')
        setInputValue('')
        PO_Pic.value = ''
      }
    }
    PO_Pic.value = ''
  }
  const onChangeHandler = e => {
    setPostCaption(e.target.value)
  }

  const PostCaptionRef = useRef()
  useEffect(() => {
    PostCaptionRef.current.focus()
  }, [])
  const FontColor = { color: 'rgb(223, 209, 144)' }
  const target = useRef(null)
  return (
    <>
      {sizeAlert && (
        <Alert
          alertText={'Your file is too big for upload, it shoud be under 10mb'}
        />
      )}
      {postInputAlert && (
        <Alert alertText={'You should write a caption for your post'} />
      )}
      <Container>
        <Row>
          <Col md={{ span: 6, offset: 3 }}>
            <span className='PostInput-row'>
              <Form inline>
                <Form.Group>
                  <Form.Control
                    type='text'
                    name='PostCaption'
                    className='PostCaption'
                    placeholder={'  What Do You Think ' + User_Name + '...'}
                    value={PostCaption}
                    onChange={e => onChangeHandler(e)}
                    ref={PostCaptionRef}
                  />
                </Form.Group>
              </Form>
              <span>
              <FcInternal id='FC' className='FC_ICONS' onClick={WritePost} />
              </span>
              <span ref={target}>
                <FcCamera onClick={triggerInputFile} className='FC_ICONS' />
              </span>
            </span>
            {/* {InputValue !== '' ? <p style={FontColor}>{InputValue}</p> : ''} */}
            <Overlay target={target.current} show={InputValue === "" ? false : true} placement='top'>
              {props => (
                <Tooltip id='overlay-example' {...props}>
                <p style={FontColor}>{InputValue}</p>
                </Tooltip>
              )}
            </Overlay>
          </Col>
        </Row>
      </Container>
      <input
        type='file'
        name='PostPic'
        id='PO_Pic'
        accept='.jpeg,.jpg,.tiff,.gif,.bmp,.png,.mp4'
        style={{ visibility: 'hidden' }}
        onChange={InputFileName}
      />
    </>
  )
}

export default PostInput
