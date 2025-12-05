import { Component, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { ClanService, Clan } from './clan.service';
import { PlayerService } from '../players/player.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-clans',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, CommonModule],
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

      <h3>Create New Clan</h3>

      <form [formGroup]="clanForm" (ngSubmit)="createClan()" class="clan-form">
        <label>
          Name:
          <input formControlName="name" />
        </label>
        <div *ngIf="clanForm.controls.name.touched && clanForm.controls.name.invalid">
          <small *ngIf="clanForm.controls.name.errors?.['required']">Required</small>
          <small *ngIf="clanForm.controls.name.errors?.['minlength']">Min 2 chars</small>
        </div>

        <label>
          Description:
          <textarea formControlName="description"></textarea>
        </label>

        <label>
          Capacity:
          <input type="number" formControlName="capacity" />
        </label>

        <button type="submit" [disabled]="clanForm.invalid">Add Clan</button>
      </form>
    </section>
  `,
  styleUrls: ['./clans.css']
})
export class ClansComponent {
  clans = signal<Clan[]>([]);
  clanForm: any;

  constructor(
    private clanService: ClanService,
    private playerService: PlayerService,
    private fb: FormBuilder
  ) {
    this.clans.set(this.clanService.getClans());

    this.clanForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      description: [''],
      capacity: [10, [Validators.required, Validators.min(1)]],
    });
  }

  createClan() {
    if (this.clanForm.invalid) {
      this.clanForm.markAllAsTouched();
      return;
    }

    const newClan: Clan = {
      id: Date.now(),
      name: this.clanForm.value.name!,
      description: this.clanForm.value.description ?? '',
      capacity: this.clanForm.value.capacity!,
      members: [],
      image: 'assets/my-header.jpg'
    };
    
    this.clanService.addClanFromForm(newClan);
    this.clans.set(this.clanService.getClans());


    this.clanForm.reset({ capacity: 10 });
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
