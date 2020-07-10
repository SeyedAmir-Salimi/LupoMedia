import React, { useContext, useState, useEffect } from 'react';
import { SocialMediaContext } from '../Context';
import { FcNeutralDecision, FcApprove, FcDecision, FcDisapprove } from 'react-icons/fc';
import ProfilePicture from '../ProfilePicture';
import { BrowserRouter as Router, Switch, Route, Link , useHistory} from 'react-router-dom';

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

	useEffect(() => {
		FollowingChekID();
		AwaitingingChekID();
	}, []);

	const FollowingChekID = () => {
		IdFollowingChek(item.mainUser._id);
		if (IdFollowingChek(item.mainUser._id)) {
			setExistFollowing(true);
		}
	};

	const AwaitingingChekID = () => {
		IdAwaitingingChekFollowing(item.mainUser._id);
		if (IdAwaitingingChekFollowing(item.mainUser._id)) {
			setExistFollowingAwaiting(true);
		}
	};

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
