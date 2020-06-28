import React, { useState, useContext } from 'react';
import Logo from '../Images/Logo-3.png';
import { SocialMediaContext } from './Context';
import { BrowserRouter as Router, Switch, Route, Link, useHistory } from 'react-router-dom';

const SearchBar = () => {
	const [ Search, setSearch ] = useState({
		SearchInput: ''
	});
	let history = useHistory();
	const { SearchUserCALL, redirect } = useContext(SocialMediaContext);

	const onchangHandler = (e) => {
		setSearch({ SearchInput: e.target.value });
	};

	const handelSubmit = (e, typedName) => {
		e.preventDefault();
		SearchUserCALL(typedName);
		history.push('/search');
		console.log('search');
	};

	return (
		<div>
			<div className="Nav-LogoSearch">
				<img src={Logo} alt="Logo" style={{ width: '4rem' }} />
				<form
					onSubmit={(e) => handelSubmit(e, Search.SearchInput)}
					onClick={(e) => handelSubmit(e, Search.SearchInput)}
				>
					<input
						type="text"
						placeholder="  NewSearch..."
						onChange={(e) => onchangHandler(e)}
						value={Search.SearchInput}
					/>
				</form>
			</div>
		</div>
	);
};

export default SearchBar;
