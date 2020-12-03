import React, {
  useState,
  useContext,
  useEffect,
  useCallback,
  useRef
} from 'react'
import { useHistory } from 'react-router-dom'
import { SocialMediaContext } from './Context'
import { TiHeart, TiHeartOutline } from 'react-icons/ti'
import { FaTrashAlt } from 'react-icons/fa'
import { FcInternal } from 'react-icons/fc'
import CommentsPageMap from './CommentsPageMap'
import LastSeen from './LastSeen'
import ProfilePicture from './ProfilePicture'
import ImagePopup from './ImagePopup'
import { Container, Row, Col, Form, Overlay, Popover } from 'react-bootstrap'
const PostPageMap = ({ item }) => {
  const [comment, setcomment] = useState('')
  const [likeChek, setlikeChek] = useState(false)
  const [popUpImage, setPopUpImage] = useState(false)
  const [showLikeEmojis, setShowLikeEmojis] = useState(false)
  const {
    id,
    WritecommentCALL,
    DeletePostCALL,
    GetUSerPageData,
    ridirectFunction,
    likeCall,
    deleteLikeCall,
    comments
  } = useContext(SocialMediaContext)
  const onchangHandler = e => {
    setcomment(e.target.value)
  }
  const WriteComments = (e, ref, comments, users) => {
    e.preventDefault()
    WritecommentCALL(ref, comments, users)
    setcomment('')
  }
  let history = useHistory()
  const GoToLink = link => {
    ridirectFunction(link)
    history.push(link)
  }

  const GoTo = () => {
    GetUSerPageData(
      item.user._id,
      item.user.ProfilePic.picture,
      item.user.name,
      item.user.sesso
    )
    if (item.user._id === id) {
      GoToLink(`/MyPage`)
    } else {
      GoToLink(`/${item.user.name}`)
    }
  }
  const makeLike = like => {
    likeCall(item._id, like)
    setlikeChek(true)
    setShowLikeEmojis(false)
  }
  const checkLiked = item.Likes?.map(x => x.user._id).includes(id)

  const checkedLike = useCallback(() => {
    if (checkLiked) setlikeChek(true)
  }, [checkLiked])

  useEffect(() => {
    checkedLike()
  }, [checkedLike])

  const isMedia = getObjectLength(item.media)

  const deleteLiked = () => {
    deleteLikeCall(item._id)
    setlikeChek(false)
  }
  const isPostHasComments = () => {
    return comments.some(x => x.postref._id === item._id)
  }
  const marginTopPostCaption = !isMedia ? '3.2rem' : '1rem'
  const target = useRef(null)

  return (
    <>
      {popUpImage && (
        <ImagePopup
          item={item}
          onKey={() => setPopUpImage(false)}
          tabIndex={0}
        />
      )}
      <Container>
        <Row>
          <Col className='PostPageMap-col'>
            <div key={item._id} className='postpage'>
              <div className='PostProfilPic_Wrapper'>
                <ProfilePicture
                  ProfilePic={item.user.ProfilePic}
                  User_Name={item.user.name}
                  Size={'Medium'}
                  onClick={GoTo}
                  sesso={item.user.sesso}
                />
              </div>
              <h4 className='postpage_name'>{item.user.name}</h4>
              <h6 className='postpage_date'>
                <LastSeen date={item.date} />
              </h6>
              {item.user._id === id ? (
                <FaTrashAlt
                  className='postpage_trash'
                  onClick={() => DeletePostCALL(item._id, id, isMedia)}
                />
              ) : (
                ''
              )}
              <div className='postpage_Like'>
                <h6>Likes: {item.Likes?.length}</h6>
              </div>
              <br />

              {isMedia && item.type === 'pic' ? (
                <img
                  src={item.media.media}
                  alt={item.caption}
                  className='postpage_Image'
                  onClick={() => setPopUpImage(true)}
                />
              ) : (
                ''
              )}
              {isMedia && item.type === 'video' ? (
                <video
                  src={item.media.media}
                  controls
                  controlsList='nodownload'
                  className='videoPlayer'
                  preload='none'
                >
                  {' '}
                  Your browser does not support the video tag.
                </video>
              ) : (
                ''
              )}

              <h5
                className='postpage_Caption'
                style={{ marginTop: marginTopPostCaption }}
              >
                {item.caption}
              </h5>
              <Form onSubmit={e => WriteComments(e, item._id, comment, id)}>
                {/* <form onSubmit={e => WriteComments(e, item._id, comment, id)}> */}
                <span className='postpage_CommentInput'>
                  <div className='like'>
                    <span
                      ref={target}
                      onMouseEnter={() => setShowLikeEmojis(true)}
                      onMouseLeave={() => setShowLikeEmojis(false)}
                    >
                      {likeChek ? (
                        <TiHeart
                          className='FcLike'
                          style={{ border: '1rem' }}
                          onClick={() => deleteLiked()}
                        />
                      ) : (
                        <TiHeartOutline
                          className='FcLike'
                          onClick={() => makeLike('love')}
                        />
                      )}
                    </span>
                    <Overlay
                      target={target.current}
                      show={showLikeEmojis}
                      placement='bottom'
                    >
                      {props => (
                        <Popover className='popover-basic' {...props}>
                          <div
                            className='emojis'
                            onMouseEnter={() => setShowLikeEmojis(true)}
                            onMouseLeave={() => setShowLikeEmojis(false)}
                          >
                            <span
                              role='img'
                              aria-label='laugh'
                              onClick={() => makeLike('laugh')}
                            >
                              😂
                            </span>
                            <span
                              role='img'
                              aria-label='tongue'
                              onClick={() => makeLike('tongue')}
                            >
                              😜
                            </span>
                            <span
                              role='img'
                              aria-label='love'
                              onClick={() => makeLike('love')}
                            >
                              😍
                            </span>
                            <span
                              role='img'
                              aria-label='kiss'
                              onClick={() => makeLike('kiss')}
                            >
                              😘
                            </span>
                            <span
                              role='img'
                              aria-label='oh'
                              onClick={() => makeLike('oh')}
                            >
                              😰
                            </span>
                            <span
                              role='img'
                              aria-label='cry'
                              onClick={() => makeLike('cry')}
                            >
                              😭
                            </span>
                            <span
                              role='img'
                              aria-label='angry'
                              onClick={() => makeLike('angry')}
                            >
                              😡
                            </span>
                            <span
                              role='img'
                              aria-label='poop'
                              onClick={() => makeLike('poop')}
                            >
                              💩
                            </span>
                          </div>
                        </Popover>
                      )}
                    </Overlay>
                  </div>
                  <Form.Group>
                    <Form.Control
                      type='text'
                      name=''
                      className='postpageComments'
                      placeholder=' Write Your Commnet'
                      onChange={onchangHandler}
                      value={comment}
                    />
                  </Form.Group>
                  {/* <input
                    type='text'
                    name=''
                    className='postpageComments'
                    placeholder=' Write Your Commnet'
                    onChange={onchangHandler}
                    value={comment}
                  /> */}
                  <FcInternal
                    className='FC_ICONS'
                    style={{ fontSize: '2rem' }}
                    onClick={e => WriteComments(e, item._id, comment, id)}
                  />
                </span>
                {/* </form> */}
              </Form>
              {isPostHasComments() && (
                <span>
                  {/* <h4 className='postpage_Comment'>comments:</h4> */}
                  <hr className='hr'></hr>
                  <CommentsPageMap key={item._id} item={item} />
                </span>
              )}
            </div>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default PostPageMap

function getObjectLength (x) {
  if (x) return Object.keys(x).length
}
