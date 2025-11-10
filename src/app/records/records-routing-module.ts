import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Records } from './records';

const routes: Routes = [{ path: '', component: Records }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecordsRoutingModule { }
