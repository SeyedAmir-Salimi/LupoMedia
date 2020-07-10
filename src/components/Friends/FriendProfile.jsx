import React, { useState, useContext, useEffect, useRef } from 'react';
import { SocialMediaContext } from './Context';
import { BrowserRouter as Router, Switch, Route, Link, useHistory } from 'react-router-dom';
import PostPageMap from './PostPageMap';
import NavBar from './NavBar';

export default function FriendProfile() {
	const {
		numberOfFollwingAccepted,
		numberOfFollwersAccepted,
		User_Name,
		ProfilePic,
		datiPersonali,
		getFriendsListCall
	} = useContext(SocialMediaContext);
	const { posts, id, User_Name } = useContext(SocialMediaContext);
	let MyPost = posts.filter((item) => item.user._id === id).map((item) => {
		return <PostPageMap key={item._id} item={item} />;
	});
	return (
		<div>
			<NavBar />
			{MyPost}
		</div>
	);
}
