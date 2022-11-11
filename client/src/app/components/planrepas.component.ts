import { Location } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Planrepas } from "../../../../common/tables/planrepas";
import { CommunicationService } from "../services/communication.service";

@Component({
  selector: "planrepas",
  templateUrl: "./planrepas.component.html",
  styleUrls: ["./planrepas.component.css"],
})
export class PlanrepasComponent implements OnInit {
  public route: string;
  public planrepas: Planrepas[] = [];

  public constructor(
    location: Location,
    router: Router,
    protected communicationService: CommunicationService
  ) {
    router.events.subscribe((_val: any) => {
      if (location.path() !== "") {
        this.route = location.path();
      } else {
        this.route = "";
      }
    });
  }

  public readonly title: string = "INF3710 TP4";
  public ngOnInit(): void {
    this.getPlanrepas();
  }

  public getPlanrepas(): void {
    this.communicationService
      .getHotels()
      .subscribe((planrepas: Planrepas[]) => {
        this.planrepas = planrepas;
      });
  }
}
