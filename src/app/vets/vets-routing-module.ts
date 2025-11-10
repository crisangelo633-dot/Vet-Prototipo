import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Vets } from './vets';

const routes: Routes = [{ path: '', component: Vets }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VetsRoutingModule { }
