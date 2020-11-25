import React, { useState, useContext, useRef, useEffect } from 'react'
import { SocialMediaContext } from './Context'
import { FcCamera, FcInternal } from 'react-icons/fc'
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
    if(PostCaption === '') postInpuAlarm()
    if (PostCaption !== '') {
      if (element?.size > 10485760 && element) {
        limitUploadSize()
        setInputValue('')
        PO_Pic.value = ""
      } else {
        AddPostCall(id, PostCaption, extension)
        setPostCaption('')
        setInputValue('')
        PO_Pic.value = ""
      }
    }
    PO_Pic.value = ""
  }
  const onChangeHandler = e => {
    setPostCaption(e.target.value)
  }

  const PostCaptionRef = useRef()
  useEffect(() => {
    PostCaptionRef.current.focus()
  }, [])

  const FontColor = { color: 'rgb(223, 209, 144)' }
  return (
    <div>
      {sizeAlert && (
        <Alert
          alertText={'Your file is too big for upload, it shoud be under 10mb'}
        />
      )}
      {postInputAlert && (
        <Alert
          alertText={'You should write a caption for your post'}
        />
      )}
      <div>
        <form
          onSubmit={WritePost}
          className='PostInput'
          disabled={PostCaption === ''}
        >
          <input
            type='text'
            name='PostCaption'
            className='PostCaption'
            placeholder={'  What Do You Think ' + User_Name + '...'}
            value={PostCaption}
            onChange={e => onChangeHandler(e)}
            ref={PostCaptionRef}
          />

          <FcInternal id='FC' className='FC_ICONS' onClick={WritePost} />
          <FcCamera onClick={triggerInputFile} className='FC_ICONS' />
          {InputValue !== '' ? (
            <p style={FontColor}>{InputValue}</p>
          ) : (
            ''
            // <p style={FontColor}>No File Chosen Yet</p>
          )}
        </form>
      </div>
      <input
        type='file'
        name='PostPic'
        id='PO_Pic'
        accept='.jpeg,.jpg,.tiff,.gif,.bmp,.png,.mp4'
        style={{ visibility: 'hidden' }}
        onChange={InputFileName}
      />
    </div>
  )
}

export default PostInput
