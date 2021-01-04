import React, { useContext } from 'react'
import { SocialMediaContext } from './Context'
import ProfilePicture from './ProfilePicture'
import { useHistory } from 'react-router-dom'
const SearchedPageMap = ({ item }) => {
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
  const picture = {
    picture: item.picture.picture
  }

  return (
    <div key={item._id} className='Searched_page'>
      <span className='Searched_page_info'>
        <ProfilePicture
          ProfilePic={picture}
          Size={'Medium'}
          onClick={GoTo}
          sesso={item.sesso}
        />
        <div>
          <h6>{item.name}</h6>
          <h6>{item.Bio}</h6>
          <h6>{item.Sentimentale}</h6>
          <h6>{item.BirthDate}</h6>
          {item._id !== id && (
            <span className='Searched_page_button'>
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
      </span>
    </div>
  )
}

export default SearchedPageMap
