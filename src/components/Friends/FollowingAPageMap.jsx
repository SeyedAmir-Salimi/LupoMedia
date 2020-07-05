import React, { useContext } from 'react';
import { SocialMediaContext } from '../Context';
import { FcNeutralDecision, FcApprove, FcDecision, FcDisapprove } from 'react-icons/fc';
import ProfilePicture from '../ProfilePicture';

const FollowingAPageMap = ({ item }) => {
	const { deleteFollowingAccepted, User_Name, id, SendFriendRequestCall , respondFriendRequestCall } = useContext(SocialMediaContext);


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
                    <p onClick={() => deleteFollowingAccepted(item._id , item.secondUser._id )} >Remove From List</p>
					{/* <FcNeutralDecision onClick={() => SendFriendRequestCall(item._id)} />
					<FcDecision />
					<FcDisapprove onClick={() => deleteFriendRequesttCall(item._id)}/>
					<FcApprove  onClick={() => respondFriendRequestCall(item._id)} /> */}
				</span>
		</div>
	);
};

export default FollowingAPageMap;