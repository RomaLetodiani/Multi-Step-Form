import dotenv from 'dotenv'
import express from 'express'
import userRoutes from './routes/userRoutes'
import authRoutes from './routes/authRoutes'
import cors from 'cors'
import bodyParser from 'body-parser'
import helmet from 'helmet'
import cookieParser from 'cookie-parser'
import ConnectMongoDB from './Database/ConnectMongoDB'
import { errorHandler } from './middlewares/errorMiddleware'
import { authRateLimiter } from './middlewares/authRateLimiter'

dotenv.config()

export interface UserBasicInfo {
  _id: string
  username: string
  email: string
  verification: {
    verified: boolean
  }
}

declare global {
  namespace Express {
    interface Response {
      user?: UserBasicInfo | null
    }
  }
}

const app = express()
const PORT = process.env.PORT || 5000

// Security: Enable additional helmet protections (consider tailoring these based on your needs)
app.use(helmet.contentSecurityPolicy()) // Content Security Policy for script and resource restrictions
app.use(helmet.referrerPolicy()) // Prevent referrer leakage

app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  }),
)

app.use(cookieParser())

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`)
})

app.use('/api/auth', authRateLimiter, authRoutes)
// userRoutes
app.use('/api/users', userRoutes)

app.use(errorHandler)

ConnectMongoDB()
