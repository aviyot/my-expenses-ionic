import { TestBed } from '@angular/core/testing';

import { SelectOpthionService } from './select-opthion.service';

describe('SelectOpthionService', () => {
  let service: SelectOpthionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SelectOpthionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
