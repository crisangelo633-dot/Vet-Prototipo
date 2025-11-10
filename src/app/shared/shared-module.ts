import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppointmentStatusPipe } from './appointment-status-pipe';
import { DateRangePipe } from './date-range-pipe';
import { HighlightUpcoming } from './highlight-upcoming';



@NgModule({
  declarations: [
    AppointmentStatusPipe,
    DateRangePipe,
    HighlightUpcoming
  ],
  imports: [
    CommonModule
  ],
  exports: [
    AppointmentStatusPipe,
    DateRangePipe,
    HighlightUpcoming
  ]
})
export class SharedModule { }
