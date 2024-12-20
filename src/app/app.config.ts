import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClient, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { NgxsModule } from '@ngxs/store';
import { AppState } from './store';
import { environment } from './environments/environment';
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';


export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    provideHttpClient(withInterceptorsFromDi()),
    importProvidersFrom(
      NgxsModule.forRoot(AppState, {
        developmentMode: !environment.production,
      })
    ),
    importProvidersFrom(
      NgxsReduxDevtoolsPluginModule.forRoot({
        disabled: environment.production,
      })
    ),
    importProvidersFrom(
      NgxsStoragePluginModule.forRoot({
        keys: '*'
      })
    ),
    importProvidersFrom(
      NgxsLoggerPluginModule.forRoot({ disabled: environment.production })
    ),
    provideAnimations(), provideAnimationsAsync(), provideAnimationsAsync(),
  ]
};
