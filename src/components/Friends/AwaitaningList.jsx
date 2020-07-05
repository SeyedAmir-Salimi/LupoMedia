import React, { useContext, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { SocialMediaContext } from '../Context';

import NavBar from '../NavBar';
import AwaitingMapFollowers from './AwaitingMapFollowers';
import AwaitingMapFollowing from './AwaitingMapFollowing';

const AwaitaningList = () => {
	const { FollowersAwaiting, FollowingAwaiting, numberOfFollwingawaiting, numberOfFollwersAwaiting } = useContext(
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
			<div>
				{numberOfFollwersAwaiting !== 0 ? (
					<span>
						<h5>Followers Request Awaitating {numberOfFollwersAwaiting}</h5>
						{FollowersAw}
					</span>
				) : (
					''
				)}
				{numberOfFollwingawaiting !== 0 ? (
					<span>
						<h5>Following Request Awaitating {numberOfFollwingawaiting}</h5>
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
