import { TestBed } from '@angular/core/testing';

import { UIEventsService } from './ui-libs-events.service';

describe('UIEventsService', () => {
  let service: UIEventsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UIEventsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
