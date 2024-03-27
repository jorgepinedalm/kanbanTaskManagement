import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { appRoutes } from './app.routes';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { NgxsModule } from '@ngxs/store';
import { BoardState } from "@board-management/shared-store";
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(appRoutes),
    provideAnimations(), 
    importProvidersFrom(NgxsModule.forRoot([BoardState])), 
    importProvidersFrom(NgxsLoggerPluginModule.forRoot()),
    importProvidersFrom(NgxsReduxDevtoolsPluginModule.forRoot())
  ],
};
