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
import Emojies from './Emojies'
const PostPageMap = ({ item }) => {
  const [comment, setcomment] = useState('')
  const [likeChek, setlikeChek] = useState(false)
  const [popUpImage, setPopUpImage] = useState(false)
  const [showLikeEmojis, setShowLikeEmojis] = useState(false)
  const [showlikeEmojisList, setShowlikeEmojisList] = useState(false)
  const [showCommnets, setshowCommnets] = useState(false)
  const [userLikedEmoji, setuserLikedEmoji] = useState('')
  const {
    id,
    WritecommentCALL,
    DeletePostCALL,
    GetUSerPageData,
    ridirectFunction,
    likeCall,
    deleteLikeCall,
    setshowNotificationsMenu
  } = useContext(SocialMediaContext)
  const onchangHandler = e => {
    setcomment(e.target.value)
  }
  const WriteComments = (e, ref, comments, users) => {
    e.preventDefault()
    WritecommentCALL(ref, comments, users)
    setshowCommnets(true)
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
    setuserLikedEmoji(like)
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

  const marginTopPostCaption = !isMedia ? '3.2rem' : '1rem'
  const targetEmojies = useRef(null)
  const targetLikes = useRef(null)

  let commnetsMap = item.Comments.map(item => {
    return <CommentsPageMap key={item._id} comment={item} />
  })

  const isUserLIked = useCallback(() => {
    let res
    for (let index = 0; index < item.Likes.length; index++) {
      const element = item.Likes[index]
      if (element.user._id === id) {
        res = element.like
        break
      }
    }
    return res
  }, [id, item.Likes])

  useEffect(() => {
    setuserLikedEmoji(isUserLIked())
  }, [isUserLIked])
  return (
    <div onClick={() => setshowNotificationsMenu(false)}>
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
                  onClick={() => GoTo()}
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
              <div
                className='postpage_Like'
                ref={targetLikes}
                onMouseEnter={() => setShowlikeEmojisList(true)}
                onMouseLeave={() => setShowlikeEmojisList(false)}
              >
                <h6>Likes: {item.Likes?.length}</h6>
              </div>
              <br />

              <Overlay
                target={targetLikes.current}
                show={showlikeEmojisList}
                placement='bottom'
              >
                <Popover
                  className='popover-basic'
                  id='style-3'
                  onMouseEnter={() => setShowlikeEmojisList(true)}
                  onMouseLeave={() => setShowlikeEmojisList(false)}
                >
                  {item.Likes.map(x => (
                    <div className='postPageMap-postLikes' key={x?._id}>
                      <h6>{x?.user.name}:</h6>
                      <Emojies likeType={x?.like} emojiSize={'0.9rem'} />
                    </div>
                  ))}
                </Popover>
              </Overlay>

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
                <span className='postpage_CommentInput'>
                  <div className='like'>
                    <span
                      ref={targetEmojies}
                      onMouseEnter={() => setShowLikeEmojis(true)}
                      onMouseLeave={() => setShowLikeEmojis(false)}
                    >
                      {likeChek ? (
                        userLikedEmoji === 'love' ? (
                          <TiHeart
                            className='FcLike-heart'
                            onClick={() => deleteLiked()}
                          />
                        ) : (
                          <Emojies
                            emojiSize={'1.2rem'}
                            likeType={userLikedEmoji}
                            onClick={() => deleteLiked()}
                          />
                        )
                      ) : (
                        <TiHeartOutline
                          className='FcLike-heart'
                          onClick={() => makeLike('love')}
                        />
                      )}
                    </span>
                    <Overlay
                      target={targetEmojies.current}
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
                      placeholder=' Write your commnet'
                      onChange={onchangHandler}
                      value={comment}
                    />
                  </Form.Group>
                  <FcInternal
                    className='FC_ICONS'
                    style={{ fontSize: '2rem' }}
                    onClick={e => WriteComments(e, item._id, comment, id)}
                  />
                </span>
              </Form>
              <span>
                {item.Comments.length !== 0 && !showCommnets ? (
                  <h6
                    className='showComments'
                    onClick={() => setshowCommnets(true)}
                  >
                    Show comments
                  </h6>
                ) : (
                  ''
                )}
                {item.Comments.length !== 0 && showCommnets ? (
                  <h6
                    className='showComments'
                    onClick={() => setshowCommnets(false)}
                  >
                    Hide comments
                  </h6>
                ) : (
                  ''
                )}
              </span>
              {showCommnets && (
                <div>
                  <hr className='hr'></hr>
                  {/* <CommentsPageMap comments={x} /> */}
                  {commnetsMap}
                </div>
              )}
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default PostPageMap

function getObjectLength (x) {
  if (x) return Object.keys(x).length
}
