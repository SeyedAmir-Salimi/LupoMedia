import React, { useContext } from 'react';
import { SocialMediaContext } from '../Context';

import NavBar from '../NavBar';
import AwaitingMapFollowers from './AwaitingMapFollowers';
import AwaitingMapFollowing from './AwaitingMapFollowing';

const AwaitaningList = () => {
	const { FollowersAwaiting, FollowingAwaiting, numberOfFollwingawaiting, numberOfFollwersAwaiting, setshowNotificationsMenu} = useContext(
		SocialMediaContext
	);

	let FollowersAw = FollowersAwaiting.map((item) => {
		return <AwaitingMapFollowers key={item._id} item={item} />;
	});

	let FollowingAw = FollowingAwaiting.map((item) => {
		return <AwaitingMapFollowing key={item._id} item={item} />;
	});

	return (
		<div>
			<NavBar />
			<div className="AwaitiningList-Component" onClick={()=> setshowNotificationsMenu(false)}>
				{numberOfFollwersAwaiting !== 0 ? (
					<span>
						<h6>Followers Request Awaitating {numberOfFollwersAwaiting}</h6>
						{FollowersAw}
					</span>
				) : (
					''
				)}
				{numberOfFollwingawaiting !== 0 ? (
					<span>
						<h6>Following Request Awaitating {numberOfFollwingawaiting}</h6>
						{FollowingAw}
					</span>
				) : (
					''
				)}
			</div>
		</div>
	);
};

export default AwaitaningList;
