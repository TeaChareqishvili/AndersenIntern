import { ChangeDetectionStrategy, Component, output, signal } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TODO_HISTORY_EVENTS } from '@shared';

@Component({
  selector: 'app-event-drop-down',
  imports: [MatSelectModule, MatFormFieldModule],
  templateUrl: './event-drop-down.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class EventDropDownComponent {
  readonly selectedEvent = signal<string | null>(null);

  readonly eventChange = output<string | null>();

  readonly eventOptions = Object.values(TODO_HISTORY_EVENTS);

  onEventFilterChange(event: string | null) {
    this.selectedEvent.set(event);
    this.eventChange.emit(event);
  }
}
