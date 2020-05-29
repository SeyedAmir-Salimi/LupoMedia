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
            })
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
        }
    }
}
