import { Component, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms'; // required for ngModel

import { PlayerService, Player } from './player.service';
import { playerLevels, PlayerLevel } from '../levels';
import { SearchComponent } from '../search/search'; // <-- import search component


@Component({
  selector: 'app-players',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, CommonModule, FormsModule, SearchComponent],
  template: `
    <section>
      <h2>Players</h2>

      <!-- SEARCH -->
      <app-search (queryChange)="onSearch($event)"></app-search>

      <!-- FILTER BY LEVEL -->
      <label>
        Filter by level:
        <select [(ngModel)]="selectedLevel" (ngModelChange)="onFilterChange()">
          <option value="">All</option>
          @for (lvl of levels; track lvl) {
            <option [value]="lvl.title">{{ lvl.title }}</option>
          }
        </select>
      </label>

      <p><strong>Count:</strong> {{ players().length }}</p>

      @if (players().length > 0) {
        @for (player of players(); track player.id) {
          <div class="player-row">
            <div class="player-info">
              <a [routerLink]="['/players', player.id]">
                <strong>{{ player.nickname }}</strong>
              </a>
              <div>
                Level: {{ getLevel(player).level }} — {{ getLevel(player).title }}
              </div>
              <div *ngIf="getNextLevel(player) as nextLevel">
                XP: {{ player.xp }} / {{ nextLevel.xpRequired }}
                ({{ getProgressPercent(player) | number:'1.0-0' }}%)
              </div>
              <div *ngIf="!getNextLevel(player)">
                Max level reached
              </div>
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

      <h3>Create New Player</h3>

      <form [formGroup]="playerForm" (ngSubmit)="createPlayer()" class="player-form">
        <label>
          Nickname:
          <input formControlName="nickname" />
        </label>
        <div *ngIf="playerForm.controls.nickname.touched && playerForm.controls.nickname.invalid">
          <small *ngIf="playerForm.controls.nickname.errors?.['required']">Required</small>
          <small *ngIf="playerForm.controls.nickname.errors?.['minlength']">Min 2 chars</small>
        </div>

        <label>
          XP:
          <input type="number" formControlName="xp" />
        </label>

        <button type="submit" [disabled]="playerForm.invalid">Add Player</button>
      </form>
    </section>
  `,
  styleUrls: ['./players.css']
})
export class PlayersComponent {
  players = signal<Player[]>([]);

  // FILTER & SEARCH
  selectedLevel = '';
  searchQuery = '';
  levels = playerLevels;

  playerForm: any;

  constructor(private playerService: PlayerService, private fb: FormBuilder) {
    this.loadPlayers();

    this.playerForm = this.fb.group({
      nickname: ['', [Validators.required, Validators.minLength(2)]],
      xp: [0, [Validators.required, Validators.min(0)]],
    });
  }

  // SEARCH
  onSearch(query: string) {
    this.searchQuery = query.toLowerCase();
    this.loadPlayers();
  }

  // LEVEL FILTER
  onFilterChange() {
    this.loadPlayers();
  }

  // LOAD + FILTER
  loadPlayers() {
    let list = this.playerService.getPlayers();

    // filter by level
    if (this.selectedLevel !== '') {
      list = list.filter(p => this.getLevel(p).title === this.selectedLevel);
    }

    // filter by search
    if (this.searchQuery !== '') {
      list = list.filter(p => p.nickname.toLowerCase().includes(this.searchQuery));
    }

    this.players.set(list);
  }

  // CREATE PLAYER
  createPlayer() {
    if (this.playerForm.invalid) {
      this.playerForm.markAllAsTouched();
      return;
    }

    const newPlayer: Player = {
      id: Date.now(),
      nickname: this.playerForm.value.nickname!,
      xp: this.playerForm.value.xp!,
    };

    this.playerService.addPlayer(newPlayer);
    this.loadPlayers();
    this.playerForm.reset({ xp: 0 });
  }

  // REMOVE PLAYER
  remove(id: number) {
    this.playerService.removePlayer(id);
    this.loadPlayers();
  }

  // LEVEL LOGIKA
  getLevel(player: Player): PlayerLevel {
    let level = playerLevels[0];
    for (const l of playerLevels) {
      if (player.xp >= l.xpRequired) level = l;
      else break;
    }
    return level;
  }

  getNextLevel(player: Player): PlayerLevel | null {
    for (const l of playerLevels) {
      if (player.xp < l.xpRequired) return l;
    }
    return null;
  }

  getProgressPercent(player: Player): number {
    const level = this.getLevel(player);
    const nextLevel = this.getNextLevel(player);
    if (!nextLevel) return 100;

    const xpInCurrentLevel = player.xp - level.xpRequired;
    const xpNeededForNext = nextLevel.xpRequired - level.xpRequired;
    return xpNeededForNext > 0 ? (xpInCurrentLevel / xpNeededForNext) * 100 : 100;
  }
}
