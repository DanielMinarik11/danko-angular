import { Component, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { QuestItemComponent } from './quest-item/quest-item';
import { RouterModule } from '@angular/router';
import { QuestService, Quest } from './quest.service';

@Component({
  selector: 'app-quests',
  standalone: true,
  imports: [QuestItemComponent, RouterModule, ReactiveFormsModule, CommonModule],
  template: `
    <section>
      <h2>Available Quests</h2>

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
        <p>No quests available</p>
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

  constructor(
    private questService: QuestService,
    private fb: FormBuilder
  ) {
    this.quests.set(this.questService.getQuests());

    this.questForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: [''],
      xp: [0, [Validators.required, Validators.min(0)]],
    });
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

    this.questService.addQuest(newQuest);  // <-- teraz OK
    this.quests.set(this.questService.getQuests());

    this.questForm.reset();
  }

  removeQuest(id: number) {
    this.questService.removeQuest(id);
    this.quests.set(this.questService.getQuests());
  }
}
