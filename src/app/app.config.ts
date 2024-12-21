import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import {
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withInterceptorsFromDi
} from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { NgxsModule } from '@ngxs/store';
import { AppState } from './store';
import { environment } from './environments/environment';
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {LoadingInterceptor} from "./interceptors/loading.interceptor";
import {NgxSpinnerModule} from "ngx-spinner";
import {JwtInterceptor} from "./interceptors/jwt.interceptor";


export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingInterceptor,
      multi: true,
    },{
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true,
    },
    provideClientHydration(),
    importProvidersFrom(NgxSpinnerModule),
    provideHttpClient(withInterceptorsFromDi()),
    importProvidersFrom(
      NgxsModule.forRoot(AppState, {
        developmentMode: !environment.production,
      })
    ),
    importProvidersFrom(
      NgxsReduxDevtoolsPluginModule.forRoot({
        disabled: !environment.production,
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
    provideAnimations(),
    provideAnimationsAsync(),
  ]
};
