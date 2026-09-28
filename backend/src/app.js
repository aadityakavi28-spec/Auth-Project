import express from "express";
import bodyParser from "body-parser";
import cors from 'cors'

import authRoutes from "./Routes/auth.routes.js"; 
import productRoutes from "./Routes/product.routes.js"

const app = express()


app.use(express.json())
app.use(cors())


app.use('/api/auth', authRoutes)
app.use('/products', productRoutes)

export default app