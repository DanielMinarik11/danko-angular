import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerQuestListComponent } from './player-quest-list';

describe('PlayerQuestList', () => {
  let component: PlayerQuestListComponent;
  let fixture: ComponentFixture<PlayerQuestListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlayerQuestListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlayerQuestListComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
