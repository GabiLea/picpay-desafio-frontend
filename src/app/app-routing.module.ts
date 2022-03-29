import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./modules/auth/pages/login/login.component";
import { AuthGuard } from './guard/auth.guard';

const routes: Routes = [
  { path: "", component: LoginComponent },
  {
    path: "payments",
    canActivateChild:[AuthGuard],
    loadChildren: () => import("./modules/payments/payments.module").then(m=>m.PaymentsModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
