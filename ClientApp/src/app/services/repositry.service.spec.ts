import { TestBed } from '@angular/core/testing';

import { RepositryService } from './repositry.service';

describe('RepositryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RepositryService = TestBed.get(RepositryService);
    expect(service).toBeTruthy();
  });
});
