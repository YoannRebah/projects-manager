import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArcadeRoomComponent } from './arcade-room.component';

describe('ArcadeRoomComponent', () => {
  let component: ArcadeRoomComponent;
  let fixture: ComponentFixture<ArcadeRoomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArcadeRoomComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ArcadeRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
