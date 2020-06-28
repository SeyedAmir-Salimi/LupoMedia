import React, { useContext } from 'react';
import { SocialMediaContext } from './Context';
import PM from '../Images/man.jpg';
import PW from '../Images/woman.jpg';
import { FcNeutralDecision, FcApprove, FcDecision, FcDisapprove } from 'react-icons/fc';
import ProfilePicture from './ProfilePicture';

const SearchedPageMap = ({ item }) => {
	const { deleteFriendRequesttCall, User_Name, id, SendFriendRequestCall , respondFriendRequestCall } = useContext(SocialMediaContext);


	return (
		<div key={item._id} className="Searched_page">
			<span className="Searched_page_info">
				<ProfilePicture ProfilePic={item.picture} User_Name={User_Name} Size={'Medium'} />
				<div>
					<h4>{item.name}</h4>
					<h4>{item.Bio}</h4>
					<h4>{item.Sentimentale}</h4>
					<h4>{item.BirthDate}</h4>
				</div>
			</span>
			{item._id !== id ? (
				<span className="Searched_page_button">
					<FcNeutralDecision onClick={() => SendFriendRequestCall(item._id)} />
					<FcDecision />
					<FcDisapprove onClick={() => deleteFriendRequesttCall(item._id)}/>
					<FcApprove  onClick={() => respondFriendRequestCall(item._id)} />
				</span>
			) : (
				''
			)}
		</div>
	);
};

export default SearchedPageMap;
