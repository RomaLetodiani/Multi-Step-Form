import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface AuthenticatedRequest extends Request {
  userId?: string;
}

const secretKey = process.env.SECRET_KEY || '';

export const authenticateUser = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  // Split the Authorization header (if present) to extract the token
  const authHeader = req.header('Authorization');
  if (!authHeader) {
    return res
      .status(401)
      .json({ message: 'Unauthorized: Missing authorization header' });
  }
  const token = authHeader.split(' ')[1]; // Extract token after "Bearer "

  if (!token) {
    return res
      .status(401)
      .json({ message: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, secretKey) as { userId: string };
    req.userId = decoded.userId;
    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({ message: 'Token expired' });
    } else if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ message: 'Invalid token format' });
    } else {
      // Handle other errors
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
};
