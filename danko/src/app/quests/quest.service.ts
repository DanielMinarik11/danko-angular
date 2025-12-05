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
    { id: 1, title: 'Read a chapter', description: 'Read one chapter of a book', xp: 50, image: 'assets/book.jpg', playerId: 1 },
    { id: 2, title: 'Meditation', description: 'Meditate for 20 minutes', xp: 60, image: 'assets/meditation.jpg', playerId: 2 },
    { id: 3, title: 'Evening walk', description: 'Walk 5km in the evening', xp: 100, image: 'assets/walk.jpg', playerId: 1 }
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

  // PREPISANÁ verzia:
  addQuest(quest: Quest) {
    this.quests.push(quest);
  }

  removeQuest(id: number) {
    this.quests = this.quests.filter(q => q.id !== id);
  }

  assignQuestToPlayer(questId: number, playerId: number) {
    const q = this.getQuestById(questId);
    if (q) q.playerId = playerId;
  }
}
