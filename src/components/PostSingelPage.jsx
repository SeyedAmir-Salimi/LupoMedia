import React, { useContext } from 'react'
import { SocialMediaContext } from './Context'
import NavBar from './NavBar'
import PostPageMap from './PostPageMap'
function PostSingelPage () {
  const { posts } = useContext(SocialMediaContext)
  const LINK = window.location.pathname
  const splitPath = LINK.split('/post/')
  const foundPost = posts.filter(x => x._id === splitPath[1])
  let Post = foundPost.map(item => {
    return <PostPageMap key={item._id} item={item} />
  })

  return (
    <div>
      <NavBar />
      {Post}
    </div>
  )
}

export default PostSingelPage
