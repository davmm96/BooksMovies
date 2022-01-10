import { TestBed } from '@angular/core/testing';

import { NytimesapiService } from './nytimesapi.service';

describe('NytimesapiService', () => {
  let service: NytimesapiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NytimesapiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
