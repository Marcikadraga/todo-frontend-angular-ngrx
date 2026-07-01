import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';

import { AuthActions } from '../../state/auth.actions';
import {
  selectAuthError,
  selectAuthLoading,
} from '../../state/auth.selectors';

@Component({
  selector: 'app-register-page',
  imports: [FormsModule, AsyncPipe, RouterLink],
  templateUrl: './register-page.html',
  styleUrl: './register-page.scss',
})

export class RegisterPage {
  private readonly store = inject(Store);

  username = '';
  email = '';
  password = '';
  confirmPassword = '';

  usernameError = '';
  emailError = '';
  passwordError = '';
  confirmPasswordError = '';

  loading$ = this.store.select(selectAuthLoading);
  error$ = this.store.select(selectAuthError);

  register(): void {
    this.clearValidationErrors();

    const isValid = this.validateForm();

    if (!isValid) {
      return;
    }

    this.store.dispatch(
      AuthActions.registerStarted({
        request: {
          username: this.username.trim().toLowerCase(),
          email: this.email.trim().toLowerCase(),
          password: this.password,
        },
      })
    );
  }

  private clearValidationErrors(): void {
    this.usernameError = '';
    this.emailError = '';
    this.passwordError = '';
    this.confirmPasswordError = '';
  }

  private validateForm(): boolean {
    let isValid = true;

    const username = this.username.trim();
    const email = this.email.trim();
    const password = this.password;
    const confirmPassword = this.confirmPassword;

    if (!username) {
      this.usernameError = 'Username is required.';
      isValid = false;
    } else if (username.length < 3) {
      this.usernameError = 'Username must be at least 3 characters.';
      isValid = false;
    }

    if (!email) {
      this.emailError = 'Email is required.';
      isValid = false;
    } else if (!email.includes('@')) {
      this.emailError = 'Please enter a valid email address.';
      isValid = false;
    }

    if (!password) {
      this.passwordError = 'Password is required.';
      isValid = false;
    } else if (password.length < 8) {
      this.passwordError = 'Password must be at least 8 characters.';
      isValid = false;
    }

    if (!confirmPassword) {
      this.confirmPasswordError = 'Please confirm your password.';
      isValid = false;
    } else if (password !== confirmPassword) {
      this.confirmPasswordError = 'Passwords do not match.';
      isValid = false;
    }

    return isValid;
  }
}