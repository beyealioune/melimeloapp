import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PenduComponent } from './pendu.component';

describe('PenduComponent', () => {
  let component: PenduComponent;
  let fixture: ComponentFixture<PenduComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PenduComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PenduComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
