import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { PlayerService, Player } from '../player.service';
import { QuestService, Quest } from '../../quests/quest.service';

@Component({
  selector: 'app-player-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    @if (player) {
      <section>
        <h2>{{ player.nickname }}</h2>
        <img [src]="player.image" alt="{{ player.nickname }}" width="200" />
        <p>Level: {{ player.level }}</p>
        <p>
          @if (player.clanId) {
            Clan: <a [routerLink]="['/clans', player.clanId]">View Clan</a>
          } @else {
            No clan
          }
        </p>

        <h3>Quests</h3>
        @if (playerQuests.length > 0) {
          @for (q of playerQuests; track q.id) {
            <div>
              <a [routerLink]="['/quests', q.id]">{{ q.title }}</a> — {{ q.xp }} XP
            </div>
          }
        } @else {
          <p>No quests for this player.</p>
        }
      </section>
    } @else {
      <p>Player not found.</p>
    }
  `
})
export class PlayerDetailComponent {
  player?: Player;
  playerQuests: Quest[] = [];

  constructor(
    private route: ActivatedRoute,
    private playerService: PlayerService,
    private questService: QuestService
  ) {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.player = this.playerService.getPlayerById(id);

    if (!Number.isNaN(id)) {
      this.playerQuests = this.questService.getQuestsByPlayer(id);
    } else {
      this.playerQuests = [];
    }
  }
}
