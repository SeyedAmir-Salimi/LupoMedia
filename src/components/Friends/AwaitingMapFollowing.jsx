import React, { useContext } from 'react';
import { SocialMediaContext } from '../Context';
import { FcNeutralDecision, FcApprove, FcDecision, FcDisapprove } from 'react-icons/fc';
import ProfilePicture from '../ProfilePicture';

const AwaitingMapFollowing = ({ item }) => {
	const { deleteFollowingAwaiting, User_Name, id, SendFriendRequestCall , respondFriendRequestCall } = useContext(SocialMediaContext);


	return (
		<div key={item._id} className="Searched_page">
			<span className="Searched_page_info">
				<ProfilePicture ProfilePic={item.secondUser.ProfilePic} Size={'Medium'} />
				<div>
					<h4>{item.secondUser.name}</h4>
					<h4>{item.secondUser.Bio}</h4>
					<h4>{item.secondUser.Sentimentale}</h4>
					<h4>{item.secondUser.BirthDate}</h4>
				</div>
			</span>
				<span className="Searched_page_button">
                    <p onClick={() => deleteFollowingAwaiting(item._id , item.secondUser._id )} >Cancel request</p>
				</span>
		</div>
	);
};

export default AwaitingMapFollowing;