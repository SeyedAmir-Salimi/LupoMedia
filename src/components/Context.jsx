import React, { Component } from 'react';
import Axios from 'axios';
import Cookies from 'js-cookie';
import { BrowserRouter as Router, Switch, Route, Link, Redirect, useHistory } from 'react-router-dom';

import API from '../API/index';

const SocialMediaContext = React.createContext();

class SocialMediaProvider extends Component {
	constructor(props) {
		super(props);
		this.state = {
			id: '',
			token: '',
			email: '',
			password: '',
			User_Name: '',
			order: [],
			redirectTF: false,
			redirect: undefined,
			datiPersonali: {
				Bio: '',
				name: '',
				email: '',
				sesso: '',
				BirthDate: '',
				Sentimentale: ''
			},
			loginError: '',
			posts: [],
			comments: [],
			NewPassword:'',
			friendsList: [],
			userSearched: [],
			ConfirmPassword: '',
			ProfilePic: undefined,
			ErrorMessage: undefined,
			RegisterError: null,
			nameError: '',
			emailError: '',
			passwordError: '',
			ConfirmPassWordError: '',
		};
	}

	componentDidMount() {
		this.getCookies();
		this.getDatiPersonali();
		this.GetPostsCall();
		this.getCommentsCall();
		this.getFriendsListCall()
	}

	//---------------- API JS -----------------//

	AddPostCall = async (contextid, PostCaption) => {
		const api = API();
		const element = document.querySelector('#PO_Pic').files[0];
		if (PostCaption !== '') {
			if (element === undefined) {
				const result = await api.AddPostwithoutpic(contextid, PostCaption);
				console.log(result.data);
				const newItem = {
					caption: PostCaption,
					date: new Date(),
					user: {
						ProfilePic: this.state.ProfilePic,
						name: this.state.User_Name,
						_id: this.state.id
					},
					_id: 'Temp_123'
				};

				let UpdateItem = [ ...this.state.posts ];
				UpdateItem.unshift(newItem);
				this.setState({ posts: UpdateItem });

				const postsCopy = [ ...this.state.posts ];
				const tempPost = postsCopy.find((item) => item._id === 'Temp_123');
				tempPost._id = result.data._id;

				this.setState(() => {
					return { posts: postsCopy };
				});
			} else {
				const result = await api.AddPostwithpic(contextid, PostCaption);
				console.log(result);
				const newItem = {
					caption: PostCaption,
					date: new Date(),
					user: {
						ProfilePic: this.state.ProfilePic,
						name: this.state.User_Name,
						_id: this.state.id
					},
					_id: 'Temp_123',
					picture: result.data.picture
				};

				let UpdateItem = [ ...this.state.posts ];
				UpdateItem.unshift(newItem);
				this.setState({ posts: UpdateItem });

				const postsCopy = [ ...this.state.posts ];
				const tempPost = postsCopy.find((item) => item._id === 'Temp_123');
				tempPost._id = result.data._id;
				this.setState(() => {
					return { posts: postsCopy };
				});
			}
		}
	};

	DeleteCommentCALL = async (id, postref) => {
		const api = API();
		await api.DeleteComment(id, postref);
		const filteritems = this.state.comments.filter((item) => item._id !== id);
		this.setState({
			comments: filteritems
		});
	};

	DeletePostCALL = async (id, user) => {
		const api = API();
		await api.DeletePost(id, user);
		const filteritems = this.state.posts.filter((item) => item._id !== id);
		this.setState({
			posts: filteritems
		});
	};

	WritecommentCALL = async (ref, comments, users) => {
		if (comments !== '') {
			const api = API();
			const result = await api.WriteComment(ref, comments, users);
			console.log(result.data);

			const newItem = {
				date: new Date(),
				postref: {
					_id: ref
				},
				comment: comments,
				user: {
					ProfilePic: this.state.ProfilePic,
					name: this.state.User_Name,
					_id: this.state.id
				},
				_id: 'Temp_123'
			};

			let UpdateItem = [ ...this.state.comments ];
			UpdateItem.unshift(newItem);
			this.setState({ comments: UpdateItem });

			const commnetsCopy = [ ...this.state.comments ];
			const tempComment = commnetsCopy.find((item) => item._id === 'Temp_123');
			tempComment._id = result.data._id;
			this.setState(() => {
				return { comments: commnetsCopy };
			});
		}
	};

	SearchUserCALL = async (typedName) => {
		const get = Cookies.get('redirect');
		this.setState({ userSearched: [] });
		if (get !== '/search') {
			Cookies.set('redirect', '/search');
			this.setState({
				redirect: '/search'
			});
		} else {
			const api = API();
			const result = await api.SearchUser(typedName);
			this.setState({
				userSearched: result.data.User
			});
		}
	};

	RegisterFunctCALL = async (
		Registername,
		Registeremail,
		Registersesso,
		Registerpassword,
		RegisterConfirmPassWord
	) => {
		const isValid = this.validate(Registername, Registeremail, Registerpassword, RegisterConfirmPassWord);
		try {
			this.setState({
				RegisterError: null
			});
			if (isValid) {
				const api = API();
				const result = await api.RegisterFunct(
					Registername,
					Registeremail,
					Registersesso,
					Registerpassword,
					RegisterConfirmPassWord
				);
				this.setState({ nameError: '', emailError: '', passwordError: '', ConfirmPassWordError: '' });
				console.log(result);
				this.setState({
					redirect: '/'
				});
			}
		} catch (error) {
			console.log(error.message);
			this.setState({
				RegisterError: error.message
			});
		}
	};

	RegisterErrortoNull = () => {
		this.setState({ nameError: '', emailError: '', passwordError: '', ConfirmPassWordError: '' });
	};

	GetPostsCall = async () => {
		const api = API();
		const result = await api.GetAllPosts();
		this.setState({
			posts: result.data.Posts
		});
	};

	LoginGetCall = async () => {
		this.setState({
			loginError: ''
		});
		try {
			const api = API();
			const result = await api.LoginGet(this.state.email, this.state.password);

			console.log(result.data);
			Cookies.set('Auth_token', result.data.token);
			Cookies.set('User_id', result.data.ID);
			Cookies.set('User_Name', result.data.NAME);
			Cookies.set('redirect', '/home');
			const get = Cookies.get('redirect');
			this.setState(
				{
					redirectTF: true,
					redirect: get,
					email: '',
					password: ''
				},
				() => [ this.getDatiPersonali(), this.getCookies() ]
			);
		} catch (error) {
			this.setState({
				loginError: error.message
			});
			console.log({ message: error.message });
		}
	};

	getDatiPersonali = async () => {
		try {
			const ID = Cookies.get('User_id')
			const config = {
				headers: {
					'Content-Type': 'application/json',
					'auth-token': Cookies.get('Auth_token')
				}
			};
			const api = API();
			const result = await api.DatiPersonali(ID, config);

			this.setState({ datiPersonali: result.data, ProfilePic: result.data.ProfilePic });
		} catch (error) {
			console.log(error);
		}
    };


    UpdateDatiPersonali = async (e) => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': Cookies.get('Auth_token')
                }
            };
            e.preventDefault();
            const ID = Cookies.get('User_id');
            const NAME = this.state.datiPersonali.name;
            const EMAIL = this.state.datiPersonali.email;
            const BIRTHDATE = this.state.datiPersonali.BirthDate;
            const SENTIMENTALE = this.state.datiPersonali.Sentimentale;
            const SESSO = this.state.datiPersonali.sesso;
            const BIO = this.state.datiPersonali.Bio;
            const api = API();
            const result = await api.UpdateDatiPersonal(ID,NAME,EMAIL,BIRTHDATE,SENTIMENTALE,SESSO,BIO,config)
            Cookies.set('User_Name', NAME);
            this.setState({
                User_Name:NAME
            })

        } catch (error) {
            console.log(error)
        }
    };
    
    uploadPicprofile = async ({ target: { files } }) => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': Cookies.get('Auth_token')
                }
            };
            const ID = Cookies.get('User_id');
            let data = new FormData();
            data.append('ProfilePic', files[0]);
            const api = API();
            const result = await api.uploadPictureprofile(ID, data,config)
			this.setState(() => {
				return { ProfilePic: result.data.ProfilePic };
			});

        } catch (error) {
            console.log(error);
        }
	};

	updatePasswordCall = async () => {
		this.setState({
			NewPassword: "",
			ConfirmPassword: "",
		})
		try {
			if(this.state.NewPassword === this.state.ConfirmPassword){
				const config = {
					headers: {
						'Content-Type': 'application/json',
						'auth-token': Cookies.get('Auth_token')
					}
				};
				const ID = Cookies.get('User_id');
				const data = {
					password: this.state.NewPassword
				};
				const api = API();
				const result = await api.updatePassword(ID, data,config)
			}
			else{
				this.setState({ ErrorMessage: 'The Passwords Are Not The Same' });
			}
		} catch (error) {
			console.log(error);
		}
	};

	deleteAccountCall = async () => {
		try {
			const ID = Cookies.get('User_id');
			const config = {
				headers: {
					'Content-Type': 'application/json',
					'auth-token': Cookies.get('Auth_token')
				}
			};
			const api = API();
			const result = await api.deleteAccount(ID,config)
			
		} catch (error) {
			console.log(error);
		}

	};
	getCommentsCall = async () => {
		try {
			const api = API();
			const result = await api.getComments()
			this.setState({ comments: result.data.Comments });
		} catch (error) {
			console.log(error);
		}
	};

	getFriendsListCall = async ()=>{
		const ID = Cookies.get('User_id')
		const api = API();
		const result = await api.getFriendsList(ID)
		console.log(result);
		// this.setState({ friendsList: result.data});
	}

	SendFriendRequestCall = async (secondUserData)=>{
		try {
			const mainUserData = Cookies.get('User_id');
			const situationshipData = "awaiting";
			const api = API();
			const result = await api.SendFriendRequest(mainUserData,secondUserData,situationshipData)
			console.log(result);
			
		} catch (error) {
			console.log({ error });
		}
	}

	respondFriendRequestCall = async (secondUser) =>{
		try {
			const data = {
				mainUser: Cookies.get('User_id'),
				secondUser: secondUser ,
				situationship: "accepted"
			};
			const api = API();
			const result = await api.respondFriendRequest(data)
			console.log(result);
		} catch (error) {
			console.log({ error });
		}
	}

	deleteFriendRequesttCall = async (secondUserData)=>{
		const mainUserData = Cookies.get('User_id');
		const api = API();
		const result = await api.deleteFriendRequest(mainUserData,secondUserData)
		console.log(result);
	}


	//---------------- END API JS -----------------//

	//---------------- LogIN Start -----------------//

	validate = (Registername, Registeremail, Registerpassword, RegisterConfirmPassWord) => {
		let nameError = '';
		let emailError = '';
		let passwordError = '';
		let ConfirmPassWordError = '';

		if (Registername.length < 4) {
			nameError = 'Name Should be at least 4 characters';
		}
		if (!Registeremail.includes('@')) {
			emailError = 'Invalid email';
		}
		if (Registerpassword.length < 4) {
			passwordError = 'Password Should be at least 4 characters';
		}
		if (Registerpassword !== RegisterConfirmPassWord) {
			ConfirmPassWordError = 'Passwords are not the same';
		}

		if (nameError || emailError || passwordError || ConfirmPassWordError) {
			this.setState({ nameError, emailError, passwordError, ConfirmPassWordError });
			return false;
		}

		return true;
	};

	loginCHangeHandler = (e) => {
		this.setState({
			email: document.querySelector('#email').value,
			password: document.querySelector('#password').value
		});
	};

	getCookies = async () => {
		const token = Cookies.get('Auth_token');
		const id = Cookies.get('User_id');
		const redirect = Cookies.get('redirect');
		const User_Name = Cookies.get('User_Name');

		this.setState({
			token,
			id,
			redirect,
			User_Name
		});
		if (this.state.token !== undefined) {
			this.setState({
				redirectTF: true
			});
		}
	};

	//---------------- LogIN Out -----------------//
	LogeOut = () => {
		Cookies.remove('Auth_token');
		Cookies.remove('User_id');
		Cookies.remove('redirect');
		Cookies.remove('User_Name');
		this.setState({
			redirectTF: false,
			token: undefined,
			redirect: undefined
		});
	};

	// ---------------- Get To LinK ---------------- //

	ridirectFunction = (link) => {
		Cookies.set('redirect', link);
		this.setState({
			redirect: link
		});
	};


	// ---------------- Update Dati Personali ---------------- //

	onchangeHandPassword = () => {
		const NewPassword = document.querySelector('#DP_password').value;
		const ConfirmPassword = document.querySelector('#DP_Confirmpassword').value;
		this.setState({
			NewPassword,
			ConfirmPassword
		});
	};

	cancelUpdatePassword = ()=> {
		this.setState({
			NewPassword: "",
			ConfirmPassword: "",
		})
	}

	onchangeHandlerDatiPersonali = (e) => {
		let copy = { ...this.state.datiPersonali };
		copy[e.target.name] = e.target.value;
		this.setState({ datiPersonali: copy });
	};
	



	render() {
		return (
			<SocialMediaContext.Provider
				value={{
					...this.state,
					loginCHangeHandler: this.loginCHangeHandler,
					LoginGetCall: this.LoginGetCall,
					LogeOut: this.LogeOut,
					getDatiPersonali: this.getDatiPersonali,
					onchangeHandlerDatiPersonali: this.onchangeHandlerDatiPersonali,
					onchangeHandPassword: this.onchangeHandPassword,
					cancelUpdatePassword: this.cancelUpdatePassword,
					UpdateDatiPersonali: this.UpdateDatiPersonali,
					uploadPicprofile: this.uploadPicprofile,
					updatePasswordCall: this.updatePasswordCall,
					deleteAccountCall: this.deleteAccountCall,
					DeletePostCALL: this.DeletePostCALL,
					DeleteCommentCALL: this.DeleteCommentCALL,
					WritecommentCALL: this.WritecommentCALL,
					AddPostCall: this.AddPostCall,
					SearchUserCALL: this.SearchUserCALL,
					ridirectFunction: this.ridirectFunction,
					RegisterFunctCALL: this.RegisterFunctCALL,
					RegisterErrortoNull: this.RegisterErrortoNull,
					GetPostsCall: this.GetPostsCall,
					getFriendsListCall:this.getFriendsListCall,
					SendFriendRequestCall:this.SendFriendRequestCall,
					respondFriendRequestCall: this.respondFriendRequestCall,
					deleteFriendRequesttCall:this.deleteFriendRequesttCall,
				}}
			>
				{this.props.children}
			</SocialMediaContext.Provider>
		);
	}
}
const SocialMediaConsumer = SocialMediaContext.Consumer;

export { SocialMediaProvider, SocialMediaConsumer, SocialMediaContext };
