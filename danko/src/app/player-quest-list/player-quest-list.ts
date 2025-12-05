import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Quest } from '../quests/quest.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-player-quest-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <h4>{{ title }}</h4>
    <ul>
      <li *ngFor="let quest of quests; trackBy: trackById">
        <a [routerLink]="['/quests', quest.id]">{{ quest.title }}</a> — {{ quest.xp }} XP
        <button (click)="toggleComplete.emit(quest)">Toggle</button>
      </li>
    </ul>
    <p *ngIf="quests.length === 0">No quests here.</p>
  `
})
export class PlayerQuestListComponent {
  @Input() quests: Quest[] = [];
  @Input() title = '';
  @Output() toggleComplete = new EventEmitter<Quest>();

  trackById(index: number, quest: Quest) {
    return quest.id;
  }
}
