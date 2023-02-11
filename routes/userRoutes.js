import express from 'express'
import { loginUser, registerUser, getMe, verifyUser, resendOtp } from '../controllers/userContoller.js'
import { protect } from '../middleWare/authMiddleware.js'

const router = express.Router()

router.post('/', registerUser)

router.post('/verify', protect, verifyUser)

router.post('/login', loginUser)

router.get('/me', protect, getMe)

router.post('/resendotp', resendOtp)

export default router