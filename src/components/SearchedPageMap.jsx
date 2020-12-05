import React, { useContext, useState, useEffect, useCallback } from 'react'
import { SocialMediaContext } from './Context'
import ProfilePicture from './ProfilePicture'
import { useHistory } from 'react-router-dom'
const SearchedPageMap = ({ item }) => {
  const [ExistFollowing, setExistFollowing] = useState('')
  const [ExistFollowingAwaiting, setExistFollowingAwaiting] = useState('')
  const {
    id,
    SendFriendRequestCall,
    IdFollowingChek,
    IdAwaitingingChekFollowing,
    GetUSerPageData
  } = useContext(SocialMediaContext)
  let history = useHistory()

  const FollowingChekID = useCallback(() => {
    if (IdFollowingChek(item._id)) {
      setExistFollowing(true)
    }
  }, [IdFollowingChek, item._id])

  const AwaitingingChekID = useCallback(() => {
    if (IdAwaitingingChekFollowing(item._id)) {
      setExistFollowingAwaiting(true)
    }
  }, [IdAwaitingingChekFollowing, item._id])

  useEffect(() => {
    FollowingChekID()
    AwaitingingChekID()
  }, [AwaitingingChekID, FollowingChekID])

  const SendFOllowingRequest = () => {
    SendFriendRequestCall(
      item._id,
      item.name,
      item.picture,
      item.Bio,
      item.Sentimentale,
      item.BirthDate
    )
    setExistFollowingAwaiting(true)
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
              {ExistFollowing === true ? (
                <h6>Allready followig</h6>
              ) : ExistFollowingAwaiting === true ? (
                <h6>Awaiting for response</h6>
              ) : (
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
