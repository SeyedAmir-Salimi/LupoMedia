import React, { useContext } from 'react'
import { SocialMediaContext } from './Context'
import PostPageMap from './PostPageMap'
// import { IoIosArrowDropupCircle } from 'react-icons/io'

const Postpage = () => {
  // const [upArrow, setUpArrow] = useState(false)
  const { posts } = useContext(SocialMediaContext)
  let Post = posts.map(item => {
    return <PostPageMap key={item._id} item={item} />
  })

  // const setUpIcon = () => {
  //   if (window.scrollY > 200) {
  //     setUpArrow(true)
  //   } else {
  //     setUpArrow(false)
  //   }
  // }

  // useEffect(() => {
  //   window.addEventListener('scroll', setUpIcon)
  // }, [])


  // const scrollTop = () => {
  //   window.scrollTo({
  //     top: 0,
  //     behavior: 'smooth'
  //   })
  // }
  return (
    <article>
      {/* <IoIosArrowDropupCircle
        className={upArrow ? 'upArrow-show hvr-pulse' : 'upArrow-hide'}
        onClick={() => scrollTop()}
      /> */}
      {Post}
    </article>
  )
}

export default Postpage
