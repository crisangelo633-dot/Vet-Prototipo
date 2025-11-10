import { Component, OnDestroy, OnInit } from '@angular/core';
import { ToastService } from '../../core/services/toast.service';
import { CalendarOptions, EventSourceInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { AppointmentsService } from '../../core/services/appointments.service';
import { VetsService } from '../../core/services/vets.service';
import { PetsService } from '../../core/services/pets.service';
import { Appointment, Vet, Pet } from '../../shared/models';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FormBuilder, Validators, UntypedFormGroup } from '@angular/forms';

@Component({
  selector: 'app-calendar',
  standalone: false,
  templateUrl: './calendar.html',
  styleUrls: ['./calendar.scss'],
})
export class Calendar implements OnInit, OnDestroy {
  vets$: Observable<Vet[]>;
  selectedVetId: number | 'all' = 'all';
  events: EventSourceInput = [];
  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
    initialView: 'timeGridWeek',
    slotDuration: '00:30:00',
    slotMinTime: '08:00:00',
    slotMaxTime: '18:00:00',
    locale: 'es',
    allDaySlot: false,
    height: 'auto',
    selectable: true,
    selectMirror: false,
    dateClick: (arg) => this.onDateClick(arg.dateStr),
    select: (info) => this.onSelect(info.startStr, info.endStr),
    events: (info, success, failure) => {
      const from = info.startStr;
      const to = info.endStr;
      const vetId = this.selectedVetId === 'all' ? undefined : Number(this.selectedVetId);
      this.loadAppointments({ from, to, vetId }).subscribe({
        next: evts => success(evts),
        error: err => failure(err)
      });
    },
  };

  // Modal state
  modalOpen = false;
  startIso?: string;
  endIso?: string;
  form: UntypedFormGroup;
  pets$: Observable<Pet[]>;

  constructor(private toast: ToastService, private appts: AppointmentsService, private vets: VetsService, private pets: PetsService, private fb: FormBuilder) {
    this.vets$ = this.vets.list();
    this.pets$ = this.pets.list();
    this.form = fb.group({
      vetId: [null, Validators.required],
      petId: [null, Validators.required],
      reason: ['']
    });
  }

  ngOnInit(): void {}
  ngOnDestroy(): void {}

  onVetChange(v: string) {
    this.selectedVetId = v === 'all' ? 'all' : Number(v);
    // refetch events by triggering calendar to refetch
    const el = document.querySelector('full-calendar') as any;
    if (el && el.getApi) {
      el.getApi().refetchEvents();
    }
  }

  private loadAppointments(params: { from: string; to: string; vetId?: number }) {
    return this.appts.list(params).pipe(
      map((items: Appointment[]) =>
        items.map(a => ({
          id: String(a.id ?? ''),
          title: `Vet #${a.vetId}` + (a.reason ? ` - ${a.reason}` : ''),
          start: a.start,
          end: a.end,
        }))
      )
    );
  }

  private onDateClick(startIso: string) {
    // Default 30 minutes end
    const endIso = this.addMinutesIso(startIso, 30);
    this.openCreateModal(startIso, endIso);
  }

  private onSelect(startIso: string, endIso: string) {
    this.openCreateModal(startIso, endIso);
  }

  private openCreateModal(startIso: string, endIso: string) {
    this.startIso = startIso;
    this.endIso = endIso;
    const preVet = this.selectedVetId === 'all' ? null : Number(this.selectedVetId);
    this.form.reset({ vetId: preVet, petId: null, reason: '' });
    this.modalOpen = true;
  }

  submitCreate() {
    if (!this.startIso || !this.endIso) return;
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    const vetId: number = Number(this.form.value.vetId);
    const petId: number = Number(this.form.value.petId);
    const reason: string = this.form.value.reason || '';

    this.appts.list({ vetId }).subscribe(all => {
      const overlaps = all.some(a => this.overlaps(a.start, a.end, this.startIso!, this.endIso!));
      if (overlaps) { this.toast.show('Conflicto: el veterinario ya tiene una cita en ese horario.', 'warning'); return; }
      const payload: Appointment = {
        petId,
        vetId,
        start: this.startIso!,
        end: this.endIso!,
        reason: reason || undefined,
        status: 'programada'
      };
      this.appts.create(payload).subscribe({
        next: () => {
          this.persistLocal(payload);
          this.modalOpen = false;
          this.toast.show('Cita guardada correctamente', 'success');
          const el = document.querySelector('full-calendar') as any;
          if (el && el.getApi) { el.getApi().refetchEvents(); }
        },
        error: () => {
          // Si la API falla, guardar localmente para no perder el registro
          this.persistLocal(payload);
          this.modalOpen = false;
          this.toast.show('Cita guardada localmente', 'info');
          const el = document.querySelector('full-calendar') as any;
          if (el && el.getApi) { el.getApi().refetchEvents(); }
        }
      });
    });
  }

  cancelCreate() {
    this.modalOpen = false;
  }

  private overlaps(aStartIso: string, aEndIso: string, bStartIso: string, bEndIso: string) {
    const aStart = new Date(aStartIso).getTime();
    const aEnd = new Date(aEndIso).getTime();
    const bStart = new Date(bStartIso).getTime();
    const bEnd = new Date(bEndIso).getTime();
    return aStart < bEnd && bStart < aEnd;
  }

  private addMinutesIso(startIso: string, minutes: number) {
    const d = new Date(startIso);
    d.setMinutes(d.getMinutes() + minutes);
    const pad = (n: number) => String(n).padStart(2, '0');
    const yyyy = d.getFullYear();
    const MM = pad(d.getMonth() + 1);
    const dd = pad(d.getDate());
    const hh = pad(d.getHours());
    const mm = pad(d.getMinutes());
    return `${yyyy}-${MM}-${dd}T${hh}:${mm}:00`;
  }

  private persistLocal(a: Appointment) {
    try {
      if (typeof window === 'undefined' || typeof localStorage === 'undefined') return;
      const key = 'appointments_local';
      const raw = localStorage.getItem(key);
      const list: Appointment[] = raw ? JSON.parse(raw) : [];
      const localId = typeof a.id === 'number' ? a.id : Date.now();
      list.push({ ...a, id: localId });
      localStorage.setItem(key, JSON.stringify(list));
    } catch { /* noop */ }
  }
}
