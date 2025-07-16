import * as dotenv from 'dotenv';
import Fastify from 'fastify';

const server = Fastify();
dotenv.config();

server.get('/', async (request, reply) => {
  return { message: 'Hello from Fastify + TypeScript!' };
});

const start = async () => {
  try {
    await server.listen({ port: 3000 });
    console.log('Server running on http://localhost:3000');
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();
