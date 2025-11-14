import { bootstrapApplication } from '@angular/platform-browser';
import { App } from './app/app';
import { provideRouter } from '@angular/router';
import { provideZoneChangeDetection } from '@angular/core';

import { HomeComponent } from './app/home/home';
import { QuestsComponent } from './app/quests/quests';
import { QuestDetailComponent } from './app/quests/quest-detail/quest-detail';
import { PlayersComponent } from './app/players/players';
import { PlayerDetailComponent } from './app/players/player-detail/player-detail';
import { ClansComponent } from './app/clans/clans';
import { ClanDetailComponent } from './app/clans/clan-detail/clan-detail';

const routes = [
  { path: '', component: HomeComponent },
  { path: 'quests', component: QuestsComponent },
  { path: 'quests/:id', component: QuestDetailComponent },
  { path: 'players', component: PlayersComponent },
  { path: 'players/:id', component: PlayerDetailComponent },
  { path: 'clans', component: ClansComponent },
  { path: 'clans/:id', component: ClanDetailComponent },
];

bootstrapApplication(App, {
  providers: [
    provideZoneChangeDetection(),
    provideRouter(routes)
  ]
});
