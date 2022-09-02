import axios from 'axios';

const url = 'http://localhost:3001/posts';

export const fetchPost = () => {
    axios.get(url)
}

