import React from 'react'
import ScrollToTop from 'react-scroll-up'
import { FaArrowAltCircleUp } from 'react-icons/fa'

function UpUp () {
  return (
    <>
      <ScrollToTop showUnder={250}>
        <FaArrowAltCircleUp className='FaArrowAltCircleUp' />
      </ScrollToTop>
    </>
  )
}

export default UpUp
