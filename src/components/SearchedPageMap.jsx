import React, { useContext, useState, useEffect, useCallback} from 'react';
import { SocialMediaContext } from './Context';
import ProfilePicture from './ProfilePicture';
import { useHistory} from 'react-router-dom';
const SearchedPageMap = ({ item }) => {
	const [ ExistFollowing, setExistFollowing ] = useState('');
	const [ ExistFollowingAwaiting, setExistFollowingAwaiting ] = useState('');
	const {
		id,
		SendFriendRequestCall,
		IdFollowingChek,
		IdAwaitingingChekFollowing,
		GetUSerPageData,
	} = useContext(SocialMediaContext);
	let history = useHistory();



	const FollowingChekID = useCallback(() => {
		if(IdFollowingChek(item._id)){
			setExistFollowing(true)
		}
	},[IdFollowingChek, item._id])

	const AwaitingingChekID = useCallback(() => {
		if(IdAwaitingingChekFollowing(item._id)){
			setExistFollowingAwaiting(true)
		}
	},[IdAwaitingingChekFollowing, item._id])

	useEffect(() => {
		FollowingChekID();
		AwaitingingChekID();
	}, [AwaitingingChekID, FollowingChekID]);

	const SendFOllowingRequest = ()=>{
		SendFriendRequestCall(item._id,item.name,item.picture, item.Bio , item.Sentimentale ,item.BirthDate );
		setExistFollowingAwaiting(true);
	}


	const GoToLink = (link) => {
		history.push(link);
	};
	

	const GoTo = () =>{
		GetUSerPageData(item._id , item.picture.picture , item.name, item.sesso)
		if(item._id === id ){
			GoToLink(`/MyPage`)
		}
		else{
			GoToLink(`/${item.name}`)
		}
	}
	const picture = {
		picture: item.picture.picture
	}
	
	return (
		<div key={item._id} className="Searched_page">
			<span className="Searched_page_info" >
				<ProfilePicture ProfilePic={picture} Size={'Medium'} onClick={GoTo} sesso={item.sesso}/>
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
