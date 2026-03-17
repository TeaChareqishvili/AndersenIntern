import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { LanguageService } from '@shared';

@Component({
  selector: 'app-language-switcher',
  imports: [MatMenuModule, MatIconModule, MatButtonModule],
  templateUrl: './language-switcher.html',
})
export class LanguageSwitcher {
  readonly #translate = inject(LanguageService);

  switchLang(lang: string) {
    this.#translate.setLanguage(lang);
  }
}
