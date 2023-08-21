import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  standalone: true
})
export class FilterPipe<T extends {[k: string]: any}> implements PipeTransform {

  transform(value: T[], phrase: string, key: string = ''): T[] {
    if (!Array.isArray(value) || !phrase) {
      return value;
    }

    phrase = phrase.toLowerCase();

    return value.filter( item => {
      if (!key) {
        return Object.values(item).join(' ').toLowerCase().includes(phrase);
      }

      return typeof item[key] === 'number'
        ? item[key] === Number(phrase)
        : item[key].toLowerCase().includes(phrase);
    });
  }

}
