import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared-module';

import { ClientPortalRoutingModule } from './client-portal-routing-module';
import { ClientPortal } from './client-portal';
import { MyPets } from './my-pets/my-pets';
import { MyAppointments } from './my-appointments/my-appointments';


@NgModule({
  declarations: [
    ClientPortal,
    MyPets,
    MyAppointments
  ],
  imports: [
    CommonModule,
    SharedModule,
    ClientPortalRoutingModule
  ]
})
export class ClientPortalModule { }
