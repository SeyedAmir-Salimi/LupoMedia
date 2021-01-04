import React from 'react'
import { Overlay, Popover } from 'react-bootstrap'
function EmojiesOveraly ({
  targetEmojies,
  showLikeEmojis,
  setShowLikeEmojis,
  makeLike
}) {
  return (
    <div>
      <Overlay
        target={targetEmojies.current}
        show={showLikeEmojis}
        placement='bottom'
      >
        <Popover className='popover-basic'>
          <div
            className='emojis'
            onMouseEnter={() => setShowLikeEmojis(true)}
            onMouseLeave={() => setShowLikeEmojis(false)}
          >
            <span
              role='img'
              aria-label='laugh'
              onClick={() => makeLike('laugh')}
            >
              😂
            </span>
            <span
              role='img'
              aria-label='tongue'
              onClick={() => makeLike('tongue')}
            >
              😜
            </span>
            <span role='img' aria-label='love' onClick={() => makeLike('love')}>
              😍
            </span>
            <span role='img' aria-label='kiss' onClick={() => makeLike('kiss')}>
              😘
            </span>
            <span role='img' aria-label='oh' onClick={() => makeLike('oh')}>
              😰
            </span>
            <span role='img' aria-label='cry' onClick={() => makeLike('cry')}>
              😭
            </span>
            <span
              role='img'
              aria-label='angry'
              onClick={() => makeLike('angry')}
            >
              😡
            </span>
            <span role='img' aria-label='poop' onClick={() => makeLike('poop')}>
              💩
            </span>
          </div>
        </Popover>
      </Overlay>
    </div>
  )
}

export default EmojiesOveraly
