import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'passwordMask',
  standalone: true,
})
export class PasswordMaskPipe implements PipeTransform {
  readonly symb = '*';

  transform(value: string | null, hidePassword: boolean, maskSymb: string = this.symb): string {
    if (!value) return '';
    return hidePassword ? maskSymb.repeat(value.length) : value;
  }
}
