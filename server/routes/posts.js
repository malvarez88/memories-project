import express from "express";

import { getPosts, createPost } from '../controllers/posts.controllers.js'

const router = express.Router();

// https://localhost:3001/posts

router.get('/', getPosts);
router.post('/', createPost);


export default router;