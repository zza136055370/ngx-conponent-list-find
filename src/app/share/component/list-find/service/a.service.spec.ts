import { TestBed, inject } from '@angular/core/testing';

import { AService } from './a.service';

describe('AService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AService]
    });
  });

  it('should be created', inject([AService], (service: AService) => {
    expect(service).toBeTruthy();
  }));
});
