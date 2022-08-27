import express from 'express'
import { createuser,loginUser } from '../controllers/authController.js'
const router=express.Router()
router.post("/createuser",createuser)
router.post("/loginUser",loginUser)
export default router