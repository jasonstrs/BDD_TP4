import { injectable } from "inversify";
import * as pg from "pg";
import "reflect-metadata";
import { Planrepas } from "../../../common/tables/planrepas";

@injectable()
export class DatabaseService {
  public connectionConfig: pg.ConnectionConfig = {
    user: "admin",
    database: "TP4_Livraison",
    password: "admin",
    port: 5432, // Attention ! Peut aussi être 5433 pour certains utilisateurs
    host: "127.0.0.1",
    keepAlive: true,
  };

  public pool: pg.Pool = new pg.Pool(this.connectionConfig);

  public async getAllFromTable(tableName: string): Promise<pg.QueryResult> {
    const client = await this.pool.connect();
    const res = await client.query(`SELECT * FROM ${tableName};`);
    client.release();
    return res;
  }

  public async addPlanrepas(planrepas: Planrepas): Promise<pg.QueryResult> {
    const client = await this.pool.connect();
    const values: any[] = [
      planrepas.categorie,
      planrepas.frequence,
      planrepas.nbpersonnes,
      planrepas.nbcalories,
      planrepas.prix,
      planrepas.numerofournisseur,
    ];
    const res = await client.query(
      `INSERT INTO Planrepas(categorie, frequence, nbpersonnes, nbcalories, prix, numerofournisseur) VALUES($1, $2, $3, $4, $5, $6) RETURNING numeroplan;`,
      values
    );
    client.release();
    return res;
  }

  public async modifyPlanrepas(planrepas: Planrepas): Promise<pg.QueryResult> {
    const client = await this.pool.connect();

    let modifiedValues = [];

    const freq = planrepas.frequence ? `'${planrepas.frequence}'` : 'NULL'
    const nbPersonnes = planrepas.nbpersonnes ? `'${planrepas.nbpersonnes}'` : 'NULL'
    const nbCalories = planrepas.nbcalories ? `'${planrepas.nbcalories}'` : 'NULL'


    modifiedValues.push(`categorie = '${planrepas.categorie}'`);
    modifiedValues.push(`frequence = ${freq}`);
    modifiedValues.push(`nbpersonnes = ${nbPersonnes}`);
    modifiedValues.push(`nbcalories = ${nbCalories}`);
    modifiedValues.push(`prix = '${planrepas.prix}'`);
    modifiedValues.push(`numerofournisseur = '${planrepas.numerofournisseur}'`);

    console.log(planrepas)
    console.log(modifiedValues)

    const query = `UPDATE Planrepas SET ${modifiedValues.join(
      ", "
    )} WHERE numeroplan = '${planrepas.numeroplan}';`;
    const res = await client.query(query);
    client.release();
    return res;
  }

  public async deletePlanrepas(planrepas: string): Promise<pg.QueryResult> {
    const client = await this.pool.connect();
    const res = await client.query(
      `DELETE FROM Planrepas WHERE numeroplan=${planrepas};`
    );
    client.release();
    return res;
  }
}
