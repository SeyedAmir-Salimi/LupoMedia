import React, { useState, useContext } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { SocialMediaContext } from './Context';
import { FaTrashAlt } from 'react-icons/fa';
import { FcLike, FcDislike } from 'react-icons/fc';
import { FcInternal } from 'react-icons/fc';
import CommentsPageMap from './CommentsPageMap';
import LastSeen from './LastSeen';
import ProfilePicture from './ProfilePicture';


const PostPageMap = ({ item }) => {
	const [ comment, setcomment ] = useState('');
	const {
		datiPersonali,
		User_Name,
		id,
		comments,
		WritecommentCALL,
		DeleteCommentCALL,
		DeletePostCALL,
		posts,
		getFriendsListCall,
	} = useContext(SocialMediaContext);
	const onchangHandler = (e) => {
		setcomment(e.target.value);
	};

	const WriteComments = (e, ref, comments, users) => {
		e.preventDefault();
		WritecommentCALL(ref, comments, users);
		setcomment('');
	};

	return (
		<div>
			<p onClick={()=> getFriendsListCall()}>list</p>
			<div key={item._id} className="postpage">
				<div className="PostProfilPic_Wrapper" >
				<ProfilePicture
					ProfilePic={item.user.ProfilePic}
					User_Name={User_Name}
					Size={'Medium'}
				/>
				</div>
				<h3 className="postpage_name">{item.user.name}</h3>
				<p className="postpage_date">
					<LastSeen date={item.date} />
				</p>

				{item.user._id === id ? (
					<FaTrashAlt className="postpage_trash" onClick={() => DeletePostCALL(item._id, id)} />
				) : (
					''
				)}
				<div className="postpage_LikeDislike">
					<FcLike />
					<FcDislike />
				</div>
				<br />
				{item.picture !== undefined ? (
					<img src={item.picture} alt={item.caption} className="postpage_Image" />
				) : (
					''
				)}

				<h4 className="postpage_Caption">{item.caption}</h4>
				<form onSubmit={(e) => WriteComments(e, item._id, comment, id)}>
					<span className="postpage_CommentInput">
						<input
							type="text"
							name=""
							className="postpageComments"
							placeholder=" Write Your Commnet"
							onChange={onchangHandler}
							value={comment}
						/>
						<FcInternal
							className="FC_ICONS"
							style={{ fontSize: '2rem' }}
							onClick={(e) => WriteComments(e, item._id, comment, id)}
						/>
					</span>
				</form>
				<h4 className="postpage_Comment">comments:</h4>
				<CommentsPageMap key={item._id} item={item} />
			</div>
		</div>
	);
};

export default PostPageMap;
