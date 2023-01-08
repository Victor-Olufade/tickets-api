import express from 'express'
import { addNotesForATicket, getNotesForATicket } from '../controllers/noteController.js'
import { protect } from '../middleWare/authMiddleware.js'


const router = express.Router({mergeParams: true})

router.route('/').get(protect, getNotesForATicket).post(protect, addNotesForATicket)

export default router