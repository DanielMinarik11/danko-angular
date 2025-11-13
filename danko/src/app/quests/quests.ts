import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestItemComponent } from './quest-item/quest-item';
import { RouterModule } from '@angular/router';
import { QuestService, Quest } from './quest.service';

@Component({
  selector: 'app-quests',
  standalone: true,
  imports: [CommonModule, QuestItemComponent, RouterModule],
  template: `
    <section>
      <h2>Available Quests</h2>

      <p><strong>Count:</strong> {{ quests().length }}</p>

      @if (quests().length > 0) {
        @for (quest of quests(); track quest.id) {
          <div class="quest-link">
            <app-quest-item
              [quest]="quest"
              (remove)="removeQuest(quest.id)">
            </app-quest-item>

            <a [routerLink]="['/quests', quest.id]">View details</a>
            <hr>
          </div>
        }
      } @else {
        <p>No quests available</p>
      }

      <button (click)="addQuest()">Add Quest</button>
    </section>
  `,
  styleUrls: ['./quests.css']
})
export class QuestsComponent {
  quests = signal<Quest[]>([]);

  constructor(private questService: QuestService) {
    this.quests.set(this.questService.getQuests());
  }

  addQuest() {
    this.questService.addQuest();
    this.quests.set(this.questService.getQuests());
  }

  removeQuest(id: number) {
    this.questService.removeQuest(id);
    this.quests.set(this.questService.getQuests());
  }
}