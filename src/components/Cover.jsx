import React, { useState, useContext, useEffect, useRef } from 'react';
import { SocialMediaContext } from './Context';
import { BrowserRouter as Router, Switch, Route, Link, useHistory } from 'react-router-dom';
import DefaulCover from '../Images/Wallpaper.jpg';
import ProfilePicture from './ProfilePicture';

const Cover = () => {
	const [ ExistFollowing, setExistFollowing ] = useState('');
	const [ ExistFollowingAwaiting, setExistFollowingAwaiting ] = useState('');
	const { UserPageData, id, SendFriendRequestCall, IdFollowingChek, IdAwaitingingChekFollowing } = useContext(SocialMediaContext);

	let history = useHistory();
	const GoToLink = (link) => {
		history.push(link);
	};

	useEffect(() => {
		FollowingChekID();
		AwaitingingChekID();
	}, []);

	const FollowingChekID = () => {
		if (IdFollowingChek(UserPageData._id)) {
			setExistFollowing(true);
		}
	};

	const AwaitingingChekID = () => {
		if (IdAwaitingingChekFollowing(UserPageData._id)) {
			setExistFollowingAwaiting(true);
		}
	};
	const SendFOllowingRequest = () => {
		SendFriendRequestCall(UserPageData._id, UserPageData.User_Name, UserPageData.ProfilePic);
		setExistFollowingAwaiting(true);
	};

	return (
		<div>
			<div className="Cover-component">
				<img src={DefaulCover} alt="DefaulCover" className="Cover-DefaulCovert" />
				<div className="Cover-info">
					<ProfilePicture
						ProfilePic={UserPageData.ProfilePic}
						User_Name={UserPageData.User_Name}
						Size={'Big'}
					/>
					<div className="Cover-Texts">
						{/* <h4 className="hvr-pulse">Allready following</h4> */}
						{UserPageData._id !== id ? (
							<span className="hvr-pulse Cover-info-following">
								{ExistFollowing === true ? (
									'Allready followig'
								) : ExistFollowingAwaiting === true ? (
									'Awaiting for response'
								) : (
									<p  onClick={() => SendFOllowingRequest()}>Send Following Request</p>
								)}
							</span>
						) : (
							''
						)}
					</div>
				</div>
			</div>
			<span className="Cover-Name">
				<h1>{UserPageData.User_Name}</h1>
			</span>
		</div>
	);
};

export default Cover;
