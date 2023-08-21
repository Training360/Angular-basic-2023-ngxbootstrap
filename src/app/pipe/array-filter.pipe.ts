import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'arrayFilter'
})
export class ArrayFilterPipe<T extends {[k: string]: any}> implements PipeTransform {

  transform(value: T[], phrase: string): T[] {
    if (!Array.isArray(value) || !phrase) {
      return value;
    }

    phrase = phrase.toLowerCase();

    return value.filter( item => {
      return Object.values(item).join(' ').toLowerCase().includes(phrase);
    });
  }

}
