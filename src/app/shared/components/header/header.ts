import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Store } from '@ngrx/store';

import { AuthActions } from '../../../features/auth/state/auth.actions';
import {
  selectCurrentUser,
  selectIsAuthenticated,
} from '../../../features/auth/state/auth.selectors';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive, AsyncPipe],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  private readonly store = inject(Store);

  currentUser$ = this.store.select(selectCurrentUser);
  isAuthenticated$ = this.store.select(selectIsAuthenticated);

  logout(): void {
    this.store.dispatch(AuthActions.logoutStarted());
  }
}
