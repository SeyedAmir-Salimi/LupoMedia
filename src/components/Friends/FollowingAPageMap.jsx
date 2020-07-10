import React, { useContext } from 'react';
import { SocialMediaContext } from '../Context';
import { FcNeutralDecision, FcApprove, FcDecision, FcDisapprove } from 'react-icons/fc';
import ProfilePicture from '../ProfilePicture';
import { BrowserRouter as Router, Switch, Route, Link , useHistory} from 'react-router-dom';


const FollowingAPageMap = ({ item }) => {
	const { deleteFollowingAccepted, User_Name, id, SendFriendRequestCall , respondFriendRequestCall ,GetUSerPageData} = useContext(SocialMediaContext);
	let history = useHistory();

	
	const GoToLink = (link) => {

		history.push(link);
		console.log(history.location.pathname);
	};
	

	const GoTo = () =>{
		GetUSerPageData(item.secondUser._id , item.secondUser.ProfilePic , item.secondUser.name)
		if(item.secondUser._id === id ){
			GoToLink(`/MyPage`)
		}
		else{
			GoToLink(`/${item.name}`)
		}
	}

	return (
		<div key={item._id} className="Searched_page">
			<span className="Searched_page_info">
				<ProfilePicture ProfilePic={item.secondUser.ProfilePic} Size={'Medium'} onClick={GoTo}/>
				<div>
					<h4>{item.secondUser.name}</h4>
					<h4>{item.secondUser.Bio}</h4>
					<h4>{item.secondUser.Sentimentale}</h4>
					<h4>{item.secondUser.BirthDate}</h4>
				</div>
			</span>
				<span className="Searched_page_button">
                    <p onClick={() => deleteFollowingAccepted(item._id , item.secondUser._id )} >Remove From List</p>

				</span>
		</div>
	);
};

export default FollowingAPageMap;