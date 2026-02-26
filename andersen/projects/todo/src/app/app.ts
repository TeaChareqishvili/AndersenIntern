import { Component, inject, OnInit } from '@angular/core';

import { RouterOutlet } from '@angular/router';
import { HeaderNavigation, HeaderSlotService } from '@shared';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
})
export class App implements OnInit {
  private readonly headerSlot = inject(HeaderSlotService);

  ngOnInit(): void {
    this.headerSlot.setHeader(HeaderNavigation);
  }
}
