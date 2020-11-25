import React, { useContext } from 'react';
import { SocialMediaContext } from '../Context';
import ProfilePicture from '../ProfilePicture';
import { useHistory} from 'react-router-dom';

const AwaitingMapFollowers = ({ item }) => {
	const { deleteFollowersAwaiting, id, respondFriendRequestCall,GetUSerPageData } = useContext(
		SocialMediaContext
	);
	let history = useHistory();
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

	const GoToLink = (link) => {
		history.push(link);
		console.log(history.location.pathname);
	};
	

	const GoTo = () =>{
		GetUSerPageData(item.mainUser._id , item.mainUser.ProfilePic , item.mainUser.name)
		if(item.mainUser._id === id ){
			GoToLink(`/MyPage`)
		}
		else{
			GoToLink(`/${item.name}`)
		}
	}

	return (
		<div key={item._id} className="Searched_page">
			<span className="Searched_page_info">
				<ProfilePicture ProfilePic={item.mainUser.ProfilePic} Size={'Medium'} onClick={GoTo}/>
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
