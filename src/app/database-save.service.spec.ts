import { TestBed } from '@angular/core/testing';

import { DatabaseSaveService } from './database-save.service';

describe('DatabaseSaveService', () => {
  let service: DatabaseSaveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DatabaseSaveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
