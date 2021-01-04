import React, { useContext, useState } from 'react'
import { SocialMediaContext } from './Context'
import { FaTrashAlt } from 'react-icons/fa'
import LastSeen from './LastSeen'
import ProfilePicture from './ProfilePicture'
import { useHistory } from 'react-router-dom'
import { Form } from 'react-bootstrap'
import { FcInternal } from 'react-icons/fc'
import AlertRemove from './AlertRemove'
const CommentsReplyPageMap = ({ comment }) => {
  const [showReplyCommnets, setShowReplyCommnets] = useState(false)
  const [showRespondInput, setShowRespondInput] = useState(false)
  const [replyInputValue, setreplyInputValue] = useState('')
  const [showRemoveAlert, setshowRemoveAlert] = useState(false)

  const {
    id,
    DeleteReplyCommentCALL,
    GetUSerPageData,
    ridirectFunction,
    WritecommentReplyCALL
  } = useContext(SocialMediaContext)

  let history = useHistory()

  const GoToLink = link => {
    ridirectFunction(link)
    history.push(link)
  }
  const writeReply = e => {
    e.preventDefault()
    WritecommentReplyCALL(comment.postref._id, replyInputValue, id, comment._id)
    setShowReplyCommnets(true)
    setShowRespondInput(false)
    setreplyInputValue('')
  }
  const replyInputOnchange = e => {
    setreplyInputValue(e.target.value)
  }
  const GetUSerPageDataSet = (ID, PIC, NAME, SESSO) => {
    GetUSerPageData(ID, PIC, NAME, SESSO)
  }
  const GoTo = (ID, PIC, NAME, SESSO) => {
    GetUSerPageDataSet(ID, PIC, NAME, SESSO)
    if (ID === id) {
      GoToLink(`/MyPage`)
    } else {
      GoToLink(`/${NAME}`)
    }
  }
  const textL = comment.comment.length
  const textAlignStyle = textL > 78 ? 'justify' : 'left'

  let replyCommnetsMap = comment.repliedComments.map(item => {
    return <CommentsReplyPageMap key={item._id} comment={item} />
  })
  return (
    <>
      <div key={comment._id}>
        <div className='CommentsReplyPageMap_detail'>
          <div
            className='Comment_text_reply'
            style={{ textAlign: textAlignStyle }}
          >
            <div className='Comment_pic_username_date'>
              <span className='CommentProfilePic_Wrapper'>
                <ProfilePicture
                  ProfilePic={comment.user.ProfilePic}
                  User_Name={comment.user.name}
                  sesso={comment.user.sesso}
                  onClick={() =>
                    GoTo(
                      comment.user._id,
                      comment.user.ProfilePic.picture,
                      comment.user.name,
                      comment.user.sesso
                    )
                  }
                />
              </span>
            </div>
            <span className='Comment_name_and_date'>
              <h6 className=''>{comment.user.name}</h6>
              <h6 className='Comment_date'>
                <LastSeen date={comment.date} />
              </h6>
            </span>
            <h6
              className='commnet_respond_map'
              onClick={() => {
                setShowRespondInput(!showRespondInput)
                if (!showRespondInput) {
                  setShowReplyCommnets(true)
                }
              }}
            >
              Respond
            </h6>
            {comment.comment}{' '}
            {comment.user._id === id || comment.postref.user === id ? (
              <FaTrashAlt
                style={{ fontSize: '1rem' }}
                className='postpage_trash'
                onClick={() =>
                  setshowRemoveAlert(true)
                }
              />
            ) : (
              ''
            )}
          </div>
          {comment.repliedComments.length !== 0 && !showReplyCommnets ? (
            <h6
              className='showComments_reply_map'
              onClick={() => setShowReplyCommnets(true)}
            >
              Show reply comments
            </h6>
          ) : (
            ''
          )}
          {comment.repliedComments.length !== 0 && showReplyCommnets ? (
            <h6
              className='showComments_reply_map'
              onClick={() => {
                setShowReplyCommnets(false)
                setShowRespondInput(false)
              }}
            >
              Hide reply comments
            </h6>
          ) : (
            ''
          )}
        </div>
        {showRespondInput && (
          <Form onSubmit={e => writeReply(e)}>
            <span className='postpage_CommentInput'>
              <Form.Group>
                <Form.Control
                  type='text'
                  name=''
                  className='postpageComments_reply'
                  placeholder='Write Your Reply'
                  onChange={replyInputOnchange}
                  value={replyInputValue}
                />
              </Form.Group>
              <FcInternal
                className='FC_ICONS'
                style={{ fontSize: '2rem' }}
                onClick={e => writeReply(e)}
              />
            </span>
          </Form>
        )}
        {showRemoveAlert && (
              <AlertRemove
                displayText={`Are your sure you want to remove this comment?`}
                yes={() => DeleteReplyCommentCALL(comment._id, comment.postref._id)}
                no={()=> setshowRemoveAlert(false)}
              />
            )}
        {showReplyCommnets ? replyCommnetsMap : ''}
      </div>
    </>
  )
}

export default CommentsReplyPageMap
