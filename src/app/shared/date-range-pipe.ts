import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateRange',
  standalone: false
})
export class DateRangePipe implements PipeTransform {
  transform(startIso?: string, endIso?: string): string {
    if (!startIso) return '';
    const start = new Date(startIso);
    const end = endIso ? new Date(endIso) : undefined;
    const fmtDate = new Intl.DateTimeFormat('es-PE', { weekday: 'short', day: '2-digit', month: 'short' });
    const fmtTime = new Intl.DateTimeFormat('es-PE', { hour: '2-digit', minute: '2-digit', hour12: false });
    const head = `${fmtDate.format(start)} ${fmtTime.format(start)}`;
    if (!end) return head;
    return `${head} – ${fmtTime.format(end)}`;
  }

}
