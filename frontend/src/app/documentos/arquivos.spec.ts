import { TestBed } from '@angular/core/testing';

import { Arquivos } from './arquivos';

describe('Arquivos', () => {
  let service: Arquivos;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Arquivos);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
