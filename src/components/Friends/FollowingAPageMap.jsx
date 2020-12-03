import React, { useContext } from 'react'
import { SocialMediaContext } from '../Context'
import ProfilePicture from '../ProfilePicture'
import { useHistory } from 'react-router-dom'

const FollowingAPageMap = ({ item }) => {
  const { deleteFollowingAccepted, id, GetUSerPageData } = useContext(
    SocialMediaContext
  )
  let history = useHistory()

  const GoToLink = link => {
    history.push(link)
  }

  const GoTo = () => {
    GetUSerPageData(
      item.secondUser._id,
      item.secondUser.ProfilePic.picture,
      item.secondUser.name,
      item.secondUser.sesso
    )
    if (item.secondUser._id === id) {
      GoToLink(`/MyPage`)
    } else {
      GoToLink(`/${item.secondUser.name}`)
    }
  }
  const picture = {
    picture: item.secondUser.ProfilePic.picture
  }
  return (
    <div key={item._id} className='Searched_page'>
      <span className='Searched_page_info'>
        <ProfilePicture
          ProfilePic={picture}
          Size={'Medium'}
          onClick={GoTo}
          sesso={item.secondUser.sesso}
        />
        <div>
          <h6>{item.secondUser.name}</h6>
          <h6>{item.secondUser.Bio}</h6>
          <h6>{item.secondUser.Sentimentale}</h6>
          <h6>{item.secondUser.BirthDate}</h6>
          <h6 className='Searched_page_button'
            onClick={() =>
              deleteFollowingAccepted(item._id, item.secondUser._id)
            }
          >
            Remove From List
          </h6>
        </div>
      </span>
    </div>
  )
}

export default FollowingAPageMap
