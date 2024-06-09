import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferencesInspirationsComponent } from './references-inspirations.component';

describe('ReferencesInspirationsComponent', () => {
  let component: ReferencesInspirationsComponent;
  let fixture: ComponentFixture<ReferencesInspirationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReferencesInspirationsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReferencesInspirationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
