import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdsPosterComponent } from './ads-poster.component';

describe('AdsPosterComponent', () => {
  let component: AdsPosterComponent;
  let fixture: ComponentFixture<AdsPosterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdsPosterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdsPosterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
