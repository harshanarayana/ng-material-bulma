import { TestBed, inject } from '@angular/core/testing';

import { OpenaqService } from './openaq.service';

describe('OpenaqService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OpenaqService]
    });
  });

  it('should be created', inject([OpenaqService], (service: OpenaqService) => {
    expect(service).toBeTruthy();
  }));
});
