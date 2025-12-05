import { Component, signal } from '@angular/core';

import { ClanService, Clan } from './clan.service';
import { PlayerService } from '../players/player.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-clans',
  standalone: true,
  imports: [RouterModule],
  template: `
    <section>
      <h2>Clans</h2>
      <p><strong>Count:</strong> {{ clans().length }}</p>

      @if (clans().length > 0) {
        @for (clan of clans(); track clan.id) {
          <div class="clan-row">
            <img [src]="clan.image" alt="{{ clan.name }}" width="80" />
            <div class="clan-info">
              <a [routerLink]="['/clans', clan.id]"><strong>{{ clan.name }}</strong></a>
              <div>{{ clan.description }}</div>
              <div>Members: {{ clan.members.length }} / {{ clan.capacity }}</div>
            </div>
            <div class="clan-actions">
              <button (click)="remove(clan.id)">Delete Clan</button>
            </div>
          </div>
          <hr/>
        }
      } @else {
        <p>No clans yet.</p>
      }

      <button (click)="addClan()">Add Clan</button>
    </section>
  `,
  styleUrls: ['./clans.css']
})
export class ClansComponent {
  clans = signal<Clan[]>([]);

  constructor(private clanService: ClanService, private playerService: PlayerService) {
    this.clans.set(this.clanService.getClans());
  }

  addClan() {
    this.clanService.addClan();
    this.clans.set(this.clanService.getClans());
  }

  remove(id: number) {
    const clan = this.clanService.getClanById(id);
    if (clan) {
      for (const pid of [...clan.members]) {
        this.playerService.setClan(pid, undefined);
      }
    }
    this.clanService.removeClan(id);
    this.clans.set(this.clanService.getClans());
  }
}
