import React, { useContext, useEffect, useState, useRef } from 'react';
import { SocialMediaContext } from './Context';
import { BrowserRouter as Router, Switch, Route, Link, Redirect, useHistory } from 'react-router-dom';
import Logo from '../Images/Logo-3.png';
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai';

const LogeIn = () => {
	const {
		LoginGetCall,
		loginError,
		loginCHangeHandler,
		email,
		password,
		token,
	} = useContext(SocialMediaContext);
	const [ TypeHandel, setTypeHandel ] = useState('password');

	const PassTypeHandel = (type) => {
		setTypeHandel(type);
	};

	let history = useHistory();

	useEffect(() => {
		if (token !== undefined) {
			console.log();
			history.push('/home');
		}
	});

	const AuthLogin = async (e) => {
		e.preventDefault();
		await LoginGetCall();
	};

	const GoToLink = (link) => {
		history.push(link);
	};

	useEffect(() => {
		emailRef.current.focus();
	}, []);
	const emailRef = useRef(null);

	return (
		<div className="Loge-in">
			<form className="formStyle" onSubmit={(e) => AuthLogin(e)}>
				<span>
					<img src={Logo} alt="Logo" style={{ width: '4rem' }} />
					<h2>Lupo Media</h2>
				</span>
				<span className="InputContainer">
					<input
						type="email"
						name="email"
						id="email"
						placeholder="Please Write Your Email"
						onChange={loginCHangeHandler}
						value={email}
						ref={emailRef}
					/>
					<br />
				</span>
				<span className="InputContainer">
					<input
						type={TypeHandel}
						name="password"
						id="password"
						placeholder="Please Enter Your PassWord"
						onChange={loginCHangeHandler}
						value={password}
					/>
					<br />
					{TypeHandel === 'password' ? (
						<AiFillEye className="PasswordEye" onClick={() => PassTypeHandel('text')} />
					) : (
						<AiFillEyeInvisible className="PasswordEye" onClick={() => PassTypeHandel('password')} />
					)}
					<br />
				</span>
				<span>
					<button className="button_Log" onClick={(e) => AuthLogin(e)}>
						LogIn
					</button>
					<button className="button_Log" onClick={() => GoToLink('/register')}>
						Register
					</button>
				</span>
				<h5 className="Forget-password" onClick={() => GoToLink('/forgetPassword')} >Forget password</h5>
				{loginError !== null ? <h3 className="RedError">{loginError}</h3> : ''}
			</form>
		</div>
	);
};

export default LogeIn;
