import { User } from '../models/user.model';

export interface MockUser extends User {
  password: string;
}

export const MOCK_USERS: MockUser[] = [
  {
    id: '1',
    username: 'marci',
    email: 'marci@test.com',
    password: 'MarciMockLogin_2026!',
  },
  {
    id: '2',
    username: 'anna',
    email: 'anna@test.com',
    password: 'AnnaMockLogin_2026!',
  },
  {
    id: '3',
    username: 'bela',
    email: 'bela@test.com',
    password: 'BelaMockLogin_2026!',
  },
  {
    id: '4',
    username: 'david',
    email: 'david@test.com',
    password: 'DavidMockLogin_2026!',
  },
];