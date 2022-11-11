import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { AppComponent } from "../app.component";
import { PlanrepasComponent } from "../components/planrepas.component";

const routes: Routes = [
  { path: "app", component: AppComponent },
  { path: "planrepas", component: PlanrepasComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
