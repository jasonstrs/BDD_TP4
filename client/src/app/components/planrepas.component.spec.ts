import { HttpClientModule } from "@angular/common/http";
import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { PlanrepasComponent } from "./planrepas.component";
import { CommunicationService } from ".././services/communication.service";

describe("AppComponent", () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [PlanrepasComponent],
      imports: [HttpClientModule],
      providers: [CommunicationService],
    }).compileComponents();
  }));

  it("should create the app", waitForAsync(() => {
    const fixture: ComponentFixture<PlanrepasComponent> =
      TestBed.createComponent(PlanrepasComponent);
    const app: any = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it(`should have as title 'client'`, waitForAsync(() => {
    const fixture: ComponentFixture<PlanrepasComponent> =
      TestBed.createComponent(PlanrepasComponent);
    const app: any = fixture.debugElement.componentInstance;
    expect(app.title).toEqual("INF3710");
  }));
});
