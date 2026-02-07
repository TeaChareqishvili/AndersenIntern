import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'passwordMask',
  standalone: true,
})
export class PasswordMaskPipe implements PipeTransform {
  symb = '*';

  transform(value: string | null, maskSymb = this.symb): string {
    if (!value) {
      return '';
    }
    return maskSymb.repeat(value.length);
  }
}
