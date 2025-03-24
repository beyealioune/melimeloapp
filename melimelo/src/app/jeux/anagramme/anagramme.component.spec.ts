import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnagrammeComponent } from './anagramme.component';

describe('AnagrammeComponent', () => {
  let component: AnagrammeComponent;
  let fixture: ComponentFixture<AnagrammeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnagrammeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AnagrammeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
