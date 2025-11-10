import { NgModule, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection, LOCALE_ID, DEFAULT_CURRENCY_CODE } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { registerLocaleData } from '@angular/common';
import localeEsPE from '@angular/common/locales/es-PE';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { CoreModule } from './core/core-module';
import { LayoutModule } from './layout/layout-module';

// Register Peruvian Spanish locale for dates/numbers
registerLocaleData(localeEsPE);

@NgModule({
  declarations: [
    App
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    LayoutModule
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideHttpClient(withFetch()),
    provideClientHydration(withEventReplay()),
    { provide: LOCALE_ID, useValue: 'es-PE' },
    { provide: DEFAULT_CURRENCY_CODE, useValue: 'PEN' }
  ],
  bootstrap: [App]
})
export class AppModule { }
