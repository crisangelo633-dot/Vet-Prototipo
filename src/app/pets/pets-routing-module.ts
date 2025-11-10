import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Pets } from './pets';

const routes: Routes = [{ path: '', component: Pets }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PetsRoutingModule { }
