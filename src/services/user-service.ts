import * as dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { getUserByUsername, addUser } from '../repositories/user-repository';
import { User } from '../models/user-model';

dotenv.config();

const SALT_ROUNDS = 10;
const JWT_SECRET = process.env.JWT_SECRET || '';

export const registerUser = async (username: string, password: string): Promise<User> => {
  const existingUser = await getUserByUsername(username);
  if (existingUser) {
    throw new Error('Username is already taken');
  }

  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
  const newUser: User = {
    id: Date.now().toString(),
    createdAt: new Date(),
    updatedAt: new Date(),
    username,
    password: hashedPassword,
  };

  await addUser(newUser);
  return newUser;
};

export const loginUser = async (username: string, password: string): Promise<{ token: string; user: User }> => {
  const user = await getUserByUsername(username);
  if (!user) {
    throw new Error('Invalid credentials');
  }

  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    throw new Error('Invalid credentials');
  }

  const token = jwt.sign({ userId: user.id, username: user.username }, JWT_SECRET, { expiresIn: '1h' });
  return { token, user };
};
