import { TestBed } from '@angular/core/testing';

import { AuthuService } from './authu.service';

describe('AuthuService', () => {
  let service: AuthuService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthuService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
