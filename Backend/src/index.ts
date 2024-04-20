import dotenv from 'dotenv'
import express, { Application } from 'express'
import userRoutes from './routes/userRoutes'
import authRoutes from './routes/authRoutes'
import subscribeRoutes from './routes/subscribeRoutes'
import cors from 'cors'
import bodyParser from 'body-parser'
import helmet from 'helmet'
import cookieParser from 'cookie-parser'
import ConnectMongoDB from './Database/ConnectMongoDB'
import { errorHandler } from './middlewares/errorMiddleware'
import { authRateLimiter } from './middlewares/authRateLimiter'
import { authenticateUser } from './middlewares/authMiddleware'
import { UserDocument } from './models/User'

declare global {
  namespace Express {
    interface Response {
      user?: UserDocument
    }
  }
}

const app: Application = express()
dotenv.config()

// Security: Enable additional helmet protections (consider tailoring these based on your needs)
app.use(helmet.contentSecurityPolicy()) // Content Security Policy for script and resource restrictions
app.use(helmet.referrerPolicy()) // Prevent referrer leakage

app.use(
  cors({
    credentials: true,
    origin:
      process.env.NODE_ENV === 'production' ? process.env.CLIENT_URL : 'http://localhost:5173',
  }),
)

app.set('trust proxy', 3)

app.use(cookieParser())

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// subscribeRoutes
app.use('/api/subscription', authenticateUser, subscribeRoutes)
// authRoutes
app.use('/api/auth', authRateLimiter, authRoutes)
// userRoutes
app.use('/api/users', userRoutes)

app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  if (process.env.NODE_ENV === 'development') {
    console.log(`Server is running at http://localhost:${PORT}`)
  }
})

ConnectMongoDB()
