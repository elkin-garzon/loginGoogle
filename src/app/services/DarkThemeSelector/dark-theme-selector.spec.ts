import { TestBed } from '@angular/core/testing';

import { DarkThemeSelector } from './dark-theme-selector';

describe('DarkThemeSelector', () => {
  let service: DarkThemeSelector;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DarkThemeSelector);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
