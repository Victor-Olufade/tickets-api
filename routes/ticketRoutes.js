import express from 'express'
import { protect } from '../middleWare/authMiddleware.js'
import { getTickets, createTicket, getSingleTicket, deleteTicket, updateTicket } from '../controllers/ticketController.js'
import noteRouter from './noteRoute.js'

const router = express.Router()

router.use('/:ticketId/notes', noteRouter)

router.route('/').get(protect, getTickets).post(protect, createTicket)
router.route('/:id').get(protect, getSingleTicket).delete(protect, deleteTicket).put(protect, updateTicket)

export default router