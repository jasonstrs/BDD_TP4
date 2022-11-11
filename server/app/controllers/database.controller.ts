import { NextFunction, Request, Response, Router } from "express";
import { inject, injectable } from "inversify";
import { DatabaseService } from "../services/database.service";
import Types from "../types";
import { Planrepas } from "../../../common/tables/planrepas";
import * as pg from "pg";

@injectable()
export class DatabaseController {
  public constructor(
    // @ts-ignore -- À ENLEVER LORSQUE L'IMPLÉMENTATION EST TERMINÉE
    @inject(Types.DatabaseService)
    private readonly databaseService: DatabaseService
  ) {}

  public get router(): Router {
    const router: Router = Router();
    router.get("/planrepas", (req: Request, res: Response, _: NextFunction) => {
      this.databaseService
        .getAllFromTable("planrepas")
        .then((result: pg.QueryResult) => {
          const planrepas: Planrepas[] = result.rows.map((plan: Planrepas) => ({
            numeroplan: plan.numeroplan,
            categorie: plan.categorie,
            frequence: plan.frequence,
            nbpersonnes: plan.nbpersonnes,
            nbcalories: plan.nbcalories,
            prix: plan.prix,
            numerofournisseur: plan.numerofournisseur,
          }));
          res.json(planrepas);
        })
        .catch((e: Error) => {
          console.error(e.stack);
        });
    });
    return router;
  }
}
