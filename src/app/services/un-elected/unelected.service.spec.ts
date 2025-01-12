import { TestBed } from "@angular/core/testing";

import { UnelectedService } from "./unelected.service";

describe("UnelectedService", () => {
  let service: UnelectedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UnelectedService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
