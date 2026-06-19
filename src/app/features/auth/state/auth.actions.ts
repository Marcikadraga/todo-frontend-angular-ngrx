import { createActionGroup, emptyProps, props } from '@ngrx/store';

import {
  AuthResponse,
  LoginRequest,
  RegisterRequest,
} from '../../../core/api/auth/auth-api';

export const AuthActions = createActionGroup({
  source: 'Auth',
  events: {
    'Login Started': props<{ request: LoginRequest }>(),
    'Login Success': props<AuthResponse>(),
    'Login Failure': props<{ error: string }>(),

    'Register Started': props<{ request: RegisterRequest }>(),
    'Register Success': props<AuthResponse>(),
    'Register Failure': props<{ error: string }>(),

    'Logout Started': emptyProps(),
    'Logout Success': emptyProps(),
    'Logout Failure': props<{ error: string }>(),
  },
});