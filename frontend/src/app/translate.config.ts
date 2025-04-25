import { HttpClient } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { importProvidersFrom } from '@angular/core';
import { SafeTranslateLoader } from './custom-http-loader';

export function HttpLoaderFactory(http: HttpClient) {
  return new SafeTranslateLoader(http, './assets/i18n/', '.json')
}

export const provideTranslation = () =>
  importProvidersFrom(
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
      defaultLanguage: 'pt',
      useDefaultLang: true
    })
  );
