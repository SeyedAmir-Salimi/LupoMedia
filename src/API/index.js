import Axios from 'axios'


export default function API() {

    return {

        async DeletePost(id, user) {
            await Axios.delete(`https://lupomedia-api.herokuapp.com/posts/${id}`, { data: { user: user } })

        },
        async DeletePostPhoto (id) {
            try {
                const result =  await Axios.delete(`https://lupomedia-api.herokuapp.com/files/photoPost/${id}`)
                return result
            } catch (error) {
                console.log(error);
            }
        },
        async DeleteComment(id, postref) {
            await Axios.delete(`https://lupomedia-api.herokuapp.com/comments/${id}`, { data: { postref: postref } })

        },

        async WriteComment(ref, comments, users) {
            const result = await Axios.post(`https://lupomedia-api.herokuapp.com/comments`, {
                postref: ref,
                comment: comments,
                user: users,
            });
            return result
        },

        async AddPostwithoutpic(contextid, PostCaption) {
            const result = await Axios.post(`https://lupomedia-api.herokuapp.com/posts/withoutpicture`, {
                user: contextid,
                caption: PostCaption,
            });
            return result
        },
        
        async AddPostwithpic(contextid, PostCaption , extension) {
            const element = document.querySelector("#PO_Pic").files[0]
            let data = new FormData();
            const ID = data.append('user', contextid);
            const CAPTION = data.append('caption', PostCaption);
            const EXTENSION = data.append('extension', extension);
            data.append('file', element)
            const result = await Axios.post(`https://lupomedia-api.herokuapp.com/posts/withpicture`, data, ID, CAPTION , EXTENSION)
            return result

        },

        async SearchUser(typedName) {
            const name = typedName
            const result = await Axios.get(`https://lupomedia-api.herokuapp.com/users/search/${name}`)
            return result
        },
        
        async RegisterFunct(Registername, Registeremail, Registersesso, Registerpassword) {
            try {
                const result = await Axios.post(`https://lupomedia-api.herokuapp.com/enter/signup`, {
                    name: Registername,
                    email: Registeremail,
                    sesso: Registersesso,
                    password: Registerpassword,
                });
                return result
            } catch (error) {
                throw new Error(error.response.data)
            }
        },
        async Login(LoginEmail, LoginPassword) {
            const result = Axios.post(`https://lupomedia-api.herokuapp.com/enter/login`, {
                email: LoginEmail,
                password: LoginPassword
            });
            return result
        },

        async GetAllPosts(id){
            const result = await  Axios.get(`https://lupomedia-api.herokuapp.com/posts/${id}`)
            return result
        },

        async LoginGet(email, password){
            try {
                const result = await Axios.post(`https://lupomedia-api.herokuapp.com/enter/login`, {
                    email: email,
                    password: password
                })
                return result
            } catch (error) {
               throw new Error(error.response.data)
            }
        },
        
        async DatiPersonali (ID , config){
            try {
                const result =  await Axios.get(`https://lupomedia-api.herokuapp.com/datiPersonali/${ID}`, config)
                return result
                
            } catch (error) {
                console.log(error);
                
            }
        },

        async UpdateDatiPersonal (ID,NAME,EMAIL,BIRTHDATE,SENTIMENTALE,SESSO,BIO,config) {
            try {
                const result =  await Axios.patch (
                    `https://lupomedia-api.herokuapp.com/datiPersonali/${ID}`,
                    [
                        {
                            propName: 'name',
                            value: NAME
                        },
                        {
                            propName: 'email',
                            value: EMAIL
                        },
                        {
                            propName: 'BirthDate',
                            value: BIRTHDATE
                        },
                        {
                            propName: 'sesso',
                            value: SESSO
                        },
                        {
                            propName: 'Sentimentale',
                            value: SENTIMENTALE
                        },
                        {
                            propName: 'Bio',
                            value: BIO
                        }
                    ],
                    config
                )
                return result
            } catch (error) {
                console.log(error);
            }
        },

        async deletePictureprofile (ID) {
            try {
                const result =  await Axios.delete(`https://lupomedia-api.herokuapp.com/files/photoProfile/${ID}`)
                return result
            } catch (error) {
                console.log(error);
            }
        },
        async uploadPictureprofile (ID, data) {
            try {
                const result =  await Axios.put(`https://lupomedia-api.herokuapp.com/datiPersonali/${ID}`, data)
                return result
            } catch (error) {
                console.log(error);
            }
        },

        async updatePassword(ID, data , config ){
                try {
                    const result = await Axios.put(`https://lupomedia-api.herokuapp.com/datiPersonali/changepassword/${ID}`, data, config)
                    return result
                } catch (error) {
                    console.log(error);
                }
        },

        async deleteAccount (ID, config){
            try {
                const result = Axios.delete(`https://lupomedia-api.herokuapp.com/datiPersonali/${ID}`, config)
                return result
            } catch (error) {
                console.log(error);
            }
        },

        async getComments(){
            try {
                const result = await Axios.get(`https://lupomedia-api.herokuapp.com/comments`)
                return result
            } catch (error) {
                console.log(error);
            }
        },

        async getFollowingAccepted(ID){
            try {
                const result = await Axios.get(`https://lupomedia-api.herokuapp.com/friends/followingAcc/${ID}`)
                return result
            } catch (error) {
                console.log(error);
            }
        },

        async getFollowersAccepted(ID){
            try {
                const result = await Axios.get(`https://lupomedia-api.herokuapp.com/friends/followersAcc/${ID}`)
                return result
            } catch (error) {
                console.log(error);
            }
        },

        async getFollowingAwaiting(ID){
            try {
                const result = await Axios.get(`https://lupomedia-api.herokuapp.com/friends/followingAw/${ID}`)
                return result
            } catch (error) {
                console.log(error);
            }
        },
        async getFollowersAwaiting(ID){
            try {
                const result = await Axios.get(`https://lupomedia-api.herokuapp.com/friends/followersAw/${ID}`)
                return result
            } catch (error) {
                console.log(error);
            }
        },

        async SendFriendRequest(mainUserData,secondUserData,situationshipData){
            try {
                const result = await Axios.post(`https://lupomedia-api.herokuapp.com/friends/request`, {
                    mainUser: mainUserData,
                    secondUser: secondUserData,
                    situationship:situationshipData
                })
                return result
            } catch (error) {
                throw new Error(error.response.data)
            }
        },

        async deleteFriendRequest(_id, mainUserData,secondUserData){
            try {
                const result = await Axios.delete(`https://lupomedia-api.herokuapp.com/friends`, { data: {_id: _id, mainUser: mainUserData , secondUser: secondUserData}})
                return result
            } catch (error) {
                throw new Error(error.response.data)
            }
        },
        async respondFriendRequest(data){
            try {
                const result = await Axios.put(`https://lupomedia-api.herokuapp.com/friends/request`, data )
                return result
            } catch (error) {
                throw new Error(error.response.data)
            }
        },

        async forgetPassword(data){
            try {
                const result = await Axios.put(`https://lupomedia-api.herokuapp.com/resetPassword`, data )
                return result
            } catch (error) {
                throw new Error(error.response.data)
            }
        },
        async resetPassword(data, config){
            try {
                const result = await Axios.patch(`https://lupomedia-api.herokuapp.com/resetPassword/set`, data, config)
                return result
            } catch (error) {
                throw new Error(error.response.data)
            }
        },
        async like(data){
            try {
                const result = await Axios.post(`https://lupomedia-api.herokuapp.com/likes`, data)
                return result
            } catch (error) {
                throw new Error(error.response.data)
            }
        },

        async DeleteLike(postref, user) {
            try {
                await Axios.delete(`https://lupomedia-api.herokuapp.com/likes`, { data: { postref, user } })
                    .then(res => {
                        console.log(res.data)
                    })
            } catch (error) {
                throw new Error(error.response.data)
            }
        },

    }
}
