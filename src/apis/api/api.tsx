import axios from "axios";


export const addPost = async (target) => {
    try {
        const formData = new FormData()
        formData.append('images', target.images)
        formData.append('content', target.content)
        const response = await axios.post(`${process.env.REACT_APP_SERVER_URL_2}/api/posts`, formData, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                'Content-Type': 'multipart/form-data',
            },
        })
        console.log(response)
        return response.data
    } catch (error) {
        if (error.resonse) {
        }
    }
}
