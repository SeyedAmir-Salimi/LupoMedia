import React from 'react'

function Emojies ({ likeType, onClick, emojiSize}) {
  return (
    <div className='FcLike-emojie' onClick={onClick} style={{fontSize: emojiSize}}>
      {likeType === 'laugh' && (
        <span role='img' aria-label='laugh'>
          😂
        </span>
      )}
      {likeType === 'tongue' && (
        <span role='img' aria-label='tongue'>
          😜
        </span>
      )}

      {likeType === 'love' && (
        <span role='img' aria-label='love'>
          😍
        </span>
      )}

      {likeType === 'kiss' && (
        <span role='img' aria-label='kiss'>
          😘
        </span>
      )}

      {likeType === 'oh' && (
        <span role='img' aria-label='oh'>
          😰
        </span>
      )}

      {likeType === 'cry' && (
        <span role='img' aria-label='cry'>
          😭
        </span>
      )}

      {likeType === 'angry' && (
        <span role='img' aria-label='angry'>
          😡
        </span>
      )}

      {likeType === 'poop' && (
        <span role='img' aria-label='poop'>
          💩
        </span>
      )}
    </div>
  )
}

export default Emojies
