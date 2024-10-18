import express from 'express'
import { notfound,errorHandler } from './middleware/errorMiddleware.js'
import productRoutes from './routes/productRoutes.js'
import dotenv from 'dotenv'
dotenv.config( )
import connectDB from './config/db.js'

connectDB() //connect to db

const port=process.env.PORT || 5000
const app=express()


app.get('/',(req,res)=>{res.send('Api is running ...')})
app.use('/api/products',productRoutes)
app.use(notfound)
app.use(errorHandler)



app.listen(port, () => console.log(`server is running at port ${port}`))