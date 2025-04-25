import { HttpClient } from '@angular/common/http';
import { TranslateLoader } from '@ngx-translate/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

export class SafeTranslateLoader implements TranslateLoader {
  constructor(
    private readonly http: HttpClient,
    private readonly prefix: string = './assets/i18n/',
    private readonly suffix: string = '.json'
  ) { }

  getTranslation(lang: string): Observable<any> {
    return this.http
      .get(`${this.prefix}${lang}${this.suffix}`, {
        responseType: 'text',
        headers: { 'Accept': 'application/json' }
      })
      .pipe(
        map((data: string) => {
          try {
            const cleanData = data.replace(/^\uFEFF/, '');
            return JSON.parse(cleanData);
          } catch (e) {
            console.error(`Error parsing ${lang} translations:`, e);
            return {};
          }
        }),
        catchError(() => {
          console.error(`Failed to load ${lang} translations`);
          return of({});
        })
      );
  }
}
