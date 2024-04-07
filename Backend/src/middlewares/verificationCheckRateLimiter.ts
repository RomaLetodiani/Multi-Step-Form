import rateLimit from 'express-rate-limit'

// Define rate limit options specifically for email verification
const verificationCheckRateLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5, // Allow a maximum of 5 attempts per IP within the window
  message: {
    statusCode: 429,
    message: 'Too many failed verification requests. Please try again later.',
  },
})

export { verificationCheckRateLimiter }
