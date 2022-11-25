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
    router.get(
      "/fournisseur",
      (req: Request, res: Response, _: NextFunction) => {
        this.databaseService
          .getAllFromTable("fournisseur")
          .then((result: pg.QueryResult) => {
            const fournisseurs: any[] = result.rows.map((fournisseur: any) => ({
              nomfournisseur: fournisseur.nomfournisseur,
              numerofournisseur: fournisseur.numerofournisseur,
            }));
            res.json(fournisseurs);
          })
          .catch((e: Error) => {
            console.error(e.stack);
          });
      }
    );
    router.post(
      "/planrepas/add",
      (req: Request, res: Response, _: NextFunction) => {
        const planrepas: Planrepas = {
          numeroplan: req.body.numeroplan,
          categorie: req.body.categorie,
          frequence: req.body.frequence,
          nbpersonnes: req.body.nbpersonnes,
          nbcalories: req.body.nbcalories,
          prix: req.body.prix,
          numerofournisseur: req.body.numerofournisseur,
        };
        this.databaseService
          .addPlanrepas(planrepas)
          .then((result: pg.QueryResult) => {
            res.json(result.rows[0].numeroplan);
          })
          .catch((e: Error) => {
            console.error(e.stack);
          });
      }
    );
    router.patch(
      "/planrepas/modify",
      (req: Request, res: Response, _: NextFunction) => {
        const planrepas: Planrepas = {
          numeroplan: req.body.numeroplan,
          categorie: req.body.categorie,
          frequence: req.body.frequence,
          nbpersonnes: req.body.nbpersonnes,
          nbcalories: req.body.nbcalories,
          prix: req.body.prix,
          numerofournisseur: req.body.numerofournisseur,
        };
        this.databaseService
          .modifyPlanrepas(planrepas)
          .then((result: pg.QueryResult) => {
            res.json(result.rowCount);
          })
          .catch((e: Error) => {
            console.error(e.stack);
          });
      }
    );
    router.post(
      "/planrepas/delete/:planrepas",
      (req: Request, res: Response, _: NextFunction) => {
        const planrepas: string = req.params.planrepas;
        this.databaseService
          .deletePlanrepas(planrepas)
          .then((result: pg.QueryResult) => {
            res.json(result.rowCount);
          })
          .catch((e: Error) => {
            console.error(e.stack);
          });
      }
    );
    return router;
  }
}
