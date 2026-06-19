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
        name: user.name,
        email: user.email,
      },
      token: 'mock-token-123',
    }).pipe(delay(500));
  }

  register(request: RegisterRequest): Observable<AuthResponse> {
    const emailAlreadyExists = this.users.some(
      user => user.email === request.email
    );

    if (emailAlreadyExists) {
      return throwError(() => new Error('Email already exists'));
    }

    const newUser: MockUser = {
      id: crypto.randomUUID(),
      name: request.name,
      email: request.email,
      password: request.password,
    };

    this.users.push(newUser);

    return of({
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
      },
      token: 'mock-token-123',
    }).pipe(delay(500));
  }

  logout(): Observable<void> {
    return of(void 0).pipe(delay(300));
  }
}