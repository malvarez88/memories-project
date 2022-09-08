import axios from "axios";

const API = axios.create({ baseURL: 'http://localhost:3001'});


export const fetchPost = async () => {
  try {
    const data = await API.get('/posts');
    return data.data;
  } catch (error) {
    console.log(error);
  }
};

export const createPost = async (newPost) => {
  try {
    const nPost = await API.post('/posts', newPost);
    return nPost.data;
  } catch (error) {
    console.log(error);
  }
};

export const updatePost = async (id, updatedPost) => {
  try {
    const uPost = await API.patch(`/posts/${id}`, updatedPost);
    return uPost.data;
  } catch (error) {
    console.log(error);
  }
};

export const deletePost = async (id) => {
  try {
    const dPost = await API.delete(`posts/${id}`);
    return dPost;
  } catch (error) {
    console.log(error);
  }
};

export const likePost = async (id) => {
  try {
    const likeP = await API.patch(`posts/${id}/likePost`);
    return likeP;
  } catch (error) {
    console.log(error);
  }
};


export const signin = async (formData) => {
  try {
    const sIn = await API.post('/user/signin', formData);
    return sIn;
  } catch (error) {
    console.log(error);
  }
};

// export const signup = async (formData) => {
// console.log("🚀 ~ file: index.js ~ line 62 ~ signup ~ formData", formData)
//   try {
//     const sUp = await API.post('/user/signup', formData);
//     console.log("🚀 ~ file: index.js ~ line 65 ~ signup ~ sUp", sUp) //undefined
    
//     return sUp ;
//   } catch (error) {
//     console.log(error);
//   }
// };