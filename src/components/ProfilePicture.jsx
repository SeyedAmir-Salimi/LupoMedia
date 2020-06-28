import React, { useContext } from 'react';
import { SocialMediaContext } from './Context';
import PM from '../Images/man.jpg';
import PW from '../Images/woman.jpg';

const ProfilePicture = ({ProfilePic, User_Name , Size , onClick }) => {
	const { datiPersonali} = useContext(SocialMediaContext);
	const classname = Size === "Medium" ? "ProfImage" : Size === "Big" ? "profile_pic" : "postpage_Comment_detail_image";
	return (
		<>
			{ProfilePic === undefined && datiPersonali.sesso === 'Man' ? (
				<img src={PM} alt={User_Name} className={classname} onClick={onClick}/>
			) : (
				''
			)}
			{ProfilePic === undefined && datiPersonali.sesso === 'Woman' ? (
				<img src={PW} alt={User_Name} className={classname} onClick={onClick}/>
			) : (
				''
			)}
			{ProfilePic !== undefined ? (
				<img src={ProfilePic} alt={User_Name} className={classname} onClick={onClick}/>
			) : (
				''
			)}
		</>
	);
};

export default ProfilePicture;
