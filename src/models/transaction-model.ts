export interface Transaction {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  payee: string;
  amount: number;
  category: string;
  date: Date;
  userId: string;
  deletedAt?: Date;
}
