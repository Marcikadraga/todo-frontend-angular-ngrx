import { User } from '../models/user.model';

export interface MockUser extends User {
  password: string;
}

export const MOCK_USERS: MockUser[] = [
  {
    id: '1',
    name: 'Marci',
    email: 'marci@test.com',
    password: 'MarciMockLogin_2026!',
  },
  {
    id: '2',
    name: 'Anna',
    email: 'anna@test.com',
    password: 'AnnaMockLogin_2026!',
  },
  {
    id: '3',
    name: 'Béla',
    email: 'bela@test.com',
    password: 'BelaMockLogin_2026!',
  },
];