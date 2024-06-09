import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotableAchievementsComponent } from './notable-achievements.component';

describe('NotableAchievementsComponent', () => {
  let component: NotableAchievementsComponent;
  let fixture: ComponentFixture<NotableAchievementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotableAchievementsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NotableAchievementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
