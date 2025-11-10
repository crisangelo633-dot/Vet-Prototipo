import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecordsRoutingModule } from './records-routing-module';
import { Records } from './records';
import { PetHistory } from './pet-history/pet-history';


@NgModule({
  declarations: [
    Records,
    PetHistory
  ],
  imports: [
    CommonModule,
    RecordsRoutingModule
  ]
})
export class RecordsModule { }
