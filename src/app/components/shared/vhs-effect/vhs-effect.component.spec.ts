import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VhsEffectComponent } from './vhs-effect.component';

describe('VhsEffectComponent', () => {
  let component: VhsEffectComponent;
  let fixture: ComponentFixture<VhsEffectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VhsEffectComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VhsEffectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
