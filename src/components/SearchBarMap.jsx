import React, { useContext } from 'react'
import { SocialMediaContext } from './Context'
import ProfilePicture from './ProfilePicture'
import { useHistory } from 'react-router-dom'
function SearchBarMap ({ item }) {
  const {
    id,
    SendFriendRequestCall,
    IdFollowingChek,
    IdAwaitingingChekFollowing,
    GetUSerPageData
  } = useContext(SocialMediaContext)
  let history = useHistory()

  const ExistFollowing = IdFollowingChek(item._id)
  const ExistFollowingAwaiting = IdAwaitingingChekFollowing(item._id)

  const GoToLink = link => {
    history.push(link)
  }

  const GoTo = () => {
    GetUSerPageData(item._id, item.picture.picture, item.name, item.sesso)
    if (item._id === id) {
      GoToLink(`/MyPage`)
    } else {
      GoToLink(`/${item.name}`)
    }
  }
  //   const picture = {
  //     picture: item.picture.picture
  //   }
  const SendFOllowingRequest = () => {
    SendFriendRequestCall(
      item._id,
      item.name,
      item.picture,
      item.Bio,
      item.Sentimentale,
      item.BirthDate
    )
  }
  return (
    <div className='NotificationMap'>
      <div className='NotificationMap-ProfilePic'>
        <ProfilePicture
          ProfilePic={item.picture}
          User_Name={item.name}
          Size={'Small'}
          sesso={item.sesso}
          onClick={() => GoTo()}
        />
      </div>
      <div className='NotificationMap-texts'  onClick={() => GoTo()}>
        <h5>{item.name}</h5>
        <h5>{item.BirthDate}</h5>
        <h5>{item.Bio}</h5>
      </div>
      {item._id !== id && (
        <span className='Searched_page_status'>
          {ExistFollowing && <h6>Allready followig</h6>}
          {ExistFollowingAwaiting && <h6>Awaiting for response</h6>}
          {!ExistFollowing && !ExistFollowingAwaiting && (
            <h6 onClick={() => SendFOllowingRequest()}>
              Send Following Request
            </h6>
          )}
        </span>
      )}
    </div>
  )
}

export default SearchBarMap
