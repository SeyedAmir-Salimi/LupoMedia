import React from 'react'
import NavBar from './NavBar'
import Postpage from './Postpage'
import PostInput from './PostInput'
import UpUp from './UpUp'
const Home = () => {
  return (
    <div className='homepage'>
      <NavBar />
      <PostInput />
      <Postpage />
      <UpUp/>
    </div>
  )
}

export default Home
