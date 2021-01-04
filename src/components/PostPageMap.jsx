import React, { useContext } from 'react'
import { SocialMediaContext } from './Context'
import PostPageMapPOST from './PostPageMapPOST'
import PostPageMapGOAL from './PostPageMapGOAL'
const PostPageMap = ({ item }) => {
  const { setshowNotificationsMenu, setshowSearchMenu} = useContext(SocialMediaContext)
  const setMenusFalse = () =>{
    setshowNotificationsMenu(false)
    setshowSearchMenu(false)
  }
  return (
    <div onClick={() => setMenusFalse()}>
      {item.goalAchievementDate ? (
        <PostPageMapGOAL item={item} />
      ) : (
        <PostPageMapPOST item={item} />
      )}
    </div>
  )
}

export default PostPageMap
