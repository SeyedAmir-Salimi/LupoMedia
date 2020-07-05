import React, { useContext, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { SocialMediaContext } from '../Context';

import NavBar from '../NavBar';
import FollowingAPageMap from './FollowingAPageMap';
const FollowingAcc = () => {
	const { FollowingAccepted } = useContext(SocialMediaContext);

	let FollowingAcc = FollowingAccepted.map((item) => {
		return <FollowingAPageMap key={item._id} item={item} />;
	});

	return (
		<div>
			<NavBar />
			{FollowingAcc}
		</div>
	);
};

export default FollowingAcc;
