import { UserRepository } from '../repositories/user-repository';
import { User } from '../types';

export class UserService {
  private repository: UserRepository;

  constructor() {
    this.repository = new UserRepository();
  }

  async createUser(user: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<User> {
    const existingUser = await this.repository.findByEmail(user.email);
    if (existingUser) {
      throw new Error(`User with email '${user.email}' already exists`);
    }
    return this.repository.create(user);
  }

  async getUserById(id: string): Promise<User | null> {
    return this.repository.findById(id);
  }

  async getAllUsers(): Promise<User[]> {
    return this.repository.findAll();
  }

  async getUserByEmail(email: string): Promise<User | null> {
    return this.repository.findByEmail(email);
  }

  async updateUser(id: string, updates: Partial<User>): Promise<User> {
    if (updates.email) {
      const existingUser = await this.repository.findByEmail(updates.email);
      if (existingUser && existingUser.id !== id) {
        throw new Error(`User with email '${updates.email}' already exists`);
      }
    }
    return this.repository.update(id, updates);
  }

  async deleteUser(id: string): Promise<void> {
    return this.repository.delete(id);
  }

  async findOrCreateUser(email: string): Promise<User> {
    const existingUser = await this.repository.findByEmail(email);
    if (existingUser) {
      return existingUser;
    }
    
    return this.createUser({ email });
  }

  async isEmailAvailable(email: string): Promise<boolean> {
    const existingUser = await this.repository.findByEmail(email);
    return !existingUser;
  }
}