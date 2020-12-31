import React, { useContext } from 'react';
import { SocialMediaContext } from './Context';
import PostPageMap from './PostPageMap';
import NavBar from './NavBar';
import Cover from './Cover';
import Spinner from './Spinner'
const UserPage = () => {
	const { posts , UserPageData } = useContext(SocialMediaContext);
	let postsMap = posts.filter((item) => item.user._id === UserPageData._id).map((item) => {
		return <PostPageMap key={item._id} item={item} />;
	});

	return (
		<div>
			<NavBar />
			<Cover />
			{posts.length === 0 && <Spinner/>}
			{postsMap}
		</div>
	);
};

export default UserPage;
