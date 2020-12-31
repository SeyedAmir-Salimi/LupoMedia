import React, { useContext } from 'react'
import { SocialMediaContext } from './Context'
import PostPageMap from './PostPageMap'
import Spinner from './Spinner'
// import { IoIosArrowDropupCircle } from 'react-icons/io'

const Postpage = () => {
  // const [upArrow, setUpArrow] = useState(false)
  const { posts, setshowNotificationsMenu } = useContext(SocialMediaContext)
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
  // function inventoryList(input) {
  //   const collection = []
  //   input.forEach(element => {
  //     const splitItem = element.trim().split(' ')
  //     if(splitItem.length >1){
  //       if(splitItem[0] !== "add" || splitItem[0] !== "remove"){
  //         collection.push(splitItem[1])
  //       }
  //     }else{
  //       collection.push(element)
  //     }
  //   });
  //   function setUniqArray (params) {
  //     return [...new Set(params)]
  //   }
  //   const uniq =  setUniqArray(collection)
  //   return uniq
  // }
  return (
    <article onClick={() => setshowNotificationsMenu(false)}>
      {posts.length === 0 && <Spinner />}
      {/* <IoIosArrowDropupCircle
        className={upArrow ? 'upArrow-show hvr-pulse' : 'upArrow-hide'}
        onClick={() => scrollTop()}
      /> */}
      {Post}
    </article>
  )
}

export default Postpage
