import axios from 'axios';

const url = 'http://localhost:3001/posts';

export const fetchPost = async () => {
    const data = await axios.get(url);   
    return data.data;
}

export const createPost = async (newPost) => {
    const nPost = await axios.post(url, newPost);
    return nPost.data;
}

