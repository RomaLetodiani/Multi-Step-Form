import rateLimit from 'express-rate-limit'

// Define the rate limit options
const authRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // limit each IP to 10 requests per windowMs
  skipSuccessfulRequests: true,
  message: {
    statusCode: 429,
    message: 'Too many requests, please try again later',
  },
})

export { authRateLimiter }
