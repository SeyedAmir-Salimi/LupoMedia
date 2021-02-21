import React, { useContext, useState } from 'react'
import { SocialMediaContext } from './Context'
import PostPageMap from './PostPageMap'
import NavBar from './NavBar'
import Cover from './Cover'
import Spinner from './Spinner'
import UpUp from './UpUp'
const UserPage = () => {
  const [showPanel, setShowPanel] = useState('posts')
  const { posts, UserPageData, Loadspinner} = useContext(SocialMediaContext)
  const postsMap = posts
    .filter(item => item.user._id === UserPageData._id && !item.goalAchievementDate)
    .map(item => {
      return <PostPageMap key={item._id} item={item} />
    })
  const goalsMap = posts
    .filter(item => item.user._id === UserPageData._id && item.goalAchievementDate)
    .map(item => {
      return <PostPageMap key={item._id} item={item} />
    })

  const selectPostsClass = showPanel === 'posts' ? 'borderbottom' : ''
  const selectGoalssClass = showPanel === 'goals' ? 'borderbottom' : ''
  const changeShowPanel = param => {
    setShowPanel(param)
  }
  return (
    <div>
      <NavBar />
      <Cover />
      {Loadspinner && <Spinner />}
      <div className='myPage-PostsGoals'>
        <h6>
          <span
            className={selectPostsClass}
            onClick={() => changeShowPanel('posts')}
          >
            Posts
          </span>
          <span> / </span>
          <span
            className={selectGoalssClass}
            onClick={() => changeShowPanel('goals')}
          >
            Goals
          </span>
        </h6>
      </div>
	  {showPanel === 'posts' && postsMap}
      {showPanel === 'goals' && goalsMap}
	  <UpUp/>
    </div>
  )
}

export default UserPage
