import { Transaction } from '../models/transaction-model';
import { InMemoryDatabase } from './database';

const transactionDb = new InMemoryDatabase<Transaction>();

export const addTransaction = async (transaction: Transaction): Promise<Transaction> => {
  return transactionDb.create(transaction);
};

export const getTransactions = async (userId: string): Promise<Transaction[]> => {
  return transactionDb.findAll().filter(transaction => transaction.userId === userId && !transaction.deletedAt);
};

export const getTransactionById = async (id: string, userId: string): Promise<Transaction | undefined> => {
  const transaction = transactionDb.findById(id);
  return transaction && transaction.userId === userId && !transaction.deletedAt ? transaction : undefined;
};

export const updateTransaction = async (id: string, updatedTransaction: Partial<Transaction>, userId: string): Promise<Transaction | null> => {
  const transaction = await getTransactionById(id, userId);
  if (!transaction) return null;

  return transactionDb.update(id, updatedTransaction);
};

export const deleteTransaction = async (id: string, userId: string): Promise<boolean> => {
  const transaction = await getTransactionById(id, userId);
  if (!transaction) return false;

  return transactionDb.delete(id);
};
