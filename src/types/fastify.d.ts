import { FastifyRequest } from 'fastify';

export type FastifyRequestWithUserId = FastifyRequest & { userId: string };

declare module 'fastify' {
  interface FastifyRequest {
    userId: string;
  }
}
