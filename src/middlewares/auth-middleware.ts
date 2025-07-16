import { FastifyRequest, FastifyReply } from 'fastify';
import { verifyJwt } from '../utils/jwt-utils';

// Middleware to extract and verify JWT token
export const authMiddleware = async (request: FastifyRequest, reply: FastifyReply) => {
  const token = request.headers['authorization']?.split(' ')[1];  // Assuming "Bearer <token>"

  if (!token) {
    return reply.status(401).send({ message: 'Token required' });
  }

  // Verify the token
  const decoded = verifyJwt(token);
  if (!decoded) {
    return reply.status(401).send({ message: 'Invalid or expired token' });
  }

  // Attach the userId to the request object
  request.userId = decoded.userId;
};
