import { Injectable } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface Quest {
  id: number;
  title: string;
  description: string;
  xp: number;
  image?: string;
  playerId?: number;
}

@Injectable({ providedIn: 'root' })
export class QuestService {
  private quests: Quest[] = [
    { id: 1, title: 'Audiobook hour', description: 'Listen for 1 hour', xp: 40, image: 'assets/my-header.jpg', playerId: 1 },
    { id: 2, title: 'Journal writing', description: 'Write for 15 minutes', xp: 80, image: 'assets/my-header.jpg', playerId: 2 },
    { id: 3, title: 'Morning run', description: 'Run 3km', xp: 120, image: 'assets/my-header.jpg', playerId: 1 }
  ];

  getQuests(): Quest[] {
    return [...this.quests];
  }

  getQuestById(id: number): Quest | undefined {
    return this.quests.find(q => q.id === id);
  }

  getQuestsByPlayer(playerId: number): Quest[] {
    return this.quests.filter(q => q.playerId === playerId);
  }

  addQuestForPlayer(playerId?: number) {
    const nextId = this.quests.length ? Math.max(...this.quests.map(q => q.id)) + 1 : 1;
    this.quests.push({
      id: nextId,
      title: 'New Quest',
      description: 'Generated quest',
      xp: 60,
      image: 'assets/my-header.jpg',
      playerId
    });
  }

  addQuest() {
    this.addQuestForPlayer(undefined);
  }

  removeQuest(id: number) {
    this.quests = this.quests.filter(q => q.id !== id);
  }

  assignQuestToPlayer(questId: number, playerId: number) {
    const q = this.getQuestById(questId);
    if (q) q.playerId = playerId;
  }
}