import { createReducer, on } from '@ngrx/store';

import { AuthActions } from './auth.actions';
import { AuthState, initialAuthState } from './auth.state';

export const authReducer = createReducer(
  initialAuthState,

  on(AuthActions.loginStarted, (state): AuthState => {
    return {
      ...state,
      loading: true,
      error: null,
    };
  }),

  on(AuthActions.loginSuccess, (state, { user, token }): AuthState => {
    return {
      ...state,
      currentUser: user,
      token,
      isAuthenticated: true,
      loading: false,
      error: null,
    };
  }),

  on(AuthActions.loginFailure, (state, { error }): AuthState => {
    return {
      ...state,
      currentUser: null,
      token: null,
      isAuthenticated: false,
      loading: false,
      error,
    };
  }),

  on(AuthActions.registerStarted, (state): AuthState => {
    return {
      ...state,
      loading: true,
      error: null,
    };
  }),

  on(AuthActions.registerSuccess, (state, { user, token }): AuthState => {
    return {
      ...state,
      currentUser: user,
      token,
      isAuthenticated: true,
      loading: false,
      error: null,
    };
  }),

  on(AuthActions.registerFailure, (state, { error }): AuthState => {
    return {
      ...state,
      loading: false,
      error,
    };
  }),

  on(AuthActions.logoutStarted, (state): AuthState => {
    return {
      ...state,
      loading: true,
      error: null,
    };
  }),

  on(AuthActions.logoutSuccess, (): AuthState => {
    return {
      ...initialAuthState,
    };
  }),

  on(AuthActions.logoutFailure, (state, { error }): AuthState => {
    return {
      ...state,
      loading: false,
      error,
    };
  })
);