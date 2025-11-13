import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayerService, Player } from './player.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-players',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <section>
      <h2>Players</h2>
      <p><strong>Count:</strong> {{ players().length }}</p>

      @if (players().length > 0) {
        @for (player of players(); track player.id) {
          <div class="player-row">
            <img [src]="player.image" alt="{{ player.nickname }}" width="60" />
            <div class="player-info">
              <a [routerLink]="['/players', player.id]"><strong>{{ player.nickname }}</strong></a>
              <div>Level: {{ player.level }}</div>
              <div>@if (player.clanId) { <span>Clan: <a [routerLink]="['/clans', player.clanId]">View</a></span> } @else { <span>No clan</span> }</div>
            </div>
            <div class="player-actions">
              <button (click)="remove(player.id)">Delete</button>
            </div>
          </div>
          <hr />
        }
      } @else {
        <p>No players yet.</p>
      }

      <button (click)="addPlayer()">Add Player</button>
    </section>
  `,
  styleUrls: ['./players.css']
})
export class PlayersComponent {
  players = signal<Player[]>([]);

  constructor(private playerService: PlayerService) {
    this.players.set(this.playerService.getPlayers());
  }

  addPlayer() {
    this.playerService.addPlayer();
    this.players.set(this.playerService.getPlayers());
  }

  remove(id: number) {
    this.playerService.removePlayer(id);
    this.players.set(this.playerService.getPlayers());
  }
}
