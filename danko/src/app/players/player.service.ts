import { Injectable } from '@angular/core';

export interface Player {
  id: number;
  nickname: string;
  level: number;
  clanId?: number;
  image?: string;
}

@Injectable({ providedIn: 'root' })
export class PlayerService {
  private players: Player[] = [
    { id: 1, nickname: 'HeroOne', level: 5, clanId: 1, image: 'assets/my-header.jpg' },
    { id: 2, nickname: 'Scribe', level: 3, clanId: undefined, image: 'assets/my-header.jpg' },
    { id: 3, nickname: 'Runner', level: 7, clanId: 1, image: 'assets/my-header.jpg' }
  ];

  getPlayers(): Player[] {
    return [...this.players];
  }

  getPlayerById(id: number): Player | undefined {
    return this.players.find(p => p.id === id);
  }

  addPlayer(defaultNickname?: string): Player {
    const nextId = this.players.length ? Math.max(...this.players.map(p => p.id)) + 1 : 1;
    const newPlayer: Player = {
      id: nextId,
      nickname: defaultNickname ?? `Player${nextId}`,
      level: 1,
      clanId: undefined,
      image: 'assets/my-header.jpg'
    };
    this.players.push(newPlayer);
    return newPlayer;
  }

  removePlayer(id: number) {
    this.players = this.players.filter(p => p.id !== id);
  }

  setClan(playerId: number, clanId?: number) {
    const p = this.getPlayerById(playerId);
    if (p) p.clanId = clanId;
  }

  getPlayersNotInClan(clanId?: number): Player[] {
    return this.players.filter(p => p.clanId !== clanId);
  }
}