import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, tap } from 'rxjs';

import { AUTH_API } from '../../../core/api/auth/auth-api';
import { AuthActions } from './auth.actions';

@Injectable()
export class AuthEffects {
  private readonly actions$ = inject(Actions);
  private readonly authApi = inject(AUTH_API);
  private readonly router = inject(Router);

  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.loginStarted),
      switchMap(({ request }) => {
        return this.authApi.login(request).pipe(
          map(response => {
            return AuthActions.loginSuccess(response);
          }),
          catchError(error => {
            return of(
              AuthActions.loginFailure({
                error: this.getErrorMessage(error),
              })
            );
          })
        );
      })
    );
  });

  register$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.registerStarted),
      switchMap(({ request }) => {
        return this.authApi.register(request).pipe(
          map(response => {
            return AuthActions.registerSuccess(response);
          }),
          catchError(error => {
            return of(
              AuthActions.registerFailure({
                error: this.getErrorMessage(error),
              })
            );
          })
        );
      })
    );
  });

  logout$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.logoutStarted),
      switchMap(() => {
        return this.authApi.logout().pipe(
          map(() => {
            return AuthActions.logoutSuccess();
          }),
          catchError(error => {
            return of(
              AuthActions.logoutFailure({
                error: this.getErrorMessage(error),
              })
            );
          })
        );
      })
    );
  });

  redirectAfterLogin$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(AuthActions.loginSuccess, AuthActions.registerSuccess),
        tap(() => {
          this.router.navigate(['/todos']);
        })
      );
    },
    { dispatch: false }
  );

  redirectAfterLogout$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(AuthActions.logoutSuccess),
        tap(() => {
          this.router.navigate(['/login']);
        })
      );
    },
    { dispatch: false }
  );

  private getErrorMessage(error: unknown): string {
    if (error instanceof Error) {
      return error.message;
    }

    return 'Something went wrong';
  }
}