import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Quest } from '../quest.service';

@Component({
    selector: 'app-quest-item',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div class="quest-card">
      <h3>{{ quest.title }}</h3>
      <p>{{ quest.description }}</p>
      <p><strong>XP:</strong> {{ quest.xp }}</p>
      <button (click)="onRemove($event)">Remove</button>
    </div>
  `,
  styleUrls: ['./quest-item.css']
})
export class QuestItemComponent {
    @Input() quest!: Quest;
    @Output() remove = new EventEmitter<number>();

    onRemove(event: Event) {
        event.stopPropagation();
        this.remove.emit(this.quest.id);
    }
}