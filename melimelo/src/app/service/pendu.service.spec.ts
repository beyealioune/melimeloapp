import { TestBed } from '@angular/core/testing';

import { PenduService } from './pendu.service';

describe('PenduService', () => {
  let service: PenduService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PenduService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
