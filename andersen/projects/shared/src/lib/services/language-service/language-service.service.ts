import { inject, Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  private translate = inject(TranslateService);

  private currentLang = 'en';

  setLanguage(lang: string) {
    this.currentLang = lang;
    this.translate.use(lang);
  }

  getLanguage() {
    return this.currentLang;
  }

  getAvailableLanguages() {
    return ['en', 'ka', 'ru'];
  }
}
