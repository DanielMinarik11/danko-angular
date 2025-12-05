import { Component } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { QuestService, Quest } from '../quest.service';

@Component({
  selector: 'app-quest-detail',
  standalone: true,
  imports: [],
  template: `
    @if (quest) {
      <div class="quest-detail">
        <h2>{{ quest.title }}</h2>
        <img [src]="quest.image" alt="{{ quest.title }}">
        <p>{{ quest.description }}</p>
        <p><strong>XP:</strong> {{ quest.xp }}</p>
      </div>
    } @else {
      <p>Quest not found.</p>
    }
  `,
  styleUrls: ['./quest-detail.css']
})

export class QuestDetailComponent {
    quest?: Quest;

    constructor(private route: ActivatedRoute, private questService: QuestService) {
        const id = Number(this.route.snapshot.paramMap.get('id'));
        this.quest = this.questService.getQuestById(id);
    }
}