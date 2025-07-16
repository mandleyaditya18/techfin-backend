import { FastifyPluginAsync } from 'fastify';
import { registerUser, loginUser } from '../services/user-service';

const userController: FastifyPluginAsync = async (fastify) => {
  fastify.post('/signup', async (request, reply) => {
    const { username, password } = request.body as { username: string; password: string };

    try {
      const newUser = await registerUser(username, password);
      reply.status(201).send(newUser);
    } catch (error) {
      reply.status(400).send({ message: (error as { message: string } | any).message });
    }
  });

  fastify.post('/login', async (request, reply) => {
    const { username, password } = request.body as { username: string; password: string };

    try {
      const { token, user } = await loginUser(username, password);
      reply.send({ token, user });
    } catch (error) {
      reply.status(401).send({ message: (error as { message: string } | any).message });
    }
  });
};

export { userController };
