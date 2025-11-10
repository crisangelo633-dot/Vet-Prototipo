import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { OwnersRoutingModule } from './owners-routing-module';
import { Owners } from './owners';


@NgModule({
  declarations: [
    Owners
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    OwnersRoutingModule
  ]
})
export class OwnersModule { }
