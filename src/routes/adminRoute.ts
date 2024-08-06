import express , { Express, Request, Response , Application }from 'express'
import { AddPost, Post, EditPost } from '../controllers/admin';
const router = express.Router()



router.post("/post", AddPost)
router.get("/", Post)
router.post("/edit", EditPost)


 export default router;
