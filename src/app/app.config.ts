import {
  ApplicationConfig,
  isDevMode,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

import { provideState, provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';

import { routes } from './app.routes';
import { AuthEffects } from './features/auth/state/auth.effects';

import { API_MODE } from './core/config/api-mode';
import { AUTH_API } from './core/api/auth/auth-api';
import { MockAuthApi } from './core/api/auth/mock-auth-api';
import { RealAuthApi } from './core/api/auth/real-auth-api';

import { AUTH_FEATURE_KEY } from './features/auth/state/auth.state';
import { authReducer } from './features/auth/state/auth.reducer';

import { TODO_API } from './core/api/todo/todo-api';
import { MockTodoApi } from './core/api/todo/mock-todo-api';
import { RealTodoApi } from './core/api/todo/real-todo-api';

import { TODO_FEATURE_KEY } from './features/todos/state/todo.state';
import { todoReducer } from './features/todos/state/todo.reducer';
import { TodoEffects } from './features/todos/state/todo.effects';

import { FRIEND_API } from './core/api/friend/friend-api';
import { MockFriendApi } from './core/api/friend/mock-friend-api';
import { RealFriendApi } from './core/api/friend/real-friend-api';

import { FRIEND_FEATURE_KEY } from './features/friends/state/friend.state';
import { friendReducer } from './features/friends/state/friend.reducer';
import { FriendEffects } from './features/friends/state/friend.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),

    provideStore(),
    provideState(AUTH_FEATURE_KEY, authReducer),
    provideState(TODO_FEATURE_KEY, todoReducer),
    provideState(FRIEND_FEATURE_KEY, friendReducer),
    provideEffects([AuthEffects, TodoEffects, FriendEffects]),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: !isDevMode(),
    }),

    {
      provide: AUTH_API,
      useClass: API_MODE === 'mock' ? MockAuthApi : RealAuthApi,
    },
    {
      provide: TODO_API,
      useClass: API_MODE === 'mock' ? MockTodoApi : RealTodoApi,
    },
    {
      provide: FRIEND_API,
      useClass: API_MODE === 'mock' ? MockFriendApi : RealFriendApi,
    },
  ],
};