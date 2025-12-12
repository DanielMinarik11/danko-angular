import { Component, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { QuestItemComponent } from './quest-item/quest-item';
import { QuestService, Quest } from './quest.service';
import { SearchComponent } from '../search/search';

@Component({
  selector: 'app-quests',
  standalone: true,
  imports: [QuestItemComponent, RouterModule, ReactiveFormsModule, CommonModule, SearchComponent],
  template: `
    <section>
      <h2>Available Quests</h2>

      <!-- SEARCH -->
      <app-search (queryChange)="onSearch($event)"></app-search>

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
        <p>No quests found.</p>
      }

      <h3>Create New Quest</h3>

      <form [formGroup]="questForm" (ngSubmit)="createQuest()" class="quest-form">
        <label>
          Title:
          <input formControlName="title" />
        </label>

        <div *ngIf="questForm.controls.title.touched && questForm.controls.title.invalid">
          <small *ngIf="questForm.controls.title.errors?.['required']">Required</small>
          <small *ngIf="questForm.controls.title.errors?.['minlength']">Min 3 chars</small>
        </div>

        <label>
          Description:
          <textarea formControlName="description"></textarea>
        </label>

        <label>
          XP:
          <input type="number" formControlName="xp" />
        </label>

        <button type="submit" [disabled]="questForm.invalid">Add Quest</button>
      </form>
    </section>
  `,
  styleUrls: ['./quests.css']
})
export class QuestsComponent {
  quests = signal<Quest[]>([]);
  questForm: any;
  searchQuery: string = '';

  constructor(
    private questService: QuestService,
    private fb: FormBuilder
  ) {
    this.questForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: [''],
      xp: [0, [Validators.required, Validators.min(0)]],
    });

    this.loadQuests();
  }

  // SEARCH
  onSearch(query: string) {
    this.searchQuery = query.toLowerCase();
    this.loadQuests();
  }

  // LOAD + FILTER
  loadQuests() {
    let list = this.questService.getQuests();

    if (this.searchQuery !== '') {
      list = list.filter(q => q.title.toLowerCase().includes(this.searchQuery));
    }

    this.quests.set(list);
  }

  createQuest() {
    if (this.questForm.invalid) {
      this.questForm.markAllAsTouched();
      return;
    }

    const newQuest: Quest = {
      id: Date.now(),
      title: this.questForm.value.title!,
      description: this.questForm.value.description ?? '',
      xp: this.questForm.value.xp!,
    };

    this.questService.addQuest(newQuest);
    this.loadQuests();
    this.questForm.reset();
  }

  removeQuest(id: number) {
    this.questService.removeQuest(id);
    this.loadQuests();
  }
}
