import React, { useContext, useState, useEffect } from 'react';
import { SocialMediaContext } from './Context';
import ProfilePicture from './ProfilePicture';
import { BrowserRouter as Router, Switch, Route, Link , useHistory} from 'react-router-dom';

const SearchedPageMap = ({ item }) => {
	const [ ExistFollowing, setExistFollowing ] = useState('');
	const [ ExistFollowingAwaiting, setExistFollowingAwaiting ] = useState('');
	const {
		id,
		SendFriendRequestCall,
		IdFollowingChek,
		IdAwaitingingChekFollowing,
		GetUSerPageData,
		ridirectFunction
	} = useContext(SocialMediaContext);
	let history = useHistory();

	useEffect(() => {
		FollowingChekID();
		AwaitingingChekID();
	}, []);


	const FollowingChekID = () => {
		if(IdFollowingChek(item._id)){
			setExistFollowing(true)
		}
	};

	const AwaitingingChekID = () => {
		if(IdAwaitingingChekFollowing(item._id)){
			setExistFollowingAwaiting(true)
		}
	};
	const SendFOllowingRequest = ()=>{
		SendFriendRequestCall(item._id,item.name,item.picture, item.Bio , item.Sentimentale ,item.BirthDate );
		setExistFollowingAwaiting(true);
	}


	const GoToLink = (link) => {
		history.push(link);
		console.log(history.location.pathname);
	};
	

	const GoTo = () =>{
		GetUSerPageData(item._id , item.picture , item.name)
		if(item._id === id ){
			GoToLink(`/MyPage`)
		}
		else{
			GoToLink(`/${item.name}`)
		}
	}
	return (
		<div key={item._id} className="Searched_page">
			<span className="Searched_page_info">
				<ProfilePicture ProfilePic={item.picture} Size={'Medium'} onClick={GoTo} />
				<div>
					<h4>{item.name}</h4>
					<h4>{item.Bio}</h4>
					<h4>{item.Sentimentale}</h4>
					<h4>{item.BirthDate}</h4>
				</div>
			</span>
			{item._id !== id ? (
				<span className="Searched_page_button">
					{ExistFollowing === true ? (
						'Allready followig'
					) : ExistFollowingAwaiting === true ? (
						'Awaiting for response'
					) : (
						<p onClick={() => SendFOllowingRequest()}>Send Following Request</p>
					)}
				</span>
			) : (
				''
			)}
		</div>
	);
};

export default SearchedPageMap;
