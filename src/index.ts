import * as dotenv from 'dotenv';
import Fastify from 'fastify';
import { userController } from './controllers/user-controller';
import { transactionController } from './controllers/transaction-controller';

const server = Fastify();
dotenv.config();

server.register(userController);
server.register(transactionController);

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
