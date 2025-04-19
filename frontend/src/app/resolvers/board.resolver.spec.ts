import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { boardResolver } from './board.resolver';

describe('boardResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => boardResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
