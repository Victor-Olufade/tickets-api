import express from 'express'
import dotenv from 'dotenv'
import userRouter from './routes/userRoutes.js'
import logger from 'morgan'
import {errorHandler} from './middleWare/errorMiddleware.js'
import connectDb from './config/db.js'
import cors from 'cors'


dotenv.config()
connectDb()

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))


const port = process.env.PORT || 8000

app.use(logger('dev'))

app.get('/', (req, res)=>{
    res.status(200).json({
        message: 'Welcome to Support Desk API'
    })
})

app.use('/api/users', userRouter)
app.use(errorHandler)
app.listen(port, ()=>{
    console.log(`server listening on port ${port}`);
})


