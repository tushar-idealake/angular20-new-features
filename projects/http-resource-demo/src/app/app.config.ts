import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig, provideZoneChangeDetection, provideZonelessChangeDetection } from '@angular/core';

export const appConfig: ApplicationConfig = {
  providers: [
    // provideZoneChangeDetection(),
    provideZonelessChangeDetection(), // analytics added
    provideHttpClient(),
  ],
};
