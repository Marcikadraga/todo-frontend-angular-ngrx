import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';

import { User } from '../../models/user.model';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export abstract class AuthApi {
  abstract login(request: LoginRequest): Observable<AuthResponse>;

  abstract register(request: RegisterRequest): Observable<AuthResponse>;

  abstract logout(): Observable<void>;
}

export const AUTH_API = new InjectionToken<AuthApi>('AUTH_API');