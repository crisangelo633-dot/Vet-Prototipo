import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VetsRoutingModule } from './vets-routing-module';
import { Vets } from './vets';


@NgModule({
  declarations: [
    Vets
  ],
  imports: [
    CommonModule,
    VetsRoutingModule
  ]
})
export class VetsModule { }
