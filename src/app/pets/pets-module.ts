import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { PetsRoutingModule } from './pets-routing-module';
import { Pets } from './pets';
import { PetForm } from './pet-form/pet-form';


@NgModule({
  declarations: [
    Pets,
    PetForm
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PetsRoutingModule
  ]
})
export class PetsModule { }
