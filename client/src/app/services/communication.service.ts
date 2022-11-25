// À DÉCOMMENTER ET À UTILISER LORSQUE VOTRE COMMUNICATION EST IMPLÉMENTÉE
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of, Subject } from "rxjs";
import { Planrepas } from "../../../../common/tables/planrepas";
import { catchError } from "rxjs";

@Injectable()
export class CommunicationService {
  // À DÉCOMMENTER ET À UTILISER LORSQUE VOTRE COMMUNICATION EST IMPLÉMENTÉE
  private readonly BASE_URL: string = "http://localhost:3000/database";
  public constructor(private readonly http: HttpClient) {}

  private _listeners: any = new Subject<any>();

  listen(): Observable<any> {
    return this._listeners.asObservable();
  }

  filter(filterBy: string): void {
    this._listeners.next(filterBy);
  }

  // À DÉCOMMENTER ET À UTILISER LORSQUE VOTRE COMMUNICATION EST IMPLÉMENTÉE
  private handleError<T>(
    request: string,
    result?: T
  ): (error: Error) => Observable<T> {
    return (error: Error): Observable<T> => {
      return of(result as T);
    };
  }

  public getPlanrepas(): Observable<Planrepas[]> {
    return this.http
      .get<Planrepas[]>(this.BASE_URL + "/planrepas")
      .pipe(catchError(this.handleError<Planrepas[]>("getPlanrepas")));
  }

  public getFournisseurs(): Observable<any[]> {
    return this.http
      .get<any[]>(this.BASE_URL + "/fournisseur")
      .pipe(catchError(this.handleError<any[]>("getFournisseurs")));
  }

  public addPlanrepas(planrepas: Planrepas): Observable<number> {
    return this.http
      .post<number>(this.BASE_URL + "/planrepas/add", planrepas)
      .pipe(catchError(this.handleError<number>("addPlanrepas")));
  }

  public modifyPlanrepas(planrepas: Planrepas): Observable<number> {
    return this.http
      .patch<number>(this.BASE_URL + "/planrepas/modify", planrepas)
      .pipe(catchError(this.handleError<number>("modifyPlanrepas")));
  }

  public deletePlanrepas(planrepas: number): Observable<number> {
    return this.http
      .post<number>(this.BASE_URL + "/planrepas/delete/" + planrepas, {})
      .pipe(catchError(this.handleError<number>("deletePlanrepas")));
  }
}
