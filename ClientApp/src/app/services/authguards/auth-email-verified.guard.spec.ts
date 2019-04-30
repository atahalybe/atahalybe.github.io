import { TestBed, async, inject } from '@angular/core/testing';

import { AuthEmailVerifiedGuard } from './auth-email-verified.guard';

describe('AuthEmailVerifiedGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthEmailVerifiedGuard]
    });
  });

  it('should ...', inject([AuthEmailVerifiedGuard], (guard: AuthEmailVerifiedGuard) => {
    expect(guard).toBeTruthy();
  }));
});
