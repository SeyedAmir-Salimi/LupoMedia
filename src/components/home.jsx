import React from 'react';
import NavBar from './NavBar';
import Postpage from './Postpage';
import PostInput from './PostInput';

const home = () => {

	return (
		<div className="homepage">
			<NavBar />
			<PostInput />
			<Postpage />
		</div>
	);
};

export default home;

