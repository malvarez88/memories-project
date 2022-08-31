import express from "express";

import { getPosts } from '../controllers/posts.controllers.js'

const router = express.Router();

// https://localhost:3001/posts

router.get('/', getPosts);

export default router;