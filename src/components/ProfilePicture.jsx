import React from 'react'
import PM from '../Images/man.jpg'
import PW from '../Images/woman.jpg'
const ProfilePicture = ({ ProfilePic, User_Name, Size, onClick, sesso }) => {
  const classname =
    Size === 'Medium'
      ? 'ProfImage'
      : Size === 'Big'
      ? 'profile_pic'
      : 'postpage_Comment_detail_image'

  return (
    <>
      {ProfilePic?.picture === undefined && sesso === 'Man' ? (
        <img src={PM} alt={User_Name} className={classname} onClick={onClick} />
      ) : (
        ''
      )}
      {ProfilePic?.picture === undefined && sesso === 'Woman' ? (
        <img src={PW} alt={User_Name} className={classname} onClick={onClick} />
      ) : (
        ''
      )}
      {ProfilePic?.picture !== undefined ? (
        <img
          src={ProfilePic.picture}
          alt={User_Name}
          className={classname}
          onClick={onClick}
        />
      ) : (
        ''
      )}
    </>
  )
}

export default ProfilePicture
