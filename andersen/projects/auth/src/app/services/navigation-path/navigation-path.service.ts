import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { HEADER_ACTION_NAV_TYPES } from '@shared';

@Injectable({
  providedIn: 'root',
})
export class NavigationPathService {
  private readonly router = inject(Router);

  navigateToAuth(path: HEADER_ACTION_NAV_TYPES | string): void {
    const hostedInShell = this.router.config.some((route) => route.path === 'auth');
    const target = hostedInShell ? `/auth/${path}` : `/${path}`;
    void this.router.navigateByUrl(target);
  }

  navigateToHome(): void {
    void this.router.navigateByUrl('/');
  }

  navigateToTodo(): void {
    void this.router.navigate(['/todo']);
  }
}
