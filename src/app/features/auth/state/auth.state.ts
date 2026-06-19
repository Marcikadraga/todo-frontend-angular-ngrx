import { User } from '../../../core/models/user.model';

export const AUTH_FEATURE_KEY = 'auth';

export interface AuthState {
  currentUser: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

export const initialAuthState: AuthState = {
  currentUser: null,
  token: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};