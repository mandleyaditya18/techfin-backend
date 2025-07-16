import { User } from '../models/user-model';
import { InMemoryDatabase } from './database';

const userDb = new InMemoryDatabase<User>();

export const getUserByUsername = async (username: string): Promise<User | undefined> => {
  return userDb.findAll().find(user => user.username === username);
};

export const addUser = async (user: User): Promise<User> => {
  return userDb.create(user);
};
