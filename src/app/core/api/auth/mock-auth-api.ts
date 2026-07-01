import { Injectable } from '@angular/core';
import { delay, Observable, of, throwError } from 'rxjs';
import { MOCK_USERS, MockUser } from '../../mock-data/mock-users';

import {
  AuthApi,
  AuthResponse,
  LoginRequest,
  RegisterRequest,
} from './auth-api';


@Injectable()
export class MockAuthApi implements AuthApi {
  private users: MockUser[] = [...MOCK_USERS];

  login(request: LoginRequest): Observable<AuthResponse> {
    const user = this.users.find(
      user =>
        user.email === request.email &&
        user.password === request.password
    );

    if (!user) {
      return throwError(() => new Error('Invalid email or password'));
    }

    return of({
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
      token: 'mock-token-123',
    });
  }

register(request: RegisterRequest): Observable<AuthResponse> {
  const username = request.username.trim().toLowerCase();
  const email = request.email.trim().toLowerCase();
  const password = request.password;

  if (!username) {
    return throwError(() => new Error('Username is required'));
  }

  if (!email) {
    return throwError(() => new Error('Email is required'));
  }

  if (!password) {
    return throwError(() => new Error('Password is required'));
  }

  if (username.length < 3) {
    return throwError(() => new Error('Username must be at least 3 characters'));
  }

  if (password.length < 8) {
    return throwError(() => new Error('Password must be at least 8 characters'));
  }

  const usernameAlreadyExists = this.users.some(user => {
    return user.username.toLowerCase() === username;
  });

  if (usernameAlreadyExists) {
    return throwError(() => new Error('Username already exists'));
  }

  const emailAlreadyExists = this.users.some(user => {
    return user.email.toLowerCase() === email;
  });

  if (emailAlreadyExists) {
    return throwError(() => new Error('Email already exists'));
  }

  const newUser: MockUser = {
    id: crypto.randomUUID(),
    username,
    email,
    password,
  };

  this.users.push(newUser);

  return of({
    user: {
      id: newUser.id,
      username: newUser.username,
      email: newUser.email,
    },
    token: 'mock-token-123',
  });
}

  logout(): Observable<void> {
    return of(void 0);
  }
}