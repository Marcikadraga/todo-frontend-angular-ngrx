import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { RouterLink } from '@angular/router';

import { AuthActions } from '../../state/auth.actions';
import {
  selectAuthError,
  selectAuthLoading,
  selectIsAuthenticated,
} from '../../state/auth.selectors';

@Component({
  selector: 'app-login-page',
  imports: [FormsModule, AsyncPipe, RouterLink],
  templateUrl: './login-page.html',
  styleUrl: './login-page.scss',
})
export class LoginPage {
  private readonly store = inject(Store);

  email = '';
  password = '';

  loading$ = this.store.select(selectAuthLoading);
  error$ = this.store.select(selectAuthError);
  isAuthenticated$ = this.store.select(selectIsAuthenticated);

  login(): void {
    if (!this.email || !this.password) {
      return;
    }

    this.store.dispatch(
      AuthActions.loginStarted({
        request: {
          email: this.email,
          password: this.password,
        },
      })
    );
  }
}
