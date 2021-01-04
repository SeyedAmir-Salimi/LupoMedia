import React, { useContext } from 'react'
import { SocialMediaContext } from '../Context'
import ProfilePicture from '../ProfilePicture'
import { useHistory } from 'react-router-dom'

const AwaitingMapFollowers = ({ item }) => {
  const {
    deleteFollowersAwaiting,
    id,
    respondFriendRequestCall,
    GetUSerPageData
  } = useContext(SocialMediaContext)
  let history = useHistory()
  const acceptReq = () => {
    respondFriendRequestCall(
      item._id,
      item.mainUser.name,
      item.mainUser.ProfilePic,
      item.mainUser.Bio,
      item.mainUser.Sentimentale,
      item.mainUser.BirthDate,
      item.mainUser._id
    )
  }

  const GoToLink = link => {
    history.push(link)
  }

  const GoTo = () => {
    GetUSerPageData(
      item.mainUser._id,
      item.mainUser.ProfilePic.picture,
      item.mainUser.name,
      item.mainUser.sesso
    )
    if (item.mainUser._id === id) {
      GoToLink(`/MyPage`)
    } else {
      GoToLink(`/${item.mainUser.name}`)
    }
  }
  const picture = {
    picture: item.mainUser.ProfilePic.picture
  }
  return (
    <div key={item._id} className='Searched_page'>
      <span className='Searched_page_info' >
        <ProfilePicture
          ProfilePic={picture}
          sesso={item.mainUser.sesso}
          User_Name={item.mainUser.name}
          Size={'Medium'}
          onClick={GoTo}
        />
        <div>
          <h6>{item.mainUser.name}</h6>
          <h6>{item.mainUser.Bio}</h6>
          <h6>{item.mainUser.Sentimentale}</h6>
          <h6>{item.mainUser.BirthDate}</h6>
          <h6 className='Searched_page_button' onClick={() => acceptReq()}>
            Accept request
          </h6>
          <h6
            className='Searched_page_button'
            onClick={() => deleteFollowersAwaiting(item._id, item.mainUser._id)}
          >
            Delete request
          </h6>
        </div>
      </span>
    </div>
  )
}

export default AwaitingMapFollowers
