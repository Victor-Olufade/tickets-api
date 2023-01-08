import Ticket from "../models/ticketModel.js";
import User from "../models/userModel.js";
import asyncHandler from 'express-async-handler'

export const getTickets = asyncHandler(async(req, res)=>{
    const user = await User.findById(req.user.id)
    if(!user){
        res.status(401)
        throw new Error('User not found')
    }

    const tickets = await Ticket.find({user: req.user.id})

    res.status(200).json({
        message: 'Successful',
        tickets
    })
})


export const createTicket = asyncHandler(async(req, res)=>{
    const {product, description} = req.body

    if(!product || !description){
        res.status(400)
        throw new Error('Please provide product and description')
    }

    const user = await User.findById(req.user.id)
    if(!user){
        res.status(401)
        throw new Error('User not found')
    }
     const ticket = await Ticket.create({
        product,
        description,
        user: req.user.id,
        status: 'new'
     })

     res.status(201).json({
        message: 'Ticket successfully created',
        ticket
     })

})



export const getSingleTicket = asyncHandler(async(req, res)=>{
    const user = await User.findById(req.user.id)
    if(!user){
        res.status(401)
        throw new Error('User not found')
    }

    const ticket = await Ticket.findById(req.params.id)
    
    if(!ticket){
        res.status(404)
        throw new Error("Ticket not found")
    }

    if(ticket.user.toString() !== req.user.id){
        res.status(401)
        throw new Error("Unauthorized")
    }

    res.status(200).json({
        message: 'Successful',
        ticket
    })
})

export const deleteTicket = asyncHandler(async(req, res)=>{
    const user = await User.findById(req.user.id)
    if(!user){
        res.status(401)
        throw new Error('User not found')
    }

    const ticket = await Ticket.findById(req.params.id)

    if(!ticket){
        res.status(404)
        throw new Error("Ticket not found")
    }

    if(ticket.user.toString() !== req.user.id){
        res.status(401)
        throw new Error("Unauthorized")
    }
     
    await ticket.remove()

    res.status(200).json({
        message: 'Ticket deleted'
    })
})

export const updateTicket = asyncHandler(async(req, res)=>{
    const user = await User.findById(req.user.id)
    if(!user){
        res.status(401)
        throw new Error('User not found')
    }

    const ticket = await Ticket.findById(req.params.id)

    if(!ticket){
        res.status(404)
        throw new Error("Ticket not found")
    }

    if(ticket.user.toString() !== req.user.id){
        res.status(401)
        throw new Error("Unauthorized")
    }
     
    const updatedTicket = await Ticket.findByIdAndUpdate(req.params.id, req.body, {new: true})

    res.status(200).json({
        message: 'Ticket updated',
        updatedTicket
    })
})