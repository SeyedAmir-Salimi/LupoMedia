import React, { useEffect, useRef } from 'react'
import { AiFillCloseCircle } from 'react-icons/ai'
const ImagePopup = ({ item, onKey }) => {
  useEffect(() => {
    imagePop.current.focus()
  }, [])
  const imagePop = useRef(null)

  return (
    <div
      className='imagePopupDiv'
      onKeyDown={onKey}
      tabIndex={0}
      ref={imagePop}
      id='style-3'
    >
      <div>
        <div>
          <p className='imagePopup-closeButton hvr-buzz-out' onClick={onKey}>
            <AiFillCloseCircle />
          </p>
          <img
            src={item.media.media}
            alt={item.caption}
            className='popUpImage'
          />
        </div>
      </div>
    </div>
  )
}

export default ImagePopup
