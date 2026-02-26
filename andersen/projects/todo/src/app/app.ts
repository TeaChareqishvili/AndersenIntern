import { Component, inject, OnDestroy, OnInit } from '@angular/core';

import { RouterOutlet } from '@angular/router';
import { HeaderSlotService } from '@shared';
import { TodoInput } from './todo-input/todo-input';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
})
export class App implements OnInit, OnDestroy {
  private readonly headerSlot = inject(HeaderSlotService);

  ngOnInit(): void {
    this.headerSlot.setHeader(TodoInput);
  }

  ngOnDestroy(): void {
    this.headerSlot.clearHeader(TodoInput);
  }
}
