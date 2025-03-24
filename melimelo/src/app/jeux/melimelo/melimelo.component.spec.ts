import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MelimeloComponent } from './melimelo.component';

describe('MelimeloComponent', () => {
  let component: MelimeloComponent;
  let fixture: ComponentFixture<MelimeloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MelimeloComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MelimeloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
