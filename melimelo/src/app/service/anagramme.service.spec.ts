import { TestBed } from '@angular/core/testing';

import { AnagrammeService } from './anagramme.service';

describe('AnagrammeService', () => {
  let service: AnagrammeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnagrammeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
