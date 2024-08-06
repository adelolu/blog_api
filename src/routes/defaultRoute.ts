import express , { Express, Request, Response , Application }from 'express'
import { Signup, Login,VerifyUser, Logout } from '../controllers/auth';
import { Home } from '../controllers/blog';
const router = express.Router()


router.get("/", Home)
router.post("/signup", Signup)
router.post("/login", Login)
router.post("/logout", Logout)
router.get("/verifyuser", VerifyUser)

 export default router;
