// src/app/clans/clan-detail/clan-detail.component.ts
import { Component } from '@angular/core';

import { ActivatedRoute, RouterModule } from '@angular/router';
import { ClanService } from '../clan.service';
import { PlayerService } from '../../players/player.service';

@Component({
  selector: 'app-clan-detail',
  standalone: true,
  imports: [RouterModule],
  template: `
    @if (clan) {
      <section>
        <h2>{{ clan.name }}</h2>
        <img [src]="clan.image" alt="{{ clan.name }}" width="200" />
        <p>{{ clan.description }}</p>
        <p>Capacity: {{ clan.members.length }} / {{ clan.capacity }}</p>

        <h3>Members</h3>
        @if (clan.members.length > 0) {
          @for (pid of clan.members; track pid) {
            <div>
              <a [routerLink]="['/players', pid]">{{ getPlayerName(pid) }}</a>
              <button (click)="removeMember(pid)">Remove</button>
            </div>
          }
        } @else {
          <p>No members yet.</p>
        }

        <h4>Add a player to clan</h4>
        <div>
          <select #sel>
            @for (p of playersNotInClan(); track p.id) {
              <option [value]="p.id">{{ p.nickname }} (Lv {{ p.level }})</option>
            }
          </select>
          <button (click)="addSelectedMember(sel.value)">Add</button>
        </div>
      </section>
    } @else {
      <p>Clan not found.</p>
    }
  `
})
export class ClanDetailComponent {
  clan?: ReturnType<ClanService['getClanById']>;
  playersNotInClan = () => this.playerService.getPlayersNotInClan(this.clan?.id);
  private clanId?: number;

  constructor(private route: ActivatedRoute, private clanService: ClanService, private playerService: PlayerService) {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.clanId = id;
    this.clan = this.clanService.getClanById(id);
  }

  getPlayerName(pid: number) {
    return this.playerService.getPlayerById(pid)?.nickname ?? 'Unknown';
  }

  removeMember(pid: number) {
    if (!this.clanId) return;
    this.clanService.removeMember(this.clanId, pid);
    this.playerService.setClan(pid, undefined);
    this.clan = this.clanService.getClanById(this.clanId);
  }

  addSelectedMember(value: any) {
    const pid = Number(value);
    if (!this.clanId) return;
    const success = this.clanService.addMember(this.clanId, pid);
    if (success) {
      this.playerService.setClan(pid, this.clanId);
      this.clan = this.clanService.getClanById(this.clanId);
    } else {
      // optionally show alert
      alert('Could not add player (capacity reached or already member).');
    }
  }
}
