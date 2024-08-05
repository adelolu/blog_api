import express , { Express, Request, Response , Application }from 'express'
import { Signup, Login,verifyuser, logout } from '../controllers/auth';
import { Home } from '../controllers/blog';
const router = express.Router()


router.get("/", Home)
router.post("/signup", Signup)
router.post("/login", Login)
router.post("/logout", logout)
router.get("/verifyuser", verifyuser)

 export default router;
