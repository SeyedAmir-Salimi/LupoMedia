import React, { useState, useContext, useRef, useEffect } from 'react'
import { SocialMediaContext } from './Context'
// import { FcCamera, FcInternal, FcPlanner } from 'react-icons/fc'
import { AiFillCamera } from "react-icons/ai";
import { MdUpdate } from "react-icons/md";
import { FaLevelDownAlt } from "react-icons/fa";
import {
  Container,
  Row,
  Col,
  Form,
  Tooltip,
  Overlay,
  Popover
} from 'react-bootstrap'
import AlertRemove from './AlertRemove'
import PostInputWindow from './PostGoalInput'
const PostInput = () => {
  const [PostCaption, setPostCaption] = useState('')
  const [InputValue, setInputValue] = useState('')
  const [sizeAlert, setSizeAlert] = useState(false)
  const [postInputAlert, setpostInputAlert] = useState(false)
  const [showGoalInput, setShowGoalInput] = useState(false)
  const [showAttachOveraly, setShowAttachOveraly] = useState(false)
  const [showGoalOveraly, setShowGoalOveraly] = useState(false)
  const { User_Name, id, AddPostCall } = useContext(SocialMediaContext)
  const PO_Pic = document.getElementById('PO_Pic')
  const triggerInputFile = () => {
    PO_Pic.click()
  }
  const InputFileName = () => {
    // eslint-disable-next-line no-useless-escape
    setInputValue(PO_Pic.value.match(/[\/\\]([\w\d\s\.\-\(\)]+)$/)[1])
  }

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
  const targetAttach = useRef(null)
  const targetGoal = useRef(null)

  return (
    <>
      <Container>
        <Row>
          <Col md={{ span: 6, offset: 3 }}>
            {showGoalInput && (
              <PostInputWindow hide={() => setShowGoalInput(false)} />
            )}

            {sizeAlert && (
              <AlertRemove
                displayText={
                  'Your file is too big for upload, it shoud be under 10mb'
                }
                yes={undefined}
                no={undefined}
              />
            )}
            {postInputAlert && (
              <AlertRemove
                displayText={'You should write a caption for your post'}
                yes={undefined}
                no={undefined}
              />
            )}
            <span className='PostInput-row'>
              <Form inline onSubmit={e => WritePost(e)}>
                <Form.Group>
                  <Form.Control
                    type='text'
                    name='PostCaption'
                    className='PostCaption'
                    placeholder={' What do you think ' + User_Name + '...'}
                    value={PostCaption}
                    onChange={e => onChangeHandler(e)}
                    ref={PostCaptionRef}
                  />
                </Form.Group>
              </Form>
              <span>
                <FaLevelDownAlt
                  id='FC'
                  className='FC_ICONS icondown'
                  onClick={e => WritePost(e)}
                />
              </span>
              <span
                ref={targetAttach}
                onMouseEnter={() => setShowAttachOveraly(true)}
                onMouseLeave={() => setShowAttachOveraly(false)}
              >
                <AiFillCamera onClick={triggerInputFile} className='FC_ICONS' />
              </span>
              <span
                ref={targetGoal}
                onMouseEnter={() => setShowGoalOveraly(true)}
                onMouseLeave={() => setShowGoalOveraly(false)}
              >
                <MdUpdate
                  className='FC_ICONS'
                  onClick={() => setShowGoalInput(true)}
                />
              </span>
            </span>
            <Overlay
              target={targetAttach.current}
              show={InputValue === '' ? false : true}
              placement='top'
            >
              {props => (
                <Tooltip id='overlay-example' {...props}>
                  <p style={FontColor}>{InputValue}</p>
                </Tooltip>
              )}
            </Overlay>
          </Col>
        </Row>
      </Container>
      <Overlay
        target={targetAttach.current}
        show={showAttachOveraly}
        placement='bottom'
      >
        <Popover className='popover-nav'>
          <p>Attach a photo/video</p>
        </Popover>
      </Overlay>
      <Overlay
        target={targetGoal.current}
        show={showGoalOveraly}
        placement='bottom'
      >
        <Popover className='popover-nav'>
          <p>Create your goal</p>
        </Popover>
      </Overlay>
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
