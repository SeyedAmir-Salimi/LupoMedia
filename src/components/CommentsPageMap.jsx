import React, { useContext } from 'react'
import { SocialMediaContext } from './Context'
import { FaTrashAlt } from 'react-icons/fa'
import LastSeen from './LastSeen'
import ProfilePicture from './ProfilePicture'
import { useHistory } from 'react-router-dom'

const CommentsPageMap = ({ item }) => {
  const {
    id,
    DeleteCommentCALL,
    comments,
    GetUSerPageData,
    ridirectFunction
  } = useContext(SocialMediaContext)
  let history = useHistory()
  
  const GoToLink = link => {
    ridirectFunction(link)
    history.push(link)
  }

  const GetUSerPageDataSet = (ID, PIC, NAME,SESSO) => {
    GetUSerPageData(ID, PIC, NAME,SESSO)
  }
  const GoTo = (ID, PIC, NAME,SESSO) => {
    GetUSerPageDataSet(ID, PIC, NAME,SESSO)
    if (ID === id) {
      GoToLink(`/MyPage`)
    } else {
      GoToLink(`/${NAME}`)
    }
  }
  return (
    <div>
      {comments.map(com => (
        <div key={com._id}>
          {item._id === com.postref._id ? (
            <div className='postpage_Comment_detail'>
              <div className='Comment_pic_username_date'>
                <span className='CommentProfilePic_Wrapper'>
                  <ProfilePicture
                    ProfilePic={com.user.ProfilePic}
                    User_Name={com.user.name}
                    sesso={com.user.sesso}
                    onClick={() =>
                      GoTo(com.user._id, com.user.ProfilePic.picture, com.user.name, com.user.sesso)
                    }
                  />
                </span>
                <h6 className='Comment_username'>{com.user.name}</h6>
                <h6 className='Comment_date'>
                  <LastSeen date={com.date} />
                </h6>
              </div>
              <h6 className="Comment_text">
                {com.comment}{' '}
                {com.user._id === id || id === item.user._id ? (
                  <FaTrashAlt
                    style={{ fontSize: '1rem' }}
                    className='postpage_trash'
                    onClick={() => DeleteCommentCALL(com._id, com.postref._id)}
                  />
                ) : (
                  ''
                )}
              </h6>
            </div>
          ) : (
            ''
          )}
        </div>
      ))}
    </div>
  )
}

export default CommentsPageMap
