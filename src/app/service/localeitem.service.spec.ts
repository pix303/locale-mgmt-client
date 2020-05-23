import { TestBed } from '@angular/core/testing';

import { LocaleitemService } from './localeitem.service';

describe('LocaleitemService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LocaleitemService = TestBed.get(LocaleitemService);
    expect(service).toBeTruthy();
  });
});
