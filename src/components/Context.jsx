import React, { Component } from 'react'
import Cookies from 'js-cookie'
import API from '../API/index'

const SocialMediaContext = React.createContext()

class SocialMediaProvider extends Component {
  constructor (props) {
    super(props)
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
      NewPassword: '',
      userSearched: [],
      FollowingAccepted: [],
      FollowersAccepted: [],
      numberOfFollwingAccepted: '',
      numberOfFollwersAccepted: '',
      FollowingAwaiting: [],
      FollowersAwaiting: [],
      numberOfFollwingawaiting: '',
      numberOfFollwersAwaiting: '',
      numberOfFriendsRequest: '',
      ConfirmPassword: '',
      ProfilePic: undefined,
      ErrorMessage: undefined,
      RegisterError: undefined,
      nameError: '',
      emailError: '',
      passwordError: '',
      ConfirmPassWordError: '',
      UserPageData: {},
      resetPasswordMessage: '',
      resetPasswordMessageError: '',
      replyCommentsSearch: [],
    }
  }

  componentDidMount () {
    this.getCookies()
    this.getDatiPersonali()
    this.GetPostsCall()
    // this.getCommentsCall()
    this.getFollowingAcceptedCall()
    this.getFollowersAcceptedCall()
    this.getFollowingAwaitingCall()
    this.getFollowersAwaitingCall()
    this.SetUSerPageData()
  }

  //---------------- API JS -----------------//

  AddPostCall = async (contextid, PostCaption, extension) => {
    const api = API()
    const element = document.querySelector('#PO_Pic').files[0]
    if (PostCaption !== '') {
      if (element === undefined) {
        const result = await api.AddPostwithoutpic(contextid, PostCaption)
        const newItem = {
          caption: PostCaption,
          date: new Date(),
          user: {
            ProfilePic: this.state.ProfilePic,
            name: this.state.User_Name,
            _id: this.state.id
          },
          Comments: [],
          Likes: [],
          _id: 'Temp_123'
        }

        let UpdateItem = [...this.state.posts]
        UpdateItem.unshift(newItem)
        this.setState({ posts: UpdateItem })
        const postsCopy = [...this.state.posts]
        const tempPost = postsCopy.find(item => item._id === 'Temp_123')
        tempPost._id = result.data._id
        this.setState(() => {
          return { posts: postsCopy }
        })
      } else {
        const result = await api.AddPostwithpic(
          contextid,
          PostCaption,
          extension
        )
        const newItem = {
          caption: PostCaption,
          date: new Date(),
          extension: extension,
          type: 'Temp_type',
          user: {
            ProfilePic: this.state.ProfilePic,
            name: this.state.User_Name,
            _id: this.state.id
          },
          Comments: [],
          Likes: [],
          _id: 'Temp_123',
          media: result.data.media
        }

        let UpdateItem = [...this.state.posts]
        UpdateItem.unshift(newItem)
        this.setState({ posts: UpdateItem })

        const postsCopy = [...this.state.posts]
        const tempPostid = postsCopy.find(item => item._id === 'Temp_123')
        const tempPosttype = postsCopy.find(item => item.type === 'Temp_type')
        tempPostid._id = result.data._id
        tempPosttype.type = result.data.type
        this.setState(() => {
          return { posts: postsCopy }
        })
      }
    }
  }

  DeleteCommentCALL = async (id, postref) => {
    const api = API()
    await api.DeleteComment(id, postref)
    
    let UpdateItem = [...this.state.posts]
    const findPost = UpdateItem.find(x => x._id === postref)

    const filteritems = findPost.Comments.filter(item => item._id !== id)
    findPost.Comments = filteritems

    this.setState({
      posts: UpdateItem
    })
  }
  DeleteReplyCommentCALL = async (id, postref) => {
    const api = API()
    const result = await api.DeleteReplyComment(id, postref)

    let UpdateItem = [...this.state.posts]
    const findPost = UpdateItem.find(x => x._id === postref)

    findPost.Comments = result.data[0].Comments
    this.setState({ posts: UpdateItem })
  }

  DeletePostCALL = async (id, user, isMedia) => {
    const api = API()
    if (isMedia) await api.DeletePostPhoto(id)
    await api.DeletePost(id, user)
    const filteritems = this.state.posts.filter(item => item._id !== id)
    this.setState({
      posts: filteritems
    })
  }

  WritecommentCALL = async (ref, comments, users) => {
    if (comments !== '') {
      const api = API()
      const result = await api.WriteComment(ref, comments, users)

      const newItem = {
        _id: 'Temp_123',
        date: new Date(),
        postref: {
          _id: ref
        },
        commentReplyId: { _id: '' },
        repliedComments: [],
        comment: comments,
        user: {
          ProfilePic: this.state.ProfilePic,
          name: this.state.User_Name,
          _id: this.state.id
        }
      }

      let UpdateItem = [...this.state.posts]
      const findPost = UpdateItem.find(x => x._id === ref)
      // findPost.Comments.unshift(newItem)
      findPost.Comments.push(newItem)
      this.setState({ posts: UpdateItem })

      const postsCopy = [...this.state.posts]
      const tempComment = postsCopy
        .find(x => x._id === ref)
        .Comments.find(x => x._id === 'Temp_123')
      tempComment._id = result.data._id

      this.setState(() => {
        return { posts: postsCopy }
      })
    }
  }



  WritecommentReplyCALL = async (postref, comment, user, commentReplyId) => {
    if (comment !== '') {
      const api = API()
      const result = await api.WriteCommentReply(
        postref,
        comment,
        user,
        commentReplyId
      )
      let UpdateItem = [...this.state.posts]
      const findPost = UpdateItem.find(x => x._id === postref)
      findPost.Comments = result.data[0].Comments
      this.setState({ posts: UpdateItem })
    }
    // const newResult = this.searchTreefirst(findPost.Comments, commentReplyId)
  }
  // searchTreefirst = (array, replyId) => {
  //   let foundComment
  //     for (let index = 0; index < array.length; index++) {
  //       const element = array[index]
  //       if (element._id === replyId) {
  //         foundComment = element
  //         break
  //       } else {
  //         if (foundComment) break
  //         foundComment = this.searchTree(element.repliedComments, replyId)
  //       }
  //     }
  //   return foundComment
  // }
  // searchTree = (array, replyId) => {
  //   let foundCm
  //   for (let index = 0; index < array.length; index++) {
  //     const element = array[index]
  //     if (element.commentReplyId._id === replyId || element._id === replyId) {
  //       foundCm = element
  //       break
  //     } else if (element.repliedComments.length > 0) {
  //       var i
  //       var result = null
  //       for (i = 0; result == null && i < element.repliedComments.length; i++) {
  //         result = this.searchTree([element.repliedComments[i]], replyId)
  //       }
  //     }
  //   }
  //   return foundCm
  // }


  SearchUserCALL = async typedName => {
    const get = Cookies.get('redirect')
    this.setState({ userSearched: [] })
    if (get !== '/search') {
      Cookies.set('redirect', '/search')
      this.setState({
        redirect: '/search'
      })
    } else {
      const api = API()
      const result = await api.SearchUser(typedName)
      this.setState({
        userSearched: result.data.User
      })
    }
  }

  RegisterFunctCALL = async (
    Registername,
    Registeremail,
    Registersesso,
    Registerpassword,
    RegisterConfirmPassWord
  ) => {
    const isValid = this.validate(
      Registername,
      Registeremail,
      Registerpassword,
      RegisterConfirmPassWord
    )
    try {
      this.setState({
        RegisterError: ''
      })
      if (isValid) {
        const api = API()
        await api.RegisterFunct(
          Registername,
          Registeremail,
          Registersesso,
          Registerpassword,
          RegisterConfirmPassWord
        )
        this.setState({
          nameError: '',
          emailError: '',
          passwordError: '',
          ConfirmPassWordError: ''
        })
        this.setState({
          redirect: '/'
        })
      }
    } catch (error) {
      this.setState({
        RegisterError: error.message
      })
    }
  }

  RegisterErrortoNull = () => {
    this.setState({
      nameError: '',
      emailError: '',
      passwordError: '',
      ConfirmPassWordError: ''
    })
  }

  GetPostsCall = async () => {
    const id = Cookies.get('User_id')
    const api = API()
    const result = await api.GetAllPosts(id)
    this.setState({
      posts: result.data
    })
  }

  LoginGetCall = async () => {
    this.setState({
      loginError: ''
    })
    try {
      const api = API()
      const result = await api.LoginGet(this.state.email, this.state.password)

      Cookies.set('Auth_token', result.data.token)
      Cookies.set('User_id', result.data.ID)
      Cookies.set('User_Name', result.data.NAME)
      Cookies.set('redirect', '/home')
      const get = Cookies.get('redirect')
      this.setState(
        {
          redirectTF: true,
          redirect: get,
          email: '',
          password: ''
        },
        () => [
          this.getDatiPersonali(),
          this.getCookies(),
          this.GetPostsCall(),
          // this.getCommentsCall(),
          this.getFollowingAcceptedCall(),
          this.getFollowersAcceptedCall(),
          this.getFollowingAwaitingCall(),
          this.getFollowersAwaitingCall(),
          this.SetUSerPageData()
        ]
      )
    } catch (error) {
      this.setState({
        loginError: error.message
      })
    }
  }

  getDatiPersonali = async () => {
    try {
      const ID = Cookies.get('User_id')
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'auth-token': Cookies.get('Auth_token')
        }
      }
      const api = API()
      const result = await api.DatiPersonali(ID, config)
      this.setState({
        datiPersonali: result.data,
        ProfilePic: result.data.ProfilePic
      })
    } catch (error) {
      console.log(error)
    }
  }

  UpdateDatiPersonali = async e => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'auth-token': Cookies.get('Auth_token')
        }
      }
      e.preventDefault()
      const ID = Cookies.get('User_id')
      const NAME = this.state.datiPersonali.name
      const EMAIL = this.state.datiPersonali.email
      const BIRTHDATE = this.state.datiPersonali.BirthDate
      const SENTIMENTALE = this.state.datiPersonali.Sentimentale
      const SESSO = this.state.datiPersonali.sesso
      const BIO = this.state.datiPersonali.Bio
      const api = API()
      await api.UpdateDatiPersonal(
        ID,
        NAME,
        EMAIL,
        BIRTHDATE,
        SENTIMENTALE,
        SESSO,
        BIO,
        config
      )
      Cookies.set('User_Name', NAME)
      this.setState({
        User_Name: NAME
      })
    } catch (error) {
      console.log(error)
    }
  }

  uploadPicprofile = async ({ target: { files } }) => {
    try {
      // const config = {
      // 	headers: {
      // 		'Content-Type': 'application/json',
      // 		'auth-token': Cookies.get('Auth_token')
      // 	}
      // };
      const ID = Cookies.get('User_id')
      let data = new FormData()
      data.append('file', files[0])
      const api = API()
      await api.deletePictureprofile(ID)
      const result = await api.uploadPictureprofile(ID, data)
      const postsCopy = [...this.state.posts]
      const commentsCopy = [...this.state.comments]

      const editedPosts = postsCopy.filter(x => x.user._id === this.state.id)
      const editedComments = commentsCopy.filter(
        x => x.user._id === this.state.id
      )

      editedPosts.forEach(p => {
        p.user.ProfilePic = result.data.ProfilePic
      })
      editedComments.forEach(c => {
        c.user.ProfilePic = result.data.ProfilePic
      })

      if (result) {
        this.setState(() => {
          return {
            ProfilePic: result.data.ProfilePic,
            posts: editedPosts
          }
        })
      }
    } catch (error) {
      console.log(error)
    }
  }

  updatePasswordCall = async () => {
    try {
      if (this.state.NewPassword === this.state.ConfirmPassword) {
        const config = {
          headers: {
            'Content-Type': 'application/json',
            'auth-token': Cookies.get('Auth_token')
          }
        }
        const ID = Cookies.get('User_id')
        const data = {
          password: this.state.NewPassword
        }
        const api = API()
        const result = await api.updatePassword(ID, data, config)
        this.setState({
          NewPassword: '',
          ConfirmPassword: ''
        })
        return result
      } else {
        this.setState({
          ErrorMessage: 'The Passwords Are Not The Same',
          NewPassword: '',
          ConfirmPassword: ''
        })
        return 'not done'
      }
    } catch (error) {
      console.log(error)
    }
  }

  deleteAccountCall = async () => {
    try {
      const ID = Cookies.get('User_id')
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'auth-token': Cookies.get('Auth_token')
        }
      }
      const api = API()
      await api.deleteAccount(ID, config)
    } catch (error) {
      console.log(error)
    }
  }


  getFollowingAcceptedCall = async () => {
    const ID = Cookies.get('User_id')
    const api = API()
    const result = await api.getFollowingAccepted(ID)
    if (result) {
      this.setState({
        FollowingAccepted: result.data.Friends,
        numberOfFollwingAccepted: result.data.count
      })
    }
  }

  getFollowersAcceptedCall = async () => {
    const ID = Cookies.get('User_id')
    const api = API()
    const result = await api.getFollowersAccepted(ID)
    if (result) {
      this.setState({
        FollowersAccepted: result.data.Friends,
        numberOfFollwersAccepted: result.data.count
      })
    }
  }

  getFollowingAwaitingCall = async () => {
    const ID = Cookies.get('User_id')
    const api = API()
    const result = await api.getFollowingAwaiting(ID)
    if (result !== undefined) {
      this.setState({
        FollowingAwaiting: result.data.Friends,
        numberOfFollwingawaiting: result.data.count
      })
    }
  }

  getFollowersAwaitingCall = async () => {
    const ID = Cookies.get('User_id')
    const api = API()
    const result = await api.getFollowersAwaiting(ID)
    if (result !== undefined) {
      this.setState({
        FollowersAwaiting: result.data.Friends,
        numberOfFollwersAwaiting: result.data.count
      })
    }
  }

  SendFriendRequestCall = async (
    secondUserData,
    NAME,
    PROFILEPIC,
    BIO,
    SENTIMENTALE,
    BIRTHDATE
  ) => {
    try {
      const mainUserData = Cookies.get('User_id')
      const situationshipData = 'awaiting'
      const api = API()
      const result = await api.SendFriendRequest(
        mainUserData,
        secondUserData,
        situationshipData
      )
      const newItem = {
        date: new Date(),
        mainUser: {
          _id: this.state.id,
          name: this.state.datiPersonali.name,
          email: this.state.datiPersonaliemail,
          sesso: this.state.datiPersonali.sesso
        },
        secondUser: {
          name: NAME,
          ProfilePic: PROFILEPIC,
          Bio: BIO,
          Sentimentale: SENTIMENTALE,
          BirthDate: BIRTHDATE,
          _id: secondUserData
        },
        situationship: 'awaiting',
        _id: 'Temp_123'
      }

      let UpdateItem = [...this.state.FollowingAwaiting]
      UpdateItem.unshift(newItem)
      this.setState({ FollowingAwaiting: UpdateItem })

      const FollowingAwa = [...this.state.FollowingAwaiting]
      const tempPFollAw = FollowingAwa.find(item => item._id === 'Temp_123')
      tempPFollAw._id = result.data._id

      this.setState(() => {
        return {
          FollowingAwaiting: FollowingAwa,
          numberOfFollwingawaiting: this.state.numberOfFollwingawaiting + 1
        }
      })
    } catch (error) {
      console.log({ error })
    }
  }

  respondFriendRequestCall = async (
    ID,
    NAME,
    PROFILEPIC,
    BIO,
    SENTIMENTALE,
    BIRTHDATE,
    _ID
  ) => {
    try {
      const data = {
        _id: ID,
        secondUser: Cookies.get('User_id'),
        situationship: 'accepted'
      }
      const api = API()
      await api.respondFriendRequest(data)
      const newItem = {
        date: new Date(),
        mainUser: {
          name: NAME,
          ProfilePic: PROFILEPIC,
          Bio: BIO,
          Sentimentale: SENTIMENTALE,
          BirthDate: BIRTHDATE,
          _id: _ID
        },
        secondUser: {
          _id: this.state.id,
          name: this.state.datiPersonali.name,
          email: this.state.datiPersonaliemail,
          sesso: this.state.datiPersonali.sesso
        },
        situationship: 'accepted',
        _id: ID
      }
      let UpdateItem = [...this.state.FollowersAccepted]
      UpdateItem.unshift(newItem)

      const FollowersAww = this.state.FollowersAwaiting.filter(
        item => item._id !== ID
      )

      this.setState({
        FollowersAwaiting: FollowersAww,
        numberOfFollwersAwaiting: this.state.numberOfFollwersAwaiting - 1,

        FollowersAccepted: UpdateItem,
        numberOfFollwersAccepted: this.state.numberOfFollwersAccepted + 1
      })
    } catch (error) {
      console.log({ error })
    }
  }

  deleteFollowingAwaiting = async (_id, secondUserData) => {
    try {
      const mainUserData = Cookies.get('User_id')
      const api = API()
      await api.deleteFriendRequest(_id, mainUserData, secondUserData)

      const filteritemsAW = this.state.FollowingAwaiting.filter(
        item => item._id !== _id
      )
      this.setState({
        FollowingAwaiting: filteritemsAW,
        numberOfFollwingawaiting: this.state.numberOfFollwingawaiting - 1
      })
    } catch (error) {
      console.log({ error })
    }
  }

  deleteFollowersAwaiting = async (_id, mainUserData) => {
    try {
      const secondUserData = Cookies.get('User_id')
      const api = API()
      await api.deleteFriendRequest(_id, mainUserData, secondUserData)

      const filteritemsAW = this.state.FollowersAwaiting.filter(
        item => item._id !== _id
      )
      this.setState({
        FollowersAwaiting: filteritemsAW,
        numberOfFollwersAwaiting: this.state.numberOfFollwersAwaiting - 1
      })
    } catch (error) {
      console.log({ error })
    }
  }

  deleteFollowingAccepted = async (_id, secondUserData) => {
    try {
      const mainUserData = Cookies.get('User_id')
      const api = API()
      await api.deleteFriendRequest(_id, mainUserData, secondUserData)
      const filteritemsAcc = this.state.FollowingAccepted.filter(
        item => item._id !== _id
      )
      this.setState({
        FollowingAccepted: filteritemsAcc,
        numberOfFollwingAccepted: this.state.numberOfFollwingAccepted - 1
      })
    } catch (error) {
      console.log({ error })
    }
  }

  deleteFollowersCall = async (_id, mainUserData) => {
    try {
      const secondUserData = Cookies.get('User_id')
      const api = API()
      await api.deleteFriendRequest(_id, mainUserData, secondUserData)
      const filteritemsAcc = this.state.FollowersAccepted.filter(
        item => item._id !== _id
      )
      this.setState({
        FollowersAccepted: filteritemsAcc,
        numberOfFollwersAccepted: this.state.numberOfFollwersAccepted - 1
      })
    } catch (error) {
      console.log({ error })
    }
  }

  forgetPasswordCall = async EMAIL => {
    try {
      const api = API()
      const data = {
        email: EMAIL
      }
      const result = await api.forgetPassword(data)
      this.setState({
        resetPasswordMessageError: '',
        resetPasswordMessage: result.data.name
      })
    } catch (error) {
      this.setState({
        resetPasswordMessageError: error.message
      })
    }
  }

  resetPasswordCall = async (LINK, PASSWORD) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'auth-token': LINK
        }
      }
      const data = {
        resetLink: LINK,
        password: PASSWORD
      }
      const api = API()
      await api.resetPassword(data, config)
    } catch (error) {}
  }

  likeCall = async (postref, like) => {
    const api = API()
    try {
      const data = {
        postref,
        like,
        user: this.state.id
      }
      const result = await api.like(data)
      const postCopy = [...this.state.posts]
      const index = this.state.posts.findIndex(x => x._id === postref)
      const isUserlikeExist = this.state.posts[index].Likes.some(
        x => x.user._id === result.data.user._id
      )
      if (isUserlikeExist) {
        const tempLike = postCopy[index].Likes.find(
          x => x.user._id === result.data.user._id
        )
        tempLike._id = result.data._id
        tempLike.like = result.data.like
        this.setState({
          posts: postCopy
        })
      } else {
        postCopy[index].Likes.push(result.data)
        this.setState({
          posts: postCopy
        })
      }
    } catch (error) {
      console.log({ error })
    }
  }

  deleteLikeCall = async postref => {
    const api = API()

    try {
      await api.DeleteLike(postref, this.state.id)
      let filterdPosts = []
      let foundId = null
      this.state.posts.forEach(p => {
        const foundLiked = p.Likes.find(
          L => L.postref === postref && L.user._id === this.state.id
        )
        if (foundLiked) {
          foundId = foundLiked._id
          p.Likes = p.Likes.filter(x => x._id !== foundId)
          filterdPosts = [...filterdPosts, p]
        } else {
          filterdPosts = [...filterdPosts, p]
        }
      })
      this.setState({
        posts: filterdPosts
      })
    } catch (error) {
      console.log({ error })
    }
  }

  //---------------- END API JS -----------------//

  //---------------- LogIN Start -----------------//

  validate = (
    Registername,
    Registeremail,
    Registerpassword,
    RegisterConfirmPassWord
  ) => {
    let nameError = ''
    let emailError = ''
    let passwordError = ''
    let ConfirmPassWordError = ''

    if (Registername.length < 4) {
      nameError = 'Name Should be at least 4 characters'
    }
    if (!Registeremail.includes('@')) {
      emailError = 'Invalid email'
    }
    if (Registerpassword.length < 4) {
      passwordError = 'Password Should be at least 4 characters'
    }
    if (Registerpassword !== RegisterConfirmPassWord) {
      ConfirmPassWordError = 'Passwords are not the same'
    }

    if (nameError || emailError || passwordError || ConfirmPassWordError) {
      this.setState({
        nameError,
        emailError,
        passwordError,
        ConfirmPassWordError
      })
      setTimeout(() => {
        this.setState({
          nameError: '',
          emailError: '',
          passwordError: '',
          ConfirmPassWordError: ''
        })
      }, 3000)
      return false
    }

    return true
  }

  loginCHangeHandler = e => {
    this.setState({
      email: document.querySelector('#email').value,
      password: document.querySelector('#password').value
    })
  }

  getCookies = async () => {
    const token = Cookies.get('Auth_token')
    const id = Cookies.get('User_id')
    const redirect = Cookies.get('redirect')
    const User_Name = Cookies.get('User_Name')

    this.setState({
      token,
      id,
      redirect,
      User_Name
    })
    if (this.state.token !== undefined) {
      this.setState({
        redirectTF: true
      })
    }
  }

  //---------------- LogIN Out -----------------//
  LogeOut = () => {
    Cookies.remove('Auth_token')
    Cookies.remove('User_id')
    Cookies.remove('redirect')
    Cookies.remove('User_Name')
    Cookies.remove('UserPage_id')
    Cookies.remove('UserPage_ProfilePic')
    Cookies.remove('UserPage_Name')
    Cookies.remove('UserPage_sesso')
    this.setState({
      redirectTF: false,
      token: undefined,
      redirect: undefined
    })
  }

  // ---------------- Get To LinK ---------------- //

  ridirectFunction = link => {
    Cookies.set('redirect', link)
    this.setState({
      redirect: link
    })
  }

  // ---------------- Update Dati Personali ---------------- //

  onchangeHandPassword = () => {
    const NewPassword = document.querySelector('#DP_password').value
    const ConfirmPassword = document.querySelector('#DP_Confirmpassword').value
    this.setState({
      NewPassword,
      ConfirmPassword
    })
  }

  cancelUpdatePassword = () => {
    this.setState({
      NewPassword: '',
      ConfirmPassword: ''
    })
  }

  onchangeHandlerDatiPersonali = e => {
    let datipersonaliCOpy = { ...this.state.datiPersonali }
    datipersonaliCOpy[e.target.name] = e.target.value
    this.setState({ datiPersonali: datipersonaliCOpy })
  }

  // ---------------- Following ID Check ---------------- //

  IdFollowingChek = ID => {
    let templist = this.state.FollowingAccepted
    const FollowingIdACC = templist.find(doc => doc.secondUser._id === ID)
    return FollowingIdACC
  }

  IdAwaitingingChekFollowing = ID => {
    let templist = this.state.FollowingAwaiting
    const FollowingIdAW = templist.find(doc => doc.secondUser._id === ID)
    return FollowingIdAW
  }

  // ---------------- Get UserPage data ---------------- //

  SetUSerPageData = () => {
    const _id = Cookies.get('UserPage_id')
    const ProfilePic = Cookies.get('UserPage_ProfilePic')
    const User_Name = Cookies.get('UserPage_Name')
    const sesso = Cookies.get('UserPage_sesso')
    this.setState({
      UserPageData: {
        _id,
        ProfilePic,
        User_Name,
        sesso
      }
    })
  }

  GetUSerPageData = (ID, PIC, NAME, SESSO) => {
    if (PIC === undefined) {
      Cookies.set('UserPage_id', ID)
      Cookies.set('UserPage_Name', NAME)
      Cookies.remove('UserPage_ProfilePic')
      Cookies.set('UserPage_sesso', SESSO)
      this.setState({
        UserPageData: {
          _id: ID,
          ProfilePic: undefined,
          User_Name: NAME,
          sesso: SESSO
        }
      })
    } else {
      Cookies.set('UserPage_id', ID)
      Cookies.set('UserPage_ProfilePic', PIC)
      Cookies.set('UserPage_Name', NAME)
      Cookies.set('UserPage_sesso', SESSO)
      this.setState({
        UserPageData: {
          _id: ID,
          ProfilePic: PIC,
          User_Name: NAME,
          sesso: SESSO
        }
      })
    }

    // this.SetUSerPageData()
  }
  render () {
    return (
      <SocialMediaContext.Provider
        value={{
          ...this.state,
          getCookies: this.getCookies,
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
          SendFriendRequestCall: this.SendFriendRequestCall,
          respondFriendRequestCall: this.respondFriendRequestCall,
          deleteFollowersCall: this.deleteFollowersCall,
          deleteFollowingAccepted: this.deleteFollowingAccepted,
          deleteFollowersAwaiting: this.deleteFollowersAwaiting,
          deleteFollowingAwaiting: this.deleteFollowingAwaiting,
          IdFollowingChek: this.IdFollowingChek,
          IdAwaitingingChekFollowing: this.IdAwaitingingChekFollowing,
          GetUSerPageData: this.GetUSerPageData,
          forgetPasswordCall: this.forgetPasswordCall,
          resetPasswordCall: this.resetPasswordCall,
          likeCall: this.likeCall,
          deleteLikeCall: this.deleteLikeCall,
          WritecommentReplyCALL: this.WritecommentReplyCALL,
          DeleteReplyCommentCALL: this.DeleteReplyCommentCALL,
        }}
      >
        {this.props.children}
      </SocialMediaContext.Provider>
    )
  }
}
const SocialMediaConsumer = SocialMediaContext.Consumer

export { SocialMediaProvider, SocialMediaConsumer, SocialMediaContext }
