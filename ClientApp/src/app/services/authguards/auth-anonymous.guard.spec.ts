import { TestBed, async, inject } from '@angular/core/testing';

import { AuthAnonymousGuard } from './auth-anonymous.guard';

describe('AuthAnonymousGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthAnonymousGuard]
    });
  });

  it('should ...', inject([AuthAnonymousGuard], (guard: AuthAnonymousGuard) => {
    expect(guard).toBeTruthy();
  }));
});
