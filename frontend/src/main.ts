/// <reference types="@angular/localize" />

import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import localePtExtra from '@angular/common/locales/extra/pt';
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { TranslateService } from '@ngx-translate/core';

registerLocaleData(localePt, 'pt-BR', localePtExtra);

function initializeApp(translate: TranslateService): () => Promise<void> {
  return () => {
    translate.setDefaultLang('pt');
    return new Promise<void>((resolve) => {
      translate.use('pt').subscribe({
        next: () => resolve(),
        error: (err) => {
          console.error('Failed to load translations', err);
          resolve();
        }
      });
    });
  };
}

const enhancedConfig = {
  ...appConfig,
  providers: [
    ...appConfig.providers,
    {
      provide: 'APP_INITIALIZER',
      useFactory: initializeApp,
      deps: [TranslateService],
      multi: true
    }
  ]
};

bootstrapApplication(AppComponent, enhancedConfig)
  .catch((err) => console.error(err));
