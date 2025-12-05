import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerQuestList } from './player-quest-list';

describe('PlayerQuestList', () => {
  let component: PlayerQuestList;
  let fixture: ComponentFixture<PlayerQuestList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlayerQuestList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlayerQuestList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
