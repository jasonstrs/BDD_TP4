import { Location } from "@angular/common";
import { Component, Inject, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Planrepas } from "../../../../common/tables/planrepas";
import { CommunicationService } from "../services/communication.service";
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
} from "@angular/material/dialog";

@Component({
  selector: "planrepas",
  templateUrl: "./planrepas.component.html",
  styleUrls: ["./planrepas.component.css"],
})
export class PlanrepasComponent implements OnInit {
  public route: string;
  public planrepas: Planrepas[] = [];
  public fournisseurs: any[] = [];

  public constructor(
    location: Location,
    router: Router,
    protected communicationService: CommunicationService,
    public dialog: MatDialog
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
      .getPlanrepas()
      .subscribe((planrepas: Planrepas[]) => {
        this.planrepas = planrepas;
      });
  }

  public addPlanrepas(): void {
    this.communicationService
      .getFournisseurs()
      .subscribe((fournisseurs: any[]) => {
        this.fournisseurs = fournisseurs;
        const dialogRef = this.dialog.open(PlanrepasDialogComponent, {
          width: "500px",
          data: {
            planrepas: {
              numeroplan: undefined,
              categorie: "",
              frequence: undefined,
              nbpersonnes: undefined,
              nbcalories: undefined,
              prix: undefined,
              numerofournisseur: undefined,
            },
            fournisseurs,
          },
        });
        dialogRef.afterClosed().subscribe((result) => {
          if (result && result.planrepas)
            this.communicationService
              .addPlanrepas(result.planrepas)
              .subscribe((response: number) => {
                result.planrepas.numeroplan = response;
                this.planrepas.push(result.planrepas);
              });
        });
      });
  }

  public modifyPlanrepas(planrepas: Planrepas): void {
    const dialogRef = this.dialog.open(PlanrepasDialogComponent, {
      width: "500px",
      data: { ...planrepas },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result)
        this.communicationService.modifyPlanrepas(result).subscribe(() => {
          console.log(result);
          this.planrepas = this.planrepas.map((plan) => {
            if (plan.numeroplan === result.numeroplan) return result;
            return plan;
          });
        });
    });
  }

  public deletePlanrepas(planrepas: number): void {
    this.communicationService.deletePlanrepas(planrepas).subscribe(() => {
      this.planrepas = this.planrepas.filter((plan) => {
        return plan.numeroplan !== planrepas;
      });
    });
  }
}

@Component({
  selector: "planrepas-dialog-component",
  templateUrl: "./planrepasdialog.component.html",
})
export class PlanrepasDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<PlanrepasDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
