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
import EmojiesOveraly from './EmojiesOveraly'
import AlertRemove from './AlertRemove'
const PostPageMapPOST = ({ item }) => {
  const [comment, setcomment] = useState('')
  const [likeChek, setlikeChek] = useState(false)
  const [popUpImage, setPopUpImage] = useState(false)
  const [showLikeEmojis, setShowLikeEmojis] = useState(false)
  const [showlikeEmojisList, setShowlikeEmojisList] = useState(false)
  const [showCommnets, setshowCommnets] = useState(false)
  const [showRemoveAlert, setshowRemoveAlert] = useState(false)
  const [userLikedEmoji, setuserLikedEmoji] = useState('')
  const {
    id,
    WritecommentCALL,
    DeletePostCALL,
    GetUSerPageData,
    ridirectFunction,
    likeCall,
    deleteLikeCall,
    setshowNotificationsMenu,
    setshowSearchMenu
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

  const deletepost = () => {
    DeletePostCALL(item._id, id, isMedia)
    const LINK = window.location.pathname
    if (LINK !== '/home') {
      GoToLink(`/home`)
    }
  }
  const setMenusFalse = () => {
    setshowNotificationsMenu(false)
    setshowSearchMenu(false)
  }
  return (
    <div onClick={() => setMenusFalse()}>
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
                  ProfilePic={item.user.ProfilePic ? item.user.ProfilePic : undefined}
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
                <div className="postpage_trashWrapper">
                  <FaTrashAlt
                    className='postpage_trash'
                    onClick={() => setshowRemoveAlert(true)}
                  />
                </div>
              ) : (
                ''
              )}
              <div
                className='postpage_Like'
                ref={targetLikes}
                onMouseEnter={() => setShowlikeEmojisList(true)}
                onMouseLeave={() => setShowlikeEmojisList(false)}
              >
                <h6>likes: {item.Likes?.length}</h6>
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
                    <EmojiesOveraly
                      targetEmojies={targetEmojies}
                      showLikeEmojis={showLikeEmojis}
                      setShowLikeEmojis={setShowLikeEmojis}
                      makeLike={makeLike}
                    />
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
                {item.Comments.length !== 0 && !showCommnets && (
                  <h6
                    className='showComments'
                    onClick={() => setshowCommnets(true)}
                  >
                    Show comments
                  </h6>
                )}
                {item.Comments.length !== 0 && showCommnets && (
                  <h6
                    className='showComments'
                    onClick={() => setshowCommnets(false)}
                  >
                    Hide comments
                  </h6>
                )}
              </span>
              {item.Comments.length !== 0 && showCommnets && (
                <div>
                  <hr className='hr'></hr>
                  {commnetsMap}
                </div>
              )}
            </div>
            {showRemoveAlert && (
              <AlertRemove
                displayText={`Are your sure you want to remove this post?`}
                yes={() => deletepost()}
                no={() => setshowRemoveAlert(false)}
              />
            )}
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default PostPageMapPOST

function getObjectLength (x) {
  if (x) return Object.keys(x).length
}
