import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Topbar } from './topbar';
import { Sidebar } from './sidebar';
import { Dashboard } from './dashboard';

@NgModule({
  declarations: [Topbar, Sidebar, Dashboard],
  imports: [CommonModule, RouterModule],
  exports: [Topbar, Sidebar, Dashboard]
})
export class LayoutModule { }
