import express , { Express, Request, Response , Application }from 'express'
import { addpost } from '../controllers/admin';
const router = express.Router()


// router.get("/", Home)
router.post("/post", addpost)


 export default router;
