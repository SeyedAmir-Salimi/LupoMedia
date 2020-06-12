import React, { Component } from 'react'
import Axios from 'axios'
import Cookies from 'js-cookie'
import { BrowserRouter as Router, Switch, Route, Link, Redirect, useHistory } from "react-router-dom";

import API from "../API/index"


const SocialMediaContext = React.createContext();

class SocialMediaProvider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: "",
            token: "",
            email: "",
            password: "",
            User_Name: "",
            order: [],
            redirectTF: false,
            redirect: undefined,
            datiPersonali: {
                Bio: "",
                name: "",
                email: "",
                sesso: "",
                BirthDate: "",
                Sentimentale: ""
            },
            posts: [],
            comments: [],
            NewPassword: "",
            userSearched: [],
            ConfirmPassword: "",
            ProfilePic: undefined,
            ErrorMessage: undefined,
            RegisterError: null,
            nameError: '',
            emailError: '',
            passwordError: '',
            ConfirmPassWordError: '',
        }
    }

    componentDidMount() {
        this.getCookies();
        this.getDataOrder();
        this.getDatiPersonali();
        this.getPosts();
        this.getComments();

    }

    //---------------- API JS -----------------//

    AddPostCall = async (contextid, PostCaption) => {
        const api = API();
        const element = document.querySelector("#PO_Pic").files[0]
        if (PostCaption !== "") {
            if (element === undefined) {
                const result = await api.AddPostwithoutpic(contextid, PostCaption);
                console.log(result.data)
                const newItem = {
                    caption: PostCaption,
                    date: new Date(),
                    user: {
                        ProfilePic: this.state.ProfilePic,
                        name: this.state.User_Name,
                        _id: this.state.id,
                    },
                    _id: "Temp_123",
                }
                const UpdateItem = [...this.state.posts, newItem];
                this.setState({ posts: UpdateItem })

                const postsCopy = [...this.state.posts];
                const tempPost = postsCopy.find(item => item._id === "Temp_123");
                tempPost._id = result.data._id
                this.setState(() => {
                    return { posts: postsCopy };
                })
            }
            else {
                const result = await api.AddPostwithpic(contextid, PostCaption);
                console.log(result);
                const newItem = {
                    caption: PostCaption,
                    date: new Date(),
                    user: {
                        ProfilePic: this.state.ProfilePic,
                        name: this.state.User_Name,
                        _id: this.state.id,
                    },
                    _id: "Temp_123",
                    picture: result.data.picture,
                }
                const UpdateItem = [...this.state.posts, newItem];
                this.setState({ posts: UpdateItem })

                const postsCopy = [...this.state.posts];
                const tempPost = postsCopy.find(item => item._id === "Temp_123");
                tempPost._id = result.data._id
                this.setState(() => {
                    return { posts: postsCopy };
                })
            }
        }
    }



    DeleteCommentCALL = async (id, postref) => {
        const api = API();
        await api.DeleteComment(id, postref);
        const filteritems = this.state.comments.filter(item => item._id !== id);
        this.setState({
            comments: filteritems
        })
    }

    DeletePostCALL = async (id, user) => {
        const api = API();
        await api.DeletePost(id, user);
        const filteritems = this.state.posts.filter(item => item._id !== id);
        this.setState({
            posts: filteritems
        })
    }


    WritecommentCALL = async (ref, comments, users) => {
        if (comments !== "") {
            const api = API();
            const result = await api.WriteComment(ref, comments, users);
            console.log(result.data)

            const newItem = {
                postref: {
                    _id: ref
                },
                comment: comments,
                user: {
                    ProfilePic: this.state.ProfilePic,
                    name: this.state.User_Name,
                    _id: this.state.id,
                },
                _id: "Temp_123"
            }

            const UpdateItem = [...this.state.comments, newItem];
            this.setState({ comments: UpdateItem })


            const commnetsCopy = [...this.state.comments];
            const tempComment = commnetsCopy.find(item => item._id === "Temp_123");
            tempComment._id = result.data._id
            this.setState(() => {
                return { comments: commnetsCopy };
            })

        }
    }

    SearchUserCALL = async (typedName) => {
        const get = Cookies.get('redirect')
        this.setState({ userSearched: []})
        if (get !== "/search") {
            Cookies.set('redirect', "/search")
            this.setState({
                redirect: "/search",
            })
        }
        else {
            const api = API();
            const result = await api.SearchUser(typedName);
            this.setState({
                userSearched: result.data.User
            })
        }
    }

    RegisterFunctCALL = async (Registername, Registeremail, Registersesso, Registerpassword, RegisterConfirmPassWord) => {
        const isValid = this.validate(Registername, Registeremail, Registerpassword, RegisterConfirmPassWord)
        try {
            this.setState({
                RegisterError: null
            })
            if (isValid) {
                const api = API();
                const result = await api.RegisterFunct(Registername, Registeremail, Registersesso, Registerpassword, RegisterConfirmPassWord);
                this.setState({ nameError: '', emailError: '', passwordError: '', ConfirmPassWordError: '' })
                console.log(result);
                this.setState({
                    redirect: "/Logein"
                })
            }
        } catch (error) {
            console.log(error.message);
            this.setState({
                RegisterError: error.message
            })
        }
    }

    RegisterErrortoNull = () =>{
        this.setState({ nameError: '', emailError: '', passwordError: '', ConfirmPassWordError: '' })
    }


    //---------------- END API JS -----------------//

    //---------------- LogIN Start -----------------//
    validate = (Registername, Registeremail, Registerpassword, RegisterConfirmPassWord) => {
        let nameError = '';
        let emailError = '';
        let passwordError = '';
        let ConfirmPassWordError = '';

        if (Registername.length < 4) {
            nameError = "Name Should be at least 4 characters";
        }
        if (!Registeremail.includes("@")) {
            emailError = "Invalid email";
        }
        if (Registerpassword.length < 4) {
            passwordError = "Password Should be at least 4 characters";
        }
        if (Registerpassword !== RegisterConfirmPassWord) {
            ConfirmPassWordError = "Passwords are not the same";
        }

        if (nameError || emailError || passwordError || ConfirmPassWordError) {
            this.setState({ nameError, emailError, passwordError, ConfirmPassWordError })
            return false
        }

        return true
    }


    loginCHangeHandler = e => {
        this.setState({
            email: document.querySelector("#email").value,
            password: document.querySelector("#password").value,
        })
    }

    LoginGet = async () => {
        await Axios.post(`http://localhost:3000/enter/login`, {
            email: this.state.email,
            password: this.state.password
        })
            .then(res => {
                console.log(res.data);
                Cookies.set('Auth_token', res.data.token);
                Cookies.set('User_id', res.data.ID);
                Cookies.set('User_Name', res.data.NAME);
                Cookies.set('redirect', "/home")
                const get = Cookies.get('redirect')
                this.setState({
                    redirectTF: true,
                    redirect: get,

                }, () => [this.getDatiPersonali(), this.getCookies()])
            })
            .catch(err => {
                this.setState({
                    err: err.response.data
                })
                alert(this.state.err)
                console.log({ message: err })
            })
    }


    getCookies = async () => {
        const token = Cookies.get('Auth_token');
        const id = Cookies.get('User_id');
        const redirect = Cookies.get('redirect');
        const User_Name = Cookies.get('User_Name')

        this.setState({
            token, id, redirect, User_Name
        })
        if (this.state.token !== undefined) {
            this.setState({
                redirectTF: true,
            })
        }
    }

    //---------------- LogIN Out -----------------//
    LogeOut = () => {
        Cookies.remove('Auth_token');
        Cookies.remove('User_id');
        Cookies.remove('redirect');
        Cookies.remove('User_Name');
        this.setState({
            redirectTF: false,
            token: undefined,
            redirect: undefined,

        })
    }


    // ---------------- Get data order ---------------- //

    getDataOrder = async () => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'auth-token': Cookies.get('Auth_token'),
            }
        }
        await Axios.get(`http://localhost:3000/order`, config)
            .then(res => {
                console.log(res.data);
                this.setState({ order: res.data.orders })
            })
            .then(res => (res))
            .catch(err => console.error(err));
    }

    // ---------------- Get To LinK ---------------- //

    ridirectFunction = (link) => {
        this.setState({
            redirect: link
        })
    }


    // ---------------- Take Dati Personali ---------------- //

    getDatiPersonali = async () => {
        const ID = Cookies.get('User_id')
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'auth-token': Cookies.get('Auth_token'),
            }
        }
        await Axios.get(`http://localhost:3000/datiPersonali/${ID}`, config)
            .then(res => {
                console.log(res.data);
                this.setState({ datiPersonali: res.data, ProfilePic: res.data.ProfilePic })
            })
            .then(res => (res))
            .catch(err => console.error(err));
    }
    // ---------------- Update Dati Personali ---------------- // 

    onchangeHandPassword = () => {
        const NewPassword = document.querySelector("#DP_password").value
        const ConfirmPassword = document.querySelector("#DP_Confirmpassword").value
        this.setState({
            NewPassword, ConfirmPassword,
        })
    }

    onchangeHandlerDatiPersonali = (e) => {
        let copy = { ...this.state.datiPersonali };
        copy[e.target.name] = e.target.value;
        this.setState({ datiPersonali: copy });
    }

    UpdateDatiPersonali = async (e) => {

        const config = {
            headers: {
                'Content-Type': 'application/json',
                'auth-token': Cookies.get('Auth_token'),
            }
        }
        e.preventDefault();
        const ID = Cookies.get('User_id')
        const NAME = this.state.datiPersonali.name;
        const EMAIL = this.state.datiPersonali.email;
        const BIRTHDATE = this.state.datiPersonali.BirthDate;
        const SENTIMENTALE = this.state.datiPersonali.Sentimentale;
        const SESSO = this.state.datiPersonali.sesso;
        const BIO = this.state.datiPersonali.Bio;
        await Axios.patch(`http://localhost:3000/datiPersonali/${ID}`, [{
            "propName": "name", "value": NAME
        },
        {
            "propName": "email", "value": EMAIL
        },
        {
            "propName": "BirthDate", "value": BIRTHDATE
        },
        {
            "propName": "sesso", "value": SESSO
        },
        {
            "propName": "Sentimentale", "value": SENTIMENTALE
        },
        {
            "propName": "Bio", "value": BIO
        },
        ], config)
            .then(res => {
                console.log(res)
                Cookies.set('User_Name', NAME)
                window.location.reload();
            })
            .catch(err => console.error(err));
    }

    uploadPicprofile = async ({ target: { files } }) => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'auth-token': Cookies.get('Auth_token'),
            }
        }
        const ID = Cookies.get('User_id')
        console.log(files[0])
        let data = new FormData();
        data.append('ProfilePic', files[0])
        await Axios.put(`http://localhost:3000/datiPersonali/${ID}`, data, config)
            .then(res => {
                console.log(res)
                window.location.reload();
            })
            .catch(err => console.error(err));
    }

    updatePasswrd = async () => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'auth-token': Cookies.get('Auth_token'),
            }
        }
        const ID = Cookies.get('User_id')
        const data = {
            "password": this.state.NewPassword
        }
        if (this.state.NewPassword === this.state.ConfirmPassword) {
            await Axios.put(`http://localhost:3000/datiPersonali/changepassword/${ID}`, data, config)
                .then(res => {
                    console.log(res)
                    window.location.reload();
                })
                .catch(err => console.error(err));
        }
        else {
            this.setState({ ErrorMessage: "The Passwords Are Not The Same" })
        }
    }

    // ---------------- Delete Account ---------------- // 

    deleteAccount = async () => {

        const ID = Cookies.get('User_id')
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'auth-token': Cookies.get('Auth_token'),
            }
        }
        await Axios.delete(`http://localhost:3000/datiPersonali/${ID}`, config)
            .then(res => {
                console.log(res.data);
                window.location.reload();

            })
            .then(res => (res))
            .catch(err => console.error(err));
    }
    // ---------------- Take Posts ---------------- //

    getPosts = async () => {

        await Axios.get(`http://localhost:3000/posts`)
            .then(res => {
                console.log(res.data.Posts);
                this.setState({ posts: res.data.Posts })
            })
            .then(res => (res))
            .catch(err => console.error(err));
    }

    // ---------------- Take Comments ---------------- //
    getComments = async () => {
        await Axios.get(`http://localhost:3000/comments`)
            .then(res => {
                console.log(res.data.Comments);
                this.setState({ comments: res.data.Comments })
            })
            .then(res => (res))
            .catch(err => console.error(err));
    }


    render() {
        return (
            <SocialMediaContext.Provider value={{
                ...this.state,
                loginCHangeHandler: this.loginCHangeHandler,
                LoginGet: this.LoginGet,
                LogeOut: this.LogeOut,
                getDataOrder: this.getDataOrder,
                getDatiPersonali: this.getDatiPersonali,
                onchangeHandlerDatiPersonali: this.onchangeHandlerDatiPersonali,
                onchangeHandPassword: this.onchangeHandPassword,
                UpdateDatiPersonali: this.UpdateDatiPersonali,
                uploadPicprofile: this.uploadPicprofile,
                updatePasswrd: this.updatePasswrd,
                deleteAccount: this.deleteAccount,
                DeletePostCALL: this.DeletePostCALL,
                DeleteCommentCALL: this.DeleteCommentCALL,
                WritecommentCALL: this.WritecommentCALL,
                AddPostCall: this.AddPostCall,
                SearchUserCALL: this.SearchUserCALL,
                ridirectFunction: this.ridirectFunction,
                RegisterFunctCALL: this.RegisterFunctCALL,
                RegisterErrortoNull: this.RegisterErrortoNull,
            }}>
                {this.props.children}
            </SocialMediaContext.Provider>
        );
    }
}
const SocialMediaConsumer = SocialMediaContext.Consumer;

export { SocialMediaProvider, SocialMediaConsumer, SocialMediaContext };