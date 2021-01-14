import React, { useContext, useState} from 'react'
import { SocialMediaContext } from './Context'
import PostPageMap from './PostPageMap'
import NavBar from './NavBar'
import CoverMy from './CoverMy'
import Spinner from './Spinner'
import UpUp from './UpUp'
const MyPage = () => {
  const [showPanel, setShowPanel] = useState('posts')
  const { posts, id } = useContext(SocialMediaContext)

  const MyPost = posts
    .filter(item => item.user._id === id && !item.goalAchievementDate)
    .map(item => {
      return <PostPageMap key={item._id} item={item} />
	})
  const MyGoals = posts
    .filter(item => item.user._id === id && item.goalAchievementDate)
    .map(item => {
      return <PostPageMap key={item._id} item={item} />
	})

  const selectPostsClass = showPanel === 'posts' ? 'borderbottom' : ''
  const selectGoalssClass = showPanel === 'goals' ? 'borderbottom' : ''
  const changeShowPanel = (param)=>{
	setShowPanel(param)
  }
  return (
    <div>
      <NavBar />
      <CoverMy />
      {posts.length === 0 && <Spinner />}
      <div className='myPage-PostsGoals'>
        <h6>
          <span className={selectPostsClass} onClick={()=> changeShowPanel("posts")}>Posts</span>
          <span> / </span>
          <span className={selectGoalssClass} onClick={()=> changeShowPanel("goals")} >Goals</span>
        </h6>
      </div>
      {showPanel === 'posts' && MyPost}
      {showPanel === 'goals' && MyGoals}
	  <UpUp/>
    </div>
  )
}

export default MyPage
