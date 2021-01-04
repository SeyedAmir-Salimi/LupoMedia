import React, { useContext, useState } from 'react'
import { SocialMediaContext } from './Context'
import { FaTrashAlt } from 'react-icons/fa'
import LastSeen from './LastSeen'
import ProfilePicture from './ProfilePicture'
import { useHistory } from 'react-router-dom'
import { FcInternal } from 'react-icons/fc'
import CommentsReplyPageMap from './CommentsReplyPageMap'
import { Container, Row, Col, Form } from 'react-bootstrap'
import AlertRemove from './AlertRemove'
const CommentsPageMap = ({ comment }) => {
  const [showReplyCommnets, setShowReplyCommnets] = useState(false)
  const [showRespondInput, setShowRespondInput] = useState(false)
  const [replyInputValue, setreplyInputValue] = useState('')
  const [showRemoveAlert, setshowRemoveAlert] = useState(false)

  const {
    id,
    DeleteCommentCALL,
    GetUSerPageData,
    ridirectFunction,
    WritecommentReplyCALL
  } = useContext(SocialMediaContext)
  let history = useHistory()

  const GoToLink = link => {
    ridirectFunction(link)
    history.push(link)
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
  const textL = comment.comment.length
  const textAlignStyle = textL > 120 ? 'justify' : 'left'

  let replyCommnetsMap = comment.repliedComments.map(item => {
    return <CommentsReplyPageMap key={item._id} comment={item} />
  })
  return (
    <>
      <Container>
        <Row>
          <Col>
            <div key={comment._id}>
              <div className='postpage_Comment_detail'>
                <div
                  className='Comment_text'
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
                  <span>
                    <h6
                      className='commnet_respond'
                      onClick={() => {
                        setShowRespondInput(!showRespondInput)
                        if (!showRespondInput) {
                          setShowReplyCommnets(true)
                        }
                      }}
                    >
                      Respond
                    </h6>
                  </span>
                  {comment.comment}
                  {comment.user._id === id || comment.postref.user === id ?  (
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
                    className='showComments_reply'
                    onClick={() => setShowReplyCommnets(true)}
                  >
                    Show reply comments
                  </h6>
                ) : (
                  ''
                )}
                {comment.repliedComments.length !== 0 && showReplyCommnets ? (
                  <h6
                    className='showComments_reply'
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
              {showReplyCommnets ? replyCommnetsMap : ''}
            </div>
            {showRemoveAlert && (
              <AlertRemove
                displayText={`Are your sure you want to remove this comment?`}
                yes={() => DeleteCommentCALL(comment._id, comment.postref._id)}
                no={()=> setshowRemoveAlert(false)}
              />
            )}
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default CommentsPageMap
