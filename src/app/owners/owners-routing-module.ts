import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Owners } from './owners';

const routes: Routes = [{ path: '', component: Owners }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OwnersRoutingModule { }
