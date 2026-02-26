import { Injectable, signal, Type } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HeaderAction } from '../../../../shared/src/lib/models/header-actions.models';

@Injectable({
  providedIn: 'root',
})
export class HeaderSlotService {
  private readonly _header = signal<Type<unknown> | null>(null);
  private readonly _actions = new Subject<HeaderAction>();
  readonly header = this._header.asReadonly();
  readonly actions$: Observable<HeaderAction> = this._actions.asObservable();

  setHeader(component: Type<unknown> | null): void {
    this._header.set(component);
  }

  emitAction(action: HeaderAction): void {
    this._actions.next(action);
  }
}
