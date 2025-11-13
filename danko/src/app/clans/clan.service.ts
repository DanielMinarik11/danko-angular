import { Injectable } from '@angular/core';

export interface Clan {
  id: number;
  name: string;
  description: string;
  capacity: number;
  image?: string;
  members: number[];
}

@Injectable({ providedIn: 'root' })
export class ClanService {
  private clans: Clan[] = [
    { id: 1, name: 'GreenBlades', description: 'Brave adventurers', capacity: 10, image: 'assets/my-header.jpg', members: [1,3] },
    { id: 2, name: 'LoneWolves', description: 'Solo masters', capacity: 5, image: 'assets/my-header.jpg', members: [] },
  ];

  getClans(): Clan[] {
    return [...this.clans];
  }

  getClanById(id: number): Clan | undefined {
    return this.clans.find(c => c.id === id);
  }

  addClan(defaultName?: string): Clan {
    const nextId = this.clans.length ? Math.max(...this.clans.map(c => c.id)) + 1 : 1;
    const newClan: Clan = {
      id: nextId,
      name: defaultName ?? `Clan${nextId}`,
      description: 'New clan',
      capacity: 10,
      image: 'assets/my-header.jpg',
      members: []
    };
    this.clans.push(newClan);
    return newClan;
  }

  removeClan(id: number) {
    this.clans = this.clans.filter(c => c.id !== id);
  }

  addMember(clanId: number, playerId: number): boolean {
    const clan = this.getClanById(clanId);
    if (!clan) return false;
    if (clan.members.length >= clan.capacity) return false;
    if (!clan.members.includes(playerId)) clan.members.push(playerId);
    return true;
  }

  removeMember(clanId: number, playerId: number) {
    const clan = this.getClanById(clanId);
    if (!clan) return;
    clan.members = clan.members.filter(id => id !== playerId);
  }
}
