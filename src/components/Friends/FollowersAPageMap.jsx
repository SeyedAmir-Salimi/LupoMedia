import React, { useContext, useState } from 'react'
import { SocialMediaContext } from '../Context'
import ProfilePicture from '../ProfilePicture'
import { useHistory } from 'react-router-dom'
import AlertRemove from '../AlertRemove'
const FollowersAPageMap = ({ item }) => {
  const [showRemoveAlert, setshowRemoveAlert] = useState(false)
  const {
    id,
    deleteFollowersCall,
    GetUSerPageData
  } = useContext(SocialMediaContext)
  let history = useHistory()


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
  const removeFriend = () => {
    deleteFollowersCall(item._id, item.mainUser._id)
    setshowRemoveAlert(false)
  }

  return (
    <div key={item._id} className='Searched_page'>
      <span className='Searched_page_info'>
        <ProfilePicture
          ProfilePic={picture}
          Size={'Medium'}
          onClick={GoTo}
          sesso={item.mainUser.sesso}
        />
        <div>
          <h6>{item.mainUser.name}</h6>
          <h6>{item.mainUser.Bio}</h6>
          <h6>{item.mainUser.Sentimentale}</h6>
          <h6>{item.mainUser.BirthDate}</h6>
          <h6
            className='Searched_page_button'
            onClick={() => setshowRemoveAlert(true)}
          >
            Remove From Follower
          </h6>
        </div>
      {showRemoveAlert && (
        <AlertRemove
          displayText={`Are your sure you want to remove ${item.mainUser.name}?`}
          yes={() => removeFriend()}
          no={() => setshowRemoveAlert(false)}
        />
      )}
      </span>
    </div>
  )
}

export default FollowersAPageMap
