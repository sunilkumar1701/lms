import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import userRoutes from './routes/userRoutes.js'
import courseRoutes from './routes/courseRoutes.js'
import paymentRoutes from './routes/paymentRoutes.js'
import miscRoutes from './routes/miscellaneousRoutes.js'
import errorMiddleware from './middleware/errorMiddleware.js'
import NodeCache from 'node-cache'

dotenv.config()
const app = express()
export const myCache = new NodeCache()

app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const allowedOrigins = [
  'http://localhost:5173',
  'http://192.168.1.34:5173'
]

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  credentials: true
}))

app.use("/api/v1/user", userRoutes)
app.use("/api/v1/course", courseRoutes)
app.use("/api/v1/payments", paymentRoutes)
app.use("/api/v1", miscRoutes)

app.use("/ping", (req, res) => {
  res.send("Server is working")
})

app.all("*", (req, res) => {
  res.status(404).send("!oops page not found")
})

app.use(errorMiddleware)
export default app
