import { TestBed } from '@angular/core/testing';

import { Back4appConfigService } from './back4app-config.service';

describe('Back4appConfigService', () => {
  let service: Back4appConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Back4appConfigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
