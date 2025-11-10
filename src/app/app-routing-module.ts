import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Dashboard } from './layout/dashboard';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
  { path: 'dashboard', component: Dashboard, canActivate: [AuthGuard] },
  { path: 'owners', canActivate: [AuthGuard], loadChildren: () => import('./owners/owners-module').then(m => m.OwnersModule) },
  { path: 'pets', canActivate: [AuthGuard], loadChildren: () => import('./pets/pets-module').then(m => m.PetsModule) },
  { path: 'appointments', canActivate: [AuthGuard], loadChildren: () => import('./appointments/appointments-module').then(m => m.AppointmentsModule) },
  { path: 'records', canActivate: [AuthGuard], loadChildren: () => import('./records/records-module').then(m => m.RecordsModule) },
  { path: 'vets', canActivate: [AuthGuard], loadChildren: () => import('./vets/vets-module').then(m => m.VetsModule) },
  { path: 'auth', loadChildren: () => import('./auth/auth-module').then(m => m.AuthModule) },
  { path: 'portal', loadChildren: () => import('./client-portal/client-portal-module').then(m => m.ClientPortalModule) },
  { path: '**', redirectTo: 'dashboard' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
