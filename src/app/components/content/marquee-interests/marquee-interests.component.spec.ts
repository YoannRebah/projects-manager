import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarqueeInterestsComponent } from './marquee-interests.component';

describe('MarqueeInterestsComponent', () => {
  let component: MarqueeInterestsComponent;
  let fixture: ComponentFixture<MarqueeInterestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MarqueeInterestsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MarqueeInterestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
