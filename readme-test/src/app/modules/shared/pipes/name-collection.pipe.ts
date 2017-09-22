import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'nameCollection'})
export class NameCollectionPipe implements PipeTransform {
  transform(value: any, key: string): string {
    let values = [];
    value.forEach((item) => {
        values.push(item[key]);
    });
    return values.join(', ');
  }
}