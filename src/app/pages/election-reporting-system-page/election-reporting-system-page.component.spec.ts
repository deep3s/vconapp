import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ElectionReportingSystemPageComponent } from "./election-reporting-system-page.component";

describe("ElectionReportingSystemPageComponent", () => {
  let component: ElectionReportingSystemPageComponent;
  let fixture: ComponentFixture<ElectionReportingSystemPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ElectionReportingSystemPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ElectionReportingSystemPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
