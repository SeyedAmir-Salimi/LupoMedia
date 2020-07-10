import React, { useState, useContext, useEffect, useRef } from 'react';
import { SocialMediaContext } from './Context';
import { BrowserRouter as Router, Switch, Route, Link, useHistory } from 'react-router-dom';
import SearchBar from './SearchBar';
import ProfilePicture from './ProfilePicture';
import { FaUserFriends } from 'react-icons/fa';

const Navbar = ({ ref }) => {
	const [ linkPush, setlinkPush ] = useState(undefined);
	const { User_Name, ProfilePic, LogeOut, token, ridirectFunction, numberOfFriendsRequest , numberOfFollwingawaiting , numberOfFollwersAwaiting } = useContext(
		SocialMediaContext
	);

	let history = useHistory();
	useEffect(() => {
		if (token === undefined) {
			console.log('Authenticated logeout');
			history.push('/');
		}
	});

	const GoToLink = (link) => {
		ridirectFunction(link);
		history.push(link);
		console.log(history.location.pathname);
	};

	const inputRef = useRef();
	useEffect(() => {
		if (history.location.pathname === '/search') {
			inputRef.current.focus();
		}
	}, []);

	const awaitingSum = numberOfFollwingawaiting + numberOfFollwersAwaiting
	return (
		<div>
			<div className="Nav">
				<SearchBar ref={inputRef} />
				<ul>
					<div className="ProfilePic_Wrapper">
						<ProfilePicture
							ProfilePic={ProfilePic}
							User_Name={User_Name}
							Size={'Medium'}
							onClick={() => GoToLink(`/myPage`)}
						/>
					</div>
					<li onClick={() => GoToLink(`/myPage`)} className="hvr-pulse">
						{User_Name}
					</li>
					<li onClick={() => GoToLink('/home')} className="hvr-pulse">
						Home
					</li>
					<li onClick={() => GoToLink(`/${User_Name}/awaitaningList`)} className="hvr-pulse">
						<FaUserFriends style={{ fontSize: '1.5rem'}} />
                    {awaitingSum >= 1 ? awaitingSum : ""}
					</li>
					<li onClick={LogeOut} className="hvr-buzz-out">
						LogeOut
					</li>
				</ul>
			</div>
		</div>
	);
};

export default Navbar;
