import { TestBed } from '@angular/core/testing';
import {VconService} from "./vcon.service";


describe('VconService', () => {
  let service: VconService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VconService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
