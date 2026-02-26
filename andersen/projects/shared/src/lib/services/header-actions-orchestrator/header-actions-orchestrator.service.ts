import { DestroyRef, inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { HEADER_ACTION_NAV_TYPES } from '../../models/header-actions.models';
import { AuthUserService } from '../auth-user-service/auth-user-service.service';
import { HeaderSlotService } from '../header-slot/header-service.service';
import { ResponseMessageService } from '../response-message/response-message.service';
import { StorageService } from '../storage-service/storage-service.service';
import { LogOutService } from '../user-log-out/log-out-service.service';

@Injectable({
  providedIn: 'root',
})
export class HeaderActionsOrchestratorService {
  private readonly destroyRef = inject(DestroyRef);
  private readonly headerSlot = inject(HeaderSlotService);
  private readonly router = inject(Router);
  private readonly logOutService = inject(LogOutService);
  private readonly authUserService = inject(AuthUserService);
  private readonly responseMessage = inject(ResponseMessageService);
  private readonly storage = inject(StorageService);

  init(): void {
    this.headerSlot.actions$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((action) => {
      switch (action.type) {
        case HEADER_ACTION_NAV_TYPES.LOGIN:
          void this.router.navigateByUrl('/auth/sign-in');
          break;
        case HEADER_ACTION_NAV_TYPES.REGISTER:
          void this.router.navigateByUrl('/auth/sign-up');
          break;
        case HEADER_ACTION_NAV_TYPES.USER:
          void this.router.navigateByUrl('/auth/user');
          break;
        case HEADER_ACTION_NAV_TYPES.TODO:
          void this.router.navigateByUrl('/todo');
          break;
        case HEADER_ACTION_NAV_TYPES.LOGOUT:
          this.logOut();
          break;
      }
    });
  }

  private logOut(): void {
    this.logOutService.signOut().subscribe({
      next: () => {
        this.authUserService.setUser(null);
        this.storage.setItem<null>('APP_SESSION_STATE', null);
        void this.router.navigateByUrl('/auth/sign-in');
        this.responseMessage.success({ message: 'Logged out successfully 👋' }).subscribe();
      },
      error: () => {
        this.responseMessage.error('Logout failed');
      },
    });
  }
}
