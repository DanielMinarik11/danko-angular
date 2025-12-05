import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { PlayerService, Player } from '../player.service';
import { QuestService, Quest } from '../../quests/quest.service';
import { PlayerQuestListComponent } from '../../player-quest-list/player-quest-list';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-player-detail',
  standalone: true,
  imports: [RouterModule, CommonModule, PlayerQuestListComponent],
  template: `
    <section *ngIf="player; else notFound">
      <h2>{{ player.nickname }}</h2>
      <img [src]="player.image" alt="{{ player.nickname }}" width="200" />
      <p>Level: {{ getLevel(player).level }}</p>
      <p>Title: {{ getLevel(player).title }}</p>
      <p *ngIf="player.clanId; else noClan">
        Clan: <a [routerLink]="['/clans', player.clanId]">View Clan</a>
      </p>
      <ng-template #noClan>No clan</ng-template>

      <div class="quests-container">
        <app-player-quest-list
          [title]="'Assigned Quests'"
          [quests]="assignedQuests"
          (toggleComplete)="markCompleted($event)"
        ></app-player-quest-list>

        <app-player-quest-list
          [title]="'Completed Quests'"
          [quests]="completedQuests"
          (toggleComplete)="markIncomplete($event)"
        ></app-player-quest-list>
      </div>
    </section>

    <ng-template #notFound>
      <p>Player not found.</p>
    </ng-template>
  `
})
export class PlayerDetailComponent {
  player?: Player;

  assignedQuests: Quest[] = [];
  completedQuests: Quest[] = [];

  private completedQuestIds = new Set<number>();

  constructor(
    private route: ActivatedRoute,
    private playerService: PlayerService,
    private questService: QuestService
  ) {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.player = this.playerService.getPlayerById(id);

    if (this.player) {
      const allQuests = this.questService.getQuestsByPlayer(id);
      this.assignedQuests = allQuests.filter(q => !this.isQuestCompleted(q));
      this.completedQuests = allQuests.filter(q => this.isQuestCompleted(q));
    }
  }

  getLevel(player: Player) {
    return this.playerService.getLevel(player);
  }

  private isQuestCompleted(q: Quest) {
    return this.completedQuestIds.has(q.id);
  }

  markCompleted(q: Quest) {
    this.completedQuestIds.add(q.id);
    this.refreshLists();
  }

  markIncomplete(q: Quest) {
    this.completedQuestIds.delete(q.id);
    this.refreshLists();
  }

  private refreshLists() {
    if (!this.player) return;
    const allQuests = this.questService.getQuestsByPlayer(this.player.id);
    this.assignedQuests = allQuests.filter(q => !this.completedQuestIds.has(q.id));
    this.completedQuests = allQuests.filter(q => this.completedQuestIds.has(q.id));
  }
}
