import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PoliciesComponent } from "./policies.component";

const routes: Routes = [
  {
    path: '',
    component: PoliciesComponent
  }
]

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes), PoliciesComponent]
})
export class PoliciesModule { }
