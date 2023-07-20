import { TestBed } from '@angular/core/testing';

import { DbmoviesService } from './dbmovies.service';

describe('DbmoviesService', () => {
  let service: DbmoviesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DbmoviesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
