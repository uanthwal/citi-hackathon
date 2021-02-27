import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AnalyticsComponent } from "./analytics/analytics.component";
import { AuthGuard } from "./app.auth-guard";
import { HomeComponent } from "./home/home.component";

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "home", component: HomeComponent },
  {
    path: "analytics",
    component: AnalyticsComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
