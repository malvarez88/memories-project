import axios from "axios";

const url = "http://localhost:3001/posts";

export const fetchPost = async () => {
  try {
    const data = await axios.get(url);
    return data.data;
  } catch (error) {
    console.log(error);
  }
};

export const createPost = async (newPost) => {
  try {
    const nPost = await axios.post(url, newPost);
    return nPost.data;
  } catch (error) {
    console.log(error);
  }
};

export const updatePost = async (id, updatedPost) => {
    console.log("🚀 ~ file: index.js ~ line 24 ~ updatePost ~ updatedPost", updatedPost)
    
  try {
    const uPost = await axios.patch(`${url}/${id}`, updatedPost);
    return uPost.data;
  } catch (error) {
    console.log(error);
  }
};
