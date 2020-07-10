import React, { useState, useContext, useEffect, useRef } from 'react';
import { SocialMediaContext } from './Context';
import { BrowserRouter as Router, Switch, Route, Link, useHistory } from 'react-router-dom';
import PostPageMap from './PostPageMap';
import NavBar from './NavBar';
import CoverMy from './CoverMy';

const MyPage = () => {
	const { posts , id } = useContext(SocialMediaContext);
	let MyPost = posts.filter((item) => item.user._id === id).map((item) => {
		return <PostPageMap key={item._id} item={item} />;
	});

	return (
		<div>
			<NavBar />
			<CoverMy />
			{MyPost}
		</div>
	);
};

export default MyPage;
