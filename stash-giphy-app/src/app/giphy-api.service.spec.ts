import { TestBed } from '@angular/core/testing';

import { GiphyApiService } from './giphy-api.service';

describe('GiphyApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GiphyApiService = TestBed.get(GiphyApiService);
    expect(service).toBeTruthy();
  });
});
