import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientPortal } from './client-portal';

const routes: Routes = [{ path: '', component: ClientPortal }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientPortalRoutingModule { }
