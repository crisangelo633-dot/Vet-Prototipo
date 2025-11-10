import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FullCalendarModule } from '@fullcalendar/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared-module';

import { AppointmentsRoutingModule } from './appointments-routing-module';
import { Appointments } from './appointments';
import { Calendar } from './calendar/calendar';


@NgModule({
  declarations: [
    Appointments,
    Calendar
  ],
  imports: [
    CommonModule,
    FullCalendarModule,
    ReactiveFormsModule,
    SharedModule,
    AppointmentsRoutingModule
  ]
})
export class AppointmentsModule { }
