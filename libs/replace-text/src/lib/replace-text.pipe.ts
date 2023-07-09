import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'replaceText',
  pure: true,
})
export class ReplaceTextPipe implements PipeTransform {
  transform(
    value: string,
    searchValue: string | RegExp,
    replaceValue: string,
  ): string {
    return value?.replace(searchValue, replaceValue);
  }
}
