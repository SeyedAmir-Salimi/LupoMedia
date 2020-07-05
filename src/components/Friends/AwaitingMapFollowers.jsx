import React, { useContext } from 'react';
import { SocialMediaContext } from '../Context';
import { FcNeutralDecision, FcApprove, FcDecision, FcDisapprove } from 'react-icons/fc';
import ProfilePicture from '../ProfilePicture';

const AwaitingMapFollowers = ({ item }) => {
	const { deleteFollowersAwaiting, User_Name, id, SendFriendRequestCall, respondFriendRequestCall } = useContext(
		SocialMediaContext
	);

	const AcceptReq = () => {
		respondFriendRequestCall(
			item._id,
			item.mainUser.name,
			item.mainUser.ProfilePic,
			item.mainUser.Bio,
			item.mainUser.Sentimentale,
			item.mainUser.BirthDate,
			item.mainUser._id
		);
	};

	return (
		<div key={item._id} className="Searched_page">
			<span className="Searched_page_info">
				<ProfilePicture ProfilePic={item.mainUser.ProfilePic} Size={'Medium'} />
				<div>
					<h4>{item.mainUser.name}</h4>
					<h4>{item.mainUser.Bio}</h4>
					<h4>{item.mainUser.Sentimentale}</h4>
					<h4>{item.mainUser.BirthDate}</h4>
				</div>
			</span>
			<span className="Searched_page_button">
				<p onClick={() => AcceptReq()}>Accept Request</p>
				<p onClick={() => deleteFollowersAwaiting(item._id, item.mainUser._id)}>Delet Request</p>
			</span>
		</div>
	);
};

export default AwaitingMapFollowers;
