import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-language-switcher',
  imports: [MatMenuModule, MatIconModule, MatButtonModule],
  templateUrl: './language-switcher.html',
})
export class LanguageSwitcher {
  readonly #translate = inject(TranslateService);

  switchLang(lang: string) {
    this.#translate.use(lang);
  }
}
