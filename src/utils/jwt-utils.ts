import jwt from 'jsonwebtoken';

export const verifyJwt = (token: string) => {
  try {
    const JWT_SECRET = process.env.JWT_SECRET || "";
    return jwt.verify(token, JWT_SECRET) as { userId: string, username: string };
  } catch (error) {
    return null;  // Invalid token
  }
};
