import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Quest } from '../quests/quest.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-player-quest-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './player-quest-list.html'
})
export class PlayerQuestListComponent {

  // nepouzivat *ngFor a *ngIf ale @for a @if
  @Input() quests: Quest[] = []; // https://angular.dev/guide/components/inputs
  @Input() title = '';
  @Output() toggleComplete = new EventEmitter<Quest>(); // output

  trackById(index: number, quest: Quest) {
    return quest.id;
  }
}
