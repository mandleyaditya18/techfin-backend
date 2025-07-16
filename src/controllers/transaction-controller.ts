import { FastifyPluginAsync } from 'fastify';
import { createTransaction, fetchTransactions, fetchTransactionById, modifyTransaction, removeTransaction } from '../services/transaction-service';
import { verifyJwt } from '../utils/jwt-utils';

const transactionController: FastifyPluginAsync = async (fastify) => {
  // Create a new transaction
  fastify.post('/transactions', async (request, reply) => {
    const token = request.headers['authorization']?.split(' ')[1];
    if (!token) {
      return reply.status(401).send({ message: 'Token required' });
    }

    const decoded = verifyJwt(token);
    if (!decoded) {
      return reply.status(401).send({ message: 'Invalid or expired token' });
    }

    request.userId = decoded.userId;

    const { payee, amount, category, date } = request.body as { payee: string; amount: number; category: string; date: string };

    try {
      const transaction = await createTransaction({
        userId: decoded.userId,
        payee,
        amount,
        category,
        date: new Date(date),
        createdAt: new Date(),
        updatedAt: new Date()
      });
      reply.status(201).send(transaction);
    } catch (error) {
      reply.status(400).send({ message: error.message });
    }
  });

  // Get all transactions for the authenticated user
  fastify.get('/transactions', async (request, reply) => {
    const token = request.headers['authorization']?.split(' ')[1];
    if (!token) {
      return reply.status(401).send({ message: 'Token required' });
    }

    const decoded = verifyJwt(token);
    if (!decoded) {
      return reply.status(401).send({ message: 'Invalid or expired token' });
    }

    request.userId = decoded.userId;

    try {
      const transactions = await fetchTransactions(decoded.userId);
      reply.send(transactions);
    } catch (error) {
      reply.status(500).send({ message: error.message });
    }
  });

  // Get a specific transaction by ID
  fastify.get('/transactions/:id', async (request, reply) => {
    const token = request.headers['authorization']?.split(' ')[1];
    if (!token) {
      return reply.status(401).send({ message: 'Token required' });
    }

    const decoded = verifyJwt(token);
    if (!decoded) {
      return reply.status(401).send({ message: 'Invalid or expired token' });
    }

    request.userId = decoded.userId;

    const { id } = request.params as { id: string };

    try {
      const transaction = await fetchTransactionById(id, decoded.userId);
      if (!transaction) {
        return reply.status(404).send({ message: 'Transaction not found' });
      }
      reply.send(transaction);
    } catch (error) {
      reply.status(500).send({ message: error.message });
    }
  });

  // Update an existing transaction
  fastify.put('/transactions/:id', async (request, reply) => {
    const token = request.headers['authorization']?.split(' ')[1];
    if (!token) {
      return reply.status(401).send({ message: 'Token required' });
    }

    const decoded = verifyJwt(token);
    if (!decoded) {
      return reply.status(401).send({ message: 'Invalid or expired token' });
    }

    request.userId = decoded.userId;

    const { id } = request.params as { id: string };
    const { payee, amount, category, date } = request.body as { payee: string; amount: number; category: string; date: string };

    try {
      const updatedTransaction = await modifyTransaction(id, { payee, amount, category, date: new Date(date) }, decoded.userId);
      if (!updatedTransaction) {
        return reply.status(404).send({ message: 'Transaction not found or not authorized' });
      }
      reply.send(updatedTransaction);
    } catch (error) {
      reply.status(400).send({ message: error.message });
    }
  });

  // Soft delete a transaction (mark as deleted)
  fastify.delete('/transactions/:id', async (request, reply) => {
    const token = request.headers['authorization']?.split(' ')[1];
    if (!token) {
      return reply.status(401).send({ message: 'Token required' });
    }

    const decoded = verifyJwt(token);
    if (!decoded) {
      return reply.status(401).send({ message: 'Invalid or expired token' });
    }

    request.userId = decoded.userId;

    const { id } = request.params as { id: string };

    try {
      const deleted = await removeTransaction(id, decoded.userId);
      if (!deleted) {
        return reply.status(404).send({ message: 'Transaction not found or not authorized' });
      }
      reply.status(200).send({ message: 'Transaction deleted successfully' });
    } catch (error) {
      reply.status(500).send({ message: error.message });
    }
  });
};

export { transactionController };
