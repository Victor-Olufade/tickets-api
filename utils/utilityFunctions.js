import jwt from 'jsonwebtoken'
import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
dotenv.config()


export const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' })
}

export const generateOtp = () => {
  const otp = Math.floor(1000 + Math.random() * 9000)
  const expiryTime = new Date()
  expiryTime.setTime(new Date().getTime() + 30 * 60 * 1000)
  return { otp, expiryTime }
}

const transport = nodemailer.createTransport({
   service: 'gmail',
   auth: {
      user: process.env.AdminMail,
      pass: process.env.GmailPass
   }
   
  }
)

export const sendEmail =  (from, to, subject, html) => {
  try {
    const response =  transport.sendMail({
      from: from, 
      to: to,
      subject: subject,
      html: html, 
    })
    return response
  } catch (error) {
    console.log(error)
  }
}

export const eHtml = (otp) => {
  let result = `
   <div style = "max-width:700px; margin: auto; border: 10px solid #ddd; padding: 50px, 20px; font-size: 110%;">
   <h2 style = "text-align: center; text-transform: uppercase; color: teal;">
   Welcome to Victor Store
   </h2>
   <p>
   Hi there, your OTP is ${otp}
   </p>
   </div>
   `
  return result
}
