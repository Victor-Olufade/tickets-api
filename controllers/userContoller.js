import asyncHandler from 'express-async-handler'
import bcrypt from 'bcrypt'
import User from '../models/userModel.js'
import { eHtml, generateOtp, generateToken, sendEmail } from '../utils/utilityFunctions.js'

export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body
  if (!name || !email || !password) {
    res.status(400)
    throw new Error('Please include all fields')
  }
  const userExists = await User.findOne({ email })
  if (userExists) {
    res.status(400)
    throw new Error('User already exists')
  }

  const salt = await bcrypt.genSalt(10)
  const hasedPassword = await bcrypt.hash(password, salt)
  const { otp, expiryTime } = generateOtp()

  const newUser = await User.create({
    name,
    email,
    password: hasedPassword,
    verified: false,
    otp,
    otpExpiry: expiryTime
  })

  let html = eHtml(otp)
  const sent = await sendEmail(process.env.adminMail, email, process.env.userSubject, html)

  

  if (newUser && sent) {
    res.status(201).json({
      message: 'Registration successful, check mail for otp',
      newUser,
      token: generateToken(newUser._id),
    })
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }
})

export const verifyUser = asyncHandler(async(req, res)=>{
  const user = await User.findById(req.user.id)
  if (!user) {
    res.status(401)
    throw new Error('You are not registered')
  }
  
  const { otp } = req.body
 

  if (user.otp === otp && user.otpExpiry >= new Date()){
    const updatedUser = await User.findByIdAndUpdate(req.user.id, {verified: true}, { new: true })
    if(updatedUser){
      res.status(201).json({
        message: 'Verification successful',
        updatedUser,
        token: generateToken(updatedUser.id),
      })
    }else{
      res.status(400)
      throw new Error('Verification failed')
    }
  }else{
    res.status(401)
      throw new Error('Invalid otp')
  }
})

export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body
  const trueUser = await User.findOne({ email })

  if (trueUser && (await bcrypt.compare(password, trueUser.password)) && trueUser.verified) {
    res.status(200).json({
      message: 'Login is successful',
      trueUser,
      token: generateToken(trueUser._id),
    })
  } else {
    res.status(401)
    throw new Error('Invalid Credentials, ensure you verify your account')
  }
})

export const getMe = asyncHandler(async (req, res) => {
  const user = {
    id: req.user._id,
    name: req.user.name,
    email: req.user.email,
  }
  res.json(user)
})
