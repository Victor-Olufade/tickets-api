import express from 'express'
import { loginUser, registerUser, getMe } from '../controllers/userContoller.js'
import { protect } from '../middleWare/authMiddleware.js'

const router = express.Router()

router.post('/', registerUser)

router.post('/login', loginUser)

router.get('/me', protect, getMe)

export default router