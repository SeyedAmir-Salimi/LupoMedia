import React, { useContext, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { SocialMediaContext } from '../Context';

import NavBar from '../NavBar';
import FollowersAPageMap from './FollowersAPageMap';
const FollowersAcc = () => {
	const { FollowersAccepted } = useContext(SocialMediaContext);

	let FollowersAcc = FollowersAccepted.map((item) => {
		return <FollowersAPageMap key={item._id} item={item} />;
	});

	return (
		<div>
			<NavBar />
			{FollowersAcc}
		</div>
	);
};

export default FollowersAcc;
