import { TestBed } from '@angular/core/testing';

import { MelimeloService } from './melimelo.service';

describe('MelimeloService', () => {
  let service: MelimeloService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MelimeloService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
