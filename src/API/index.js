import Axios from 'axios'


export default function API() {

    return {

        async DeletePost(id, user) {
            await Axios.delete(`http://localhost:3000/posts/${id}`, { data: { user: user } })
                .then(res => {
                    console.log(res.data)
                })
        },

        async DeleteComment(id, postref) {
            await Axios.delete(`http://localhost:3000/comments/${id}`, { data: { postref: postref } })
                .then(res => {
                    console.log(res.data)
                })
        },

        async WriteComment(ref, comments, users) {
            const result = await Axios.post(`http://localhost:3000/comments`, {
                postref: ref,
                comment: comments,
                user: users,
            });
            return result
        },

        async AddPostwithoutpic(contextid, PostCaption) {
            const result = await Axios.post(`http://localhost:3000/posts/withoutpicture`, {
                user: contextid,
                caption: PostCaption,
            });
            return result
        },

        async AddPostwithpic(contextid, PostCaption) {
            const element = document.querySelector("#PO_Pic").files[0]
            let data = new FormData();
            const ID = data.append('user', contextid);
            const CAPTION = data.append('caption', PostCaption);
            data.append('picture', element)
            const result = await Axios.post(`http://localhost:3000/posts/withpicture`, data, ID, CAPTION)
            return result

        },

        async SearchUser(typedName) {
            const name = typedName
            const result = await Axios.get(`http://localhost:3000/users/search/${name}`)
            return result
        },
        
        async RegisterFunct(Registername, Registeremail, Registersesso, Registerpassword) {
            try {
                const result = await Axios.post(`http://localhost:3000/enter/signup`, {
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
            const result = Axios.post(`http://localhost:3000/enter/login`, {
                email: LoginEmail,
                password: LoginPassword
            });
            return result
        },

        async GetAllPosts(id){
            const result = await  Axios.get(`http://localhost:3000/posts/${id}`)
            return result
        },

        async LoginGet(email, password){
            try {
                const result = await Axios.post(`http://localhost:3000/enter/login`, {
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
                const result =  await Axios.get(`http://localhost:3000/datiPersonali/${ID}`, config)
                return result
                
            } catch (error) {
                console.log(error);
                
            }
        },

        async UpdateDatiPersonal (ID,NAME,EMAIL,BIRTHDATE,SENTIMENTALE,SESSO,BIO,config) {
            try {
                const result =  await Axios.patch (
                    `http://localhost:3000/datiPersonali/${ID}`,
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
                console.log(result);
                return result
            } catch (error) {
                console.log(error);
            }
        },

        async uploadPictureprofile (ID, data,config) {
            try {
                const result =  await Axios.put(`http://localhost:3000/datiPersonali/${ID}`, data, config)
                console.log(result);
                return result
            } catch (error) {
                console.log(error);
            }
        },

        async updatePassword(ID, data , config ){
                try {
                    const result = await Axios.put(`http://localhost:3000/datiPersonali/changepassword/${ID}`, data, config)
                    return result
                } catch (error) {
                    console.log(error);
                }
        },

        async deleteAccount (ID, config){
            try {
                const result = Axios.delete(`http://localhost:3000/datiPersonali/${ID}`, config)
                return result
            } catch (error) {
                console.log(error);
            }
        },

        async getComments(){
            try {
                const result = await Axios.get(`http://localhost:3000/comments`)
                return result
            } catch (error) {
                console.log(error);
            }
        },

        async getFollowingAccepted(ID){
            try {
                const result = await Axios.get(`http://localhost:3000/friends/followingAcc/${ID}`)
                return result
            } catch (error) {
                console.log(error);
            }
        },

        async getFollowersAccepted(ID){
            try {
                const result = await Axios.get(`http://localhost:3000/friends/followersAcc/${ID}`)
                return result
            } catch (error) {
                console.log(error);
            }
        },

        async getFollowingAwaiting(ID){
            try {
                const result = await Axios.get(`http://localhost:3000/friends/followingAw/${ID}`)
                return result
            } catch (error) {
                console.log(error);
            }
        },
        async getFollowersAwaiting(ID){
            try {
                const result = await Axios.get(`http://localhost:3000/friends/followersAw/${ID}`)
                return result
            } catch (error) {
                console.log(error);
            }
        },

        async SendFriendRequest(mainUserData,secondUserData,situationshipData){
            try {
                const result = await Axios.post(`http://localhost:3000/friends/request`, {
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
                const result = await Axios.delete(`http://localhost:3000/friends`, { data: {_id: _id, mainUser: mainUserData , secondUser: secondUserData}})
                return result
            } catch (error) {
                throw new Error(error.response.data)
            }
        },
        async respondFriendRequest(data){
            try {
                const result = await Axios.put(`http://localhost:3000/friends/request`, data )
                return result
            } catch (error) {
                throw new Error(error.response.data)
            }
        },

    }
}
