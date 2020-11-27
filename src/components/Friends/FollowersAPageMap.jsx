import React, { useContext, useState, useEffect, useCallback} from 'react';
import { SocialMediaContext } from '../Context';
import ProfilePicture from '../ProfilePicture';
import { useHistory} from 'react-router-dom';

const FollowersAPageMap = ({ item }) => {
	const [ ExistFollowing, setExistFollowing ] = useState('');
	const [ ExistFollowingAwaiting, setExistFollowingAwaiting ] = useState('');
	const {
		id,
		deleteFollowersCall,
		SendFriendRequestCall,
		IdFollowingChek,
		IdAwaitingingChekFollowing,
		GetUSerPageData
	} = useContext(SocialMediaContext);
	let history = useHistory();

	const FollowingChekID = useCallback(() => {
		IdFollowingChek(item.mainUser._id);
		if (IdFollowingChek(item.mainUser._id)) {
			setExistFollowing(true);
		}
	},[IdFollowingChek, item.mainUser._id])

	const AwaitingingChekID = useCallback(() => {
		IdAwaitingingChekFollowing(item.mainUser._id);
		if (IdAwaitingingChekFollowing(item.mainUser._id)) {
			setExistFollowingAwaiting(true);
		}
	},[IdAwaitingingChekFollowing, item.mainUser._id])

	useEffect(() => {
		FollowingChekID();
		AwaitingingChekID();
	}, [AwaitingingChekID, FollowingChekID]);
	
	const SendFollowingReq = () => {
		SendFriendRequestCall(
			item.mainUser._id,
			item.mainUser.name,
			item.mainUser.ProfilePic,
			item.mainUser.Bio,
			item.mainUser.Sentimentale,
			item.mainUser.BirthDate
		);
		setExistFollowing(true);
		setExistFollowingAwaiting(true);
	};

	
	const GoToLink = (link) => {

		history.push(link);
	};
	
	const GoTo = () =>{
		GetUSerPageData(item.mainUser._id , item.mainUser.ProfilePic.picture , item.mainUser.name, item.mainUser.sesso)
		if(item.mainUser._id === id ){
			GoToLink(`/MyPage`)
		}
		else{
			GoToLink(`/${item.name}`)
		}
	}
	const picture = {
		picture: item.mainUser.ProfilePic.picture
	  }
	return (
		<div key={item._id} className="Searched_page">
			<span className="Searched_page_info">
				<ProfilePicture ProfilePic={picture} Size={'Medium'} onClick={GoTo} sesso={item.mainUser.sesso}/>
				<div>
					<h4>{item.mainUser.name}</h4>
					<h4>{item.mainUser.Bio}</h4>
					<h4>{item.mainUser.Sentimentale}</h4>
					<h4>{item.mainUser.BirthDate}</h4>
				</div>
			</span>
			<span className="Searched_page_button">
				<p onClick={() => deleteFollowersCall(item._id, item.mainUser._id)}>Remove From Follower</p>

				{ExistFollowing === true ? (
					''
				) : ExistFollowingAwaiting === true ? (
					''
				) : (
					<p onClick={() => SendFollowingReq()}>Send Following Request</p>
				)}
			</span>
		</div>
	);
};

export default FollowersAPageMap;
