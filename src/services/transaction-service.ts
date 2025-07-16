import { addTransaction, getTransactions, getTransactionById, updateTransaction, deleteTransaction } from '../repositories/transaction-repository';
import { Transaction } from '../models/transaction-model';

export const createTransaction = async (transactionData: Omit<Transaction, 'id' | 'deletedAt'>): Promise<Transaction> => {
  const transaction = {
    ...transactionData,
    id: Date.now().toString(),
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: undefined,
  };
  return await addTransaction(transaction);
};

export const fetchTransactions = async (userId: string): Promise<Transaction[]> => {
  return await getTransactions(userId);
};

export const fetchTransactionById = async (id: string, userId: string): Promise<Transaction | undefined> => {
  return await getTransactionById(id, userId);
};

export const modifyTransaction = async (id: string, updatedTransaction: Partial<Transaction>, userId: string): Promise<Transaction | null> => {
  return await updateTransaction(id, updatedTransaction, userId);
};

export const removeTransaction = async (id: string, userId: string): Promise<boolean> => {
  return await deleteTransaction(id, userId);
};
