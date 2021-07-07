import React, { useContext } from 'react'
import { SocialMediaContext } from './Context'
import SearchBarMap from './SearchBarMap'
import { useHistory } from 'react-router-dom'
function SearchedPageBar ({closeBar}) {
  const { userSearched } = useContext(SocialMediaContext)
  let history = useHistory()

  let filterdSearchedRender
  const filterSearchedLength = []
  if (userSearched.length > 1) {
    for (let i = 0; i < 2; i++) {
      const item = userSearched[i]
      filterSearchedLength.push(item)
    }
  } else {
    for (let i = 0; i < userSearched.length; i++) {
      const item = userSearched[i]
      filterSearchedLength.push(item)
    }
  }

  filterdSearchedRender = filterSearchedLength.map(item => {
    return <SearchBarMap key={item._id} item={item} />
  })
  
  const GoTo = () => {
    history.push('/search')
    closeBar()
  }

  return (
    <div className='Notifications' id='style-3'>
      {filterSearchedLength.length === 0 &&
        <h6>User not found</h6>
      }
      {filterdSearchedRender}
      {filterSearchedLength.length > 1 && (
        <div className='SearchBar-clickToSee'>
          <h6 onClick={() => GoTo()}>Click to see more...</h6>
        </div>
      )}
    </div>
  )
}

export default SearchedPageBar
