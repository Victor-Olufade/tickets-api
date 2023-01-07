import asyncHandler from 'express-async-handler'
import bcrypt from 'bcrypt'
import User from '../models/userModel.js'
import {generateToken} from '../utils/utilityFunctions.js'



export const registerUser = asyncHandler(async(req, res)=>{
    const {name, email, password} = req.body
    if(!name || !email || !password){
        res.status(400)
        throw new Error('Please include all fields')
    }
    const userExists = await User.findOne({email})
    if(userExists){
        res.status(400)
        throw new Error('User already exists')
    }

    const salt = await bcrypt.genSalt(10)
    const hasedPassword = await bcrypt.hash(password, salt)

    const newUser = await User.create({
        name,
        email,
        password: hasedPassword
    }) 

    if(newUser){
        res.status(201).json({
            message: 'Registration is successful',
            newUser,
            token: generateToken(newUser._id)
        })
    }else{
        res.status(400)
        throw new Error('Invalid user data')
    }
})

export const loginUser = asyncHandler(async(req, res)=>{
   const {email, password} = req.body
   const trueUser = await User.findOne({email})

   if(trueUser && await bcrypt.compare(password, trueUser.password)){
    res.status(200).json({
        message: 'Login is successful',
        trueUser,
        token: generateToken(trueUser._id)
    })
   }else{
    res.status(401)
    throw new Error('Invalid Credentials')
   }

})

export const getMe = asyncHandler(async(req, res)=> {
    const user = {
        id: req.user._id,
        name: req.user.name,
        email: req.user.email
    }
    res.json(user)
})