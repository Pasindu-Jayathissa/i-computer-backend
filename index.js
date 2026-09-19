import express from 'express'
import mongoose from 'mongoose'
import userRouter from './routes/userRouter.js'
import authenticateUser from './middlewares/authenticate.js'
import productRouter from './routes/productRouter.js'
import dotenv from 'dotenv'
import cors from 'cors'
import orderRouter from './routes/orderRouter.js'
dotenv.config()

const mongoUri = process.env.MONGO_URI
const PORT = process.env.PORT || 3000;

mongoose.connect(mongoUri).then(
    ()=>{
        console.log("Connected to MongoDB")
    }
).catch(
    (err)=>{
        console.error("Error connecting to MongoDB:", err)
    }
)


const app = express()
app.use(cors())

app.use( express.json() )

app.use(authenticateUser)
app.get("/", (req, res) => {
    res.send("Server is running!");
});
app.use("/api/users", userRouter)
app.use("/api/products", productRouter)
app.use("/api/orders", orderRouter)
 
app.listen( PORT ,
    ()=>{
      console.log("Server is running!")  
    }
)