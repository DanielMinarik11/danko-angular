import { Injectable } from '@angular/core';
import { playerLevels } from '../levels';

export interface Player {
  id: number;
  nickname: string;
  xp: number;     
       
  clanId?: number;
  image?: string;
}


@Injectable({ providedIn: 'root' })
export class PlayerService {
  private players: Player[] = [
    { id: 1, nickname: 'HeroOne', xp: 250, clanId: 1, image: 'assets/my-header.jpg' },
    { id: 2, nickname: 'Scribe', xp: 150, clanId: undefined, image: 'assets/my-header.jpg' },
    { id: 3, nickname: 'Runner', xp: 700, clanId: 1, image: 'assets/my-header.jpg' }
  ];

  getPlayers(): Player[] {
    return [...this.players];
  }

  getPlayerById(id: number): Player | undefined {
    return this.players.find(p => p.id === id);
  }

  addPlayer(player: Player) {
    this.players.push(player);
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

  /** --------------------------------------
   *  Funkcie pre výpočet levelu podľa XP
   * -------------------------------------- */

  getLevel(player: Player) {
    let level = playerLevels[0];
    for (const l of playerLevels) {
      if (player.xp >= l.xpRequired) level = l;
      else break;
    }
    return level;
  }

  getNextLevel(player: Player) {
    for (const l of playerLevels) {
      if (player.xp < l.xpRequired) return l;
    }
    return playerLevels[playerLevels.length - 1]; // max level
  }

  getProgressPercent(player: Player) {
    const level = this.getLevel(player);
    const nextLevel = this.getNextLevel(player);
    if (level.level === nextLevel.level) return 100; // max level
    return ((player.xp - level.xpRequired) / (nextLevel.xpRequired - level.xpRequired)) * 100;
  }
}
