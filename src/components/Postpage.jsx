import React, { useContext } from 'react'
import { SocialMediaContext } from './Context'
import PostPageMap from './PostPageMap'
import Spinner from './Spinner'

const Postpage = () => {
  const { posts, setshowNotificationsMenu, setshowSearchMenu, Loadspinner} = useContext(SocialMediaContext)
  let Post = posts.map(item => {
    return <PostPageMap key={item._id} item={item} />
  })
  
  const setMenusFalse = () =>{
    setshowNotificationsMenu(false)
    setshowSearchMenu(false)
  }

  return (
    <article onClick={() => setMenusFalse()}>
      {Loadspinner && <Spinner />}
      {Post}
    </article>
  )
}

export default Postpage
